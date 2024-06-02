---
title: "Repost 🔃 Kafka Streams, co-partitioning requirements illustrated"
date: 2020-06-20T09:00:00+01:00
draft: false
tags: ["repost", "kafka", "streams", "en-link"]
extra_css: ["css/post.css"]
post_banner: "post_banner007.png"
thumbnail: thumbnail007.jpg
---
Back in 2020, I wrote an article about data exchange between Kafka Streams instances. I was not working with Kafka Stream at a specific time. But my head was full of many ideas I wanted to put on paper after using the Kafka Streams library for quite a while. The way joins happen was one of those ideas.

{{< repost
    link="https://medium.com/xebia-france/kafka-streams-co-partitioning-requirements-illustrated-2033f686b19c"
    title="Kafka Streams, co-partitioning requirements illustrated" >}}

Like many people, when I started to work with this stream processing library, I had prior experiences with Apache Spark and other data processing frameworks. _Shuffling_ was quite an important concept for stateful operations such as *grouping*, *joining* or *windowing*. The idea was not easy to grasp, and you had to avoid it as much as possible. So when I had to switch mental model to use Kafka Streams, thinking about _Repartitioning_ instead of _Shuffling_ felt way more intuitive. So I tried to use my knowledge of Apache Kafka to describe it by creating a demo and a colourful blog post.

{{< repost-screeds >}} 