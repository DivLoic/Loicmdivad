---
title: "Schema Validation: a github action"
date: 2020-05-27T09:00:00+01:00
draft: false
author: "Loïc DIVAD"
extra_css: ["css/post.css"]
tags: ["kafka", "streams", "cloud", "tooling"]
thumbnail: thumbnail007.png
---

> Schema are the service APIs for Event Streaming  -- _Kafka Summit London 2019 (by Neha Narkhede)_ .  

We can't stress this enough: when investing in real-time applications, it is essential to have a good schema management strategy. Actually, just having one is already a solid start. What we consider an excellent schema strategy depends on the context and may evolve. But why being schema-aware matter? Let's cut in pieces this big presentation tile.

Think of synchronous APIs first. When we have a REST API, it is meant to be shared. To encourage people to call our service, we'll document it. That's a fact, whether it's a public service or service exposed to teams across one organization. The easier it is to understand our API, the more likely it will have the desired success. So we will carefully list the different routes. We will specify the expected payload for each endpoint. Even more, we will probably comment on the meaning and origin of most fields. Well, when it comes to what flow into your streams, it should be the exact same thing. I know you would lose it if I took away your swagger or lovely WSDL (shoot out to the boomers reading this!). So we NEED something to expose what possible schemas used in a stream. And that's where the [Schema Registry](https://www.confluent.io/confluent-schema-registry) comes in!