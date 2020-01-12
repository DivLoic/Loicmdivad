---
title: "Kafka topic creation with Scala"
date: 2020-01-12T09:44:40+01:00
draft: true
author: "Loïc DIVAD"
---

If you develop a piece of software dealing with data systems, you are probably facing a few prerequisites. 
For example you may need a file system to be setup or a database table to be created. 
The same applies to event stream applications using [**Apache Kafka**](http://kafka.apache.org/)® as event log. 
They need **topics**, **schemas** and **ACLs** to be created in order to be able tu run correctly.
However, theses tasks are'nt the responsibility of your application. 
It would terrible to include these creation tasks as part of your main class or program entry-point.
Does that means we have to leave to the operators or the people managing the Kafka cluster 🤔?

This short post will explore the `AdminClient` class and give an example of creation tasks in scala.
All the code will be Scala 2.13.1, the post is based on the version 2.4.0 of Kafka and 5.3.2 of the Confluent Platform.

### The `NewTopic` class, our topic definition 
The first of all we have to define the needed topics. 

In a main class where all our taks will 

```scala
object TopicCreation extends App {
  
  val newTopics = Verctor(
    new NewTopic("ACCOUNT-TOPIC", 8, 1), 
    new NewTopic("CLICK-TOPIC", 32, 1), 
    new NewTopic("OUTPUT-TOPIC", 16, 1)
  )
}
```  