---  
title: "Kafka topic creation with Scala and Gradle"  
date: 2020-01-12T09:44:40+01:00  
draft: true  
author: "Loïc DIVAD"  
---  

If you develop a piece of software dealing with data systems, you are probably facing a few prerequisites. 
For example, you may need a file system to be set up or a database table to be created. 
The same applies to event stream applications using [**Apache Kafka**](http://kafka.apache.org/)® as an event log. 
They need **topics**, **schemas** and **ACLs** to be created first, in order to run correctly. 
However, these tasks aren't the application's responsibility. 
It would be terrible to include these creation tasks as part of our main class or program entry-point. 
Does that mean we have to learn something new; setup a creation service or move to the Kafka shell scripts 🤔?
  
This short post will explore the `KafkaAdminClient` class and give an example of creation tasks in Scala.
All the code will be in Scala 2.13.1; the post is based on the version 2.4.0 of Kafka and 5.4.0 of the
[Confluent Platform](https://www.confluent.io/product/confluent-platform/).
  
### The `NewTopic` class, our topic specification

First of all, we have to define the needed topics. In a separate main class, we create `NewTopic` instances.
This class is a member of `org.apache.kafka.clients.admin` and stand for topics to be created.
  
```scala  
import org.apache.kafka.clients.admin.NewTopic

object TopicCreation extends App {  

 val newTopics = Verctor(
	 new NewTopic("ACCOUNT-TOPIC", 8, 1),    
	 new NewTopic("CLICK-TOPIC", 32, 1),   
	 new NewTopic("OUTPUT-TOPIC", 16, 1)  
 )}  
```

| property 	                | type 	                        | comment	|
|---------------------------|-------------------------------|-----------|
| `name`                    |`String`                       |  |
| `numPartitions`           |`int`                          |  |
| `replicationFactor`       |`short`                        |  |
| `replicasAssignments` 	|`Map<Integer, List<Integer>>`	|  |
| `configs`                 |`Map<String, String>`          | [kafka configs](https://kafka.apache.org/documentation/#configuration) |

Then we pass this topic list to the java administration tool.

### `KafkaAdminClient`, java clients access to Kafka oprerations

This class provides Kafka operations such as topic management and inspection for both configurations and ACLs. 
Here is a short list of methods it exposes: 
- `KafkaAdminClient#deleteTopics`
- `KafkaAdminClient#listTopics`
- `KafkaAdminClient#describeCluster`
- `KafkaAdminClient#createAcls`
- etc ...

While its constructor requires a lot of information, it's parent interface,  `Admin`, has a nice creation method.
_Note_: `Admin` has been introduced in (2.4.0) for 
[bladibla purpose](https://cwiki.apache.org/confluence/display/KAFKA/KIP-476%3A+Add+Java+AdminClient+Interface).
We create our client instance with the factory method `Admin#creatClient` interface.

```scala
import org.apache.kafka.clients.admin.Admin
val client = Admin.create(??? /*util.Map[String, AnyRef](... some.kafka.config, value)*/)
```
It only takes either a (java util) properties or Map filled with Kafka configs. 
Among all the possible configs `bootstrap.servers` is the only one required to create our topics.
And that's actually the big deal with `KafkaAdminClient`. 
It doesn't require any connection to Zookeeper or any other service. 



See also:
- [KIP-117: Add a public AdminClient API for Kafka admin operations](https://cwiki.apache.org/confluence/display/KAFKA/KIP-117%3A+Add+a+public+AdminClient+API+for+Kafka+admin+operations)
- [KIP-222 - Add Consumer Group operations to Admin API](https://cwiki.apache.org/confluence/display/KAFKA/KIP-222+-+Add+Consumer+Group+operations+to+Admin+API)