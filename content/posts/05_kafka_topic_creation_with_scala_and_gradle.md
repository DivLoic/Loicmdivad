---  
title: "Kafka topic creation with Scala and Gradle"  
date: 2020-03-15T09:00:00+01:00  
draft: false  
author: "Loïc DIVAD"  
tags: ["tooling"]
extra_css: ["css/post.css"]
thumbnail: "thumbnail005.png"
---  
If you develop a piece of software dealing with data systems, you are probably facing a few prerequisites. For example, you may need a file system to be mounted or a database table to be created. The same applies to event stream applications using [**Apache Kafka**](http://kafka.apache.org/)® as an event log. They need **topics**, **schemas** and **ACLs** to be created first, in order to run correctly. However, these tasks aren't the application's responsibility. It would be terrible to include these creation tasks as part of our main class or program entry-point. Does that mean we have to learn something new; setup a creation interface or move to the Kafka shell scripts 🤔?

This short post introduces the `KafkaAdminClient` class and gives an example of a creation task in Scala. All the code will be in Scala 2.13.1; the post is based on the version 2.4.0 of Kafka and 5.4.0 of the [Confluent Platform](https://www.confluent.io/product/confluent-platform/). (tldr: [https://github.com/DivLoic/topic-creation-task](https://github.com/DivLoic/topic-creation-task))

### The `NewTopic` class, our topic specification

First of all, we have to define the needed topics. In a separate class, we create `NewTopic` instances. This class is a member of `org.apache.kafka.clients.admin` and stand for the topics we want to create.

```scala
import org.apache.kafka.clients.admin.NewTopic

object TopicCreation extends App {  

 val newTopics = Verctor(
     new NewTopic("ACCOUNT-TOPIC", 8, 1),    
     new NewTopic("CLICK-TOPIC", 32, 1),   
     new NewTopic("OUTPUT-TOPIC", 16, 1)  
 )}
```

*NewTopic properties*  

| property 	                | type 	                        | comment	|
|---------------------------|-------------------------------|-----------|
| `name`                    |`String`                       |  |
| `numPartitions`           |`int`                          |  |
| `replicationFactor`       |`short`                        |  |
| `replicasAssignments` 	|`Map<Integer, List<Integer>>`	| Optional |
| `configs`                 |`Map<String, String>`          | [kafka configs](https://kafka.apache.org/documentation/#configuration) |


Despite none of the constructors take the config property, the setter `NewTopic#configs` lets you define a series of [Topic config](https://docs.confluent.io/current/installation/configuration/topic-configs.html). Now let's see how we can pass this topic list to the java administration tool.

### `KafkaAdminClient`, java client access to Kafka operations

This class provides Kafka operations such as topic management and inspection for both configurations and ACLs. It is part of a public and stable API introduce in [KIP-117](https://cwiki.apache.org/confluence/display/KAFKA/KIP-117%3A+Add+a+public+AdminClient+API+for+Kafka+admin+operations) to avoid direct communication with zookeeper. Here is a brief list of methods it exposes:

- `KafkaAdminClient#deleteTopics`
- `KafkaAdminClient#listTopics`
- `KafkaAdminClient#describeCluster`
- `KafkaAdminClient#createAcls`
- etc ...

While its constructor requires a lot of information, it's parent interface, `Admin`, has a nice creation method. We create our client instance with the factory method `Admin#creatClient`.

```scala
import org.apache.kafka.clients.admin.Admin
val client = Admin.create(??? /*util.Map[String, AnyRef](... some.kafka.config, value)*/)
```

*Note*: `Admin` has been introduced in ([2.4.0](https://issues.apache.org/jira/browse/KAFKA-8454)) for more flexibility.

It only takes either a Properties or a Map filled with Kafka configs. Among all the possible configs, `bootstrap.servers` is the only one required to create our topics. We are now ready to create as many topics as our application required. 

```scala
val results: util.Map<String, KafkaFuture<Void>> = 
    client.createTopics(newTopics.asJava).values()
```

The admin client will return a `CreateTopicsResult` wrapping a Future for each topic creation request. By calling `CreateTopicsResult#values` we get a map linking together a topic name and the Future result of the creation. It also has the method `CreateTopicsResult#all` which blocks until we receive all the topic creation response. Now let's see how we can wrap this code into something we actually execute.

### Gradle execution, run the all thing

Let's assume our app uses an external configuration. Personally, I’m familiar with the [Typesafe Config](https://github.com/lightbend/config) library and the [HOCON](https://en.wikipedia.org/wiki/HOCON) format it supports. It would give something like this:

```hocon
topics = [
    { name = "ACCOUNT-TOPIC", partitions = 1, replication-factor = 1 }
    { name = "CLICK-TOPIC", partitions = 1, replication-factor = 1}
    { name = "OUTPUT-TOPIC", partitions = 1, replication-factor = 1}
]
```

See the complete *[application.conf](https://github.com/DivLoic/topic-creation-task/blob/master/src/main/resources/application.conf)* file example.

Then inside our topic creation entry point, all we have to do is call the method `AdminClient#createTopic`  and pass our `NewTopic` list as a parameter. We then and loop over the response to confirm each creation.

```scala
val config: ExampleConfig = ???

val client: Admin = Admin.create(config.kafkaConfig.toMap.asJava)

val newTopics: util.List[NewTopic] = 
      config.topics.map(topic => new NewTopic(topic.name, topic.partitions, topic.replicationFactor)).asJava

client.createTopics(newTopics).values().asScala.foreach {
    case (topicName, kafkaFuture) =>

        kafkaFuture.whenComplete {
            case (_, throwable: Throwable) if Option(throwable).isDefined => // failure
            case _ => // it's ok
        }  
}
```

See the complete *[TopicCreation.scala](https://github.com/DivLoic/topic-creation-task/blob/master/src/main/scala/io/ldivad/blog/example/TopicCreation.scala)* file example.

This java entry point can be used by our build tool, this way we will include topics creation in the “*deploy stage of our application*”. We create a new Gradle task and link it to other tasks as following:

```kotlin
val topicCreation by tasks.register<JavaExec>("topicCreation") {
    main = "io.ldivad.blog.example.TopicCreation"
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.getByName("run").dependsOn(topicCreation)
```

See the complete *[build.gradle.kts](https://github.com/DivLoic/topic-creation-task/blob/master/build.gradle.kts)* file example.

We can now create our topics by issuing a `./gradlew topicCreation` command. This command can then be integrated into any CI process.

### How and when to use this

As any developer practice, this can be discussed. You may have another way to solve this. I personally find it useful in small examples, in live coding materials or even for demos (every two weeks when you want to demonstrate a new feature on a whole new environment). For example, I've used it in this [kafka-tutorial.confluent.io](http://kafka-tutorial.confluent.io) demo: [Emit a final result from a time window](https://kafka-tutorials.confluent.io/window-final-result/kstreams.html). To summarize here is what you get at the end:   

{{< asciicast id=H92FrptIyEkUXd5IZBXUxTiP7 >}}

We can easily find objections to this approach but the strongest might be: Is topic creation is an application level resposability? Probably not. What we can do is extract this code in a module and use it for any Kafka Clients application. Now, we can move the responsibility to a potential CI/CD pipeline or other automated processes. So you may now think of a declarative way to specify which topics need to be created and live the management of this list to the appropriate teams.

See also:

- [Kafka Tutorial: Window last result](https://kafka-tutorials.confluent.io/window-final-result/kstreams.html)
- [KIP-476: Add Java AdminClient Interface](https://cwiki.apache.org/confluence/display/KAFKA/KIP-476%3A+Add+Java+AdminClient+Interface)
- [KIP-222: Add Consumer Group operations to Admin API](https://cwiki.apache.org/confluence/display/KAFKA/KIP-222+-+Add+Consumer+Group+operations+to+Admin+API)
- [KIP-117: Add a public AdminClient API for Kafka admin operations](https://cwiki.apache.org/confluence/display/KAFKA/KIP-117%3A+Add+a+public+AdminClient+API+for+Kafka+admin+operations)