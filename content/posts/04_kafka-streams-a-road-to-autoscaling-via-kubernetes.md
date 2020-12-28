---
title: "Repost 🔃 Kafka Streams: a road to Autoscaling via Kubernetes"
date: 2019-04-15T18:00:02+01:00
draft: false
tags: ["repost", "streams", "kafka", "cloud", "fr-link", "en-link"]
extra_css: ["css/post.css"]
thumbnail: "thumbnail004.png"
---
There are many reasons for working on community contributions such as a blog post, a demo, or a talk. Sometimes, you produce those contributions to share something that you've learned at work. But sometimes, the contribution itself can be a way to learn and experiment something new. I was in the second case when I worked on the article Kafka Streams: a road to Autoscaling via Kubernetes.

{{< repost 
    link="https://medium.com/xebia-france/kafka-streams-a-road-to-autoscaling-via-kubernetes-417f2597439" 
    title="Kafka Streams: a road to autoscaling via Kubernetes" >}}

At that time, I was working for a consulting company, and my client was running one of it's first real-time project on Apache Kafka®. We were developing a Kafka Streams application meant to be deployed on three virtual machines to process data from ~12 partitions. We were satisfied with how these instances handled the normal workload. However, in some situations, we wished we could be more flexible and easily add more deployments. Issues like crashes; restarts; upgrades led to significant increases in the record lag. Meanwhile, our colleagues were all converted to the same sect: Kubernetes. So I started to ask my self: "can we address this particular problem with Kubernetes". And that's how I've started to explore Kubernetes custom metrics API.

Basically the demo: [xke-kingof-scaling](https://github.com/DivLoic/xke-kingof-scaling) brings a random data generator, a Kafka Streams application and a minimal infra (declared with Terraform) to recreate the use case and highlight the issue I was trying to address. The project was running on [GCP](https://cloud.google.com), and the Kafka cluster used was on [Confluent Cloud](https://www.confluent.io/confluent-cloud/). The first deadline for this hack project was actually a presentation. I had to present the talk [Scale in / Scale out with Kafka Streams and Kubernetes](https://blog.loicmdivad.com/talks/scale-in-/-scale-out-with-kafka-streams-and-kubernetes/) 🎞 🇫🇷 at [the 2018 Edition of Xebicon](https://2018.xebicon.fr/).

![Loic DIVAD at Xebicon 2018](/images/posts/04/lolo_on_stage.jpg)

Then came the two blog posts, the first in [French](https://blog.engineering.publicissapient.fr/2019/05/03/kafka-streams-une-voie-vers-lautoscaling-avec-kubernetes/) and the second in [English](https://medium.com/xebia-france/kafka-streams-a-road-to-autoscaling-via-kubernetes-417f2597439). The first draft was simply the transcript of the talk, which was really useful.    

Doing this demo (and the corresponding blog post) brought me a lot. Not only because I've learned a lot, but also because I've been stuck halfway on my demonstration and had to figure out how to get things to work. At the time, the two pieces of software I was dealing with, a Kafka Steams application and the Kube custom metrics API, didn't have a trivial integration. But it had a different dynamic to the story. And now that I can take a step back from it, I think it was one of the funniest demos I've created.

{{< repost-screeds >}} 