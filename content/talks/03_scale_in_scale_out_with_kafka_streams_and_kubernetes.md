---
title: "Scale in / Scale out with Kafka Streams and Kubernetes"
date: 2018-11-20T09:00:00+01:00
draft: false
tags: ["fr-link", "k8s", "cloud", "kafka", "streams"]
author: "Loïc DIVAD"
---

The abstract:
>Apache Kafka’s Streams API lets us process messages from different topics with very low latency. Messages may have different formats, schemas and may even be serialised in different ways. What happens when an undesirable message comes in the flow? When an error occurs, real-time applications can’t always wait for manual recovery and need to handle such failures. Kafka Streams lets you use a few techniques like sentinel value or dead letter queues—in this talk we’ll see how. This talk will give an overview of different patterns and tools available in the Streams DSL API to deal with corrupted messages. Based on a real-life use case, it also includes valuable experiences from building and running Kafka Streams projects in production. The talk includes live coding and demonstrations.

Related medium blog post:
{{< tweet user="LoicMDivad" id="1117805617433980929" >}}

The slides:
{{< speakerdeck id=3e60eeaf159e42bdba878c6a70aebc6b slide=0 >}}

The video (in French 🇫🇷):
{{< youtube id="gf1PJ7SJ55s" t="4500">}}
