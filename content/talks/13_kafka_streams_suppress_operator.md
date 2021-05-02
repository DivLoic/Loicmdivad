---
title: "SAK Meetup: Kafka Streams and the Suppress Operator"
date: 2021-01-26T09:00:00+01:00
draft: true
tags: ["en-link", "kafka", "streams"]
author: "Loïc DIVAD"
---
Backstory: 

A few months after I moved in Stockholm I decided to support the Stockholm Apache Kafka Meetup (SAK).
So to kick of the 2021 season, I gave a talk about a tutorial I have created a few months ago on 
[https://kafka-tutorials.confluent.io](https://kafka-tutorials.confluent.io). 

Tutorial:

[Emit a final result from a time window](https://kafka-tutorials.confluent.io/window-final-result/kstreams.html)

The abstract:
> When processing event-streams, time-based operations are not the easiest to reflect on. However, they are essential! Many classic operations, such as grouping elements over a window or joining two streams are, by default, expected from a stream processing libraries like Kafka Stream. Among those features, emitting a final result at the end of a window has been for a long time impossible. So what is different with this operation? And what are the great powers you will unlock by using it in your application? Let's refer to kafka-tutorials to answer those questions. As a warm-up for a year full of great Kafka meetups, this talk walks you through a particular Kafka tutorial. You will get a very concrete implementation of that classic exercise. It will discuss the concept that makes this final window result possible, and finally, you will have an overview of how kafka-tutorials works and how to contribute to it.

The slides:
{{< speakerdeck id=2efece0dcfc24a9d81d52578271344f5 slide=0 >}}

The video is available at [the Confluent Meetup Hub website](https://videos.confluent.io/watch/dizWs7BRkxRo5heZvEQn9F?)