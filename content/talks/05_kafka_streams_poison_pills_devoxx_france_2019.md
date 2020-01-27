---
title: "Kafka Streams Poison Pills (DEVOXX France'19)"
date: 2019-04-18T09:00:00+02:00
draft: false
tags: ["fr-link", "kafka", "streams"]
author: "Loïc DIVAD"
---

The abstract (in French 🧀🍷🇫🇷):
> Kafka-Streams, la librairie de traitement de données en temps réel de Apache Kafka permet de traiter une grande quantité de messages avec de très faibles latences. Les messages peuvent avoir des formats différents, des schémas différents et même être sérialisés de manières différentes. Alors que se passe-t-il quand un message indésirable se retrouve dans un flux ? Ces applications de stream processing ne peuvent pas se permettre d’attendre une remise en route manuelle. Comment notre librairie gère donc ces événements ? Ce talk propose d’explorer l’API StreamDSL de Kafka-Streams. Des techniques comme les sentinel values ou encore les dead letter queues y sont proposées. Voyons ensemble comment elles rendent possible la gestion des messages erronés, appelés aussi poison pills.

The slides:
{{< speakerdeck id=966875eae64a43f885e8b97790c4ff7a slide=0 >}}

The video (in French 🧀🍷🇫🇷):
{{< youtube id="DTEext4DUN0" >}}
