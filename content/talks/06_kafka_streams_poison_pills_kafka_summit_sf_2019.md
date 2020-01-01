---
title: "Kafka Streams Poison Pills (Kafka Summit SF'19)"
date: 2019-10-01T09:00:00-08:00
draft: false
tags: ["en-link", "kafka", "streams"]
author: "Loïc DIVAD"
---

The abstract:
> Apache Kafka's Streams API lets us process messages from different topics with very low latency. Messages may have different formats, schemas and may even be serialised in different ways. What happens when an undesirable message comes in the flow? When an error occurs, real-time applications can't always wait for manual recovery and need to handle such failures. Kafka Streams lets you use a few techniques like sentinel value or dead letter queues-in this talk we'll see how. This talk will give an overview of different patterns and tools available in the Streams DSL API to deal with corrupted messages. Based on a real-life use case, it also includes valuable experiences from building and running Kafka Streams projects in production. The talk includes live coding and demonstrations.

The slides:
{{< speakerdeck id=9b4ebd10879e4356b973ca70468b03d8 slide=0 >}}

The video: [
    Get access to the presentations from Kafka Summit San Francisco 2019
](https://www.confluent.io/kafka-summit-san-francisco-2019/streaming-apps-and-poison-pills-handle-the-unexpected-with-kafka-streams)


![Lolo on stage at San Francisco](/images/talks/06_ratatouille_kafka_summit_sf_2019.png)