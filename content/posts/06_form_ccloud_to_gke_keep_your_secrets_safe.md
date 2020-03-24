---
title: "From Confluent Cloud to GKE: Keep your secrets safe!"
date: 2020-03-24T09:44:50+01:00
draft: false
author: "Loïc DIVAD"
extra_css: ["css/post.css"]
tags: ["tooling", "cloud"]
---
    
    
On your journey to build event stream and real time applications you have probably heard about [Confluent Cloud](https://www.confluent.io/confluent-cloud/):

> [...] a fully managed, cloud-native event streaming platform powered by Apache Kafka.

The team behind this service is putting a lot of efforts to provide a smooth and complete experience in working with Apache Kafka in the cloud. This efforts includes security of courses. In this short post I'd like to give a an overview of the programatic access to a cluster and share a quick script I use sometimes to deploy pet projects on [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine) (aka, GKE). I use my personal standard account in this post. 

### Cluster settings and API Keys creation

Suppose we are starting in a new environment.

```bash
$ ccloud environment create BLOG
# +------------------+--------+
# | Environment Name | BLOG   |
# | Id               | t35556 |
# +------------------+--------+
```

In this environment we create a new Kafka cluster.

```bash
$ ccloud environment use t35556
$ ccloud kafka cluster create blog-cluster --cloud gcp --region europe-west1
# +-------------+------------------------------------------------------------+
# | Id          | lkc-gnv0n                                                  |
# | Name        | blog-cluster                                               |
# | Ingress     |                                                        100 |
# | Egress      |                                                        100 |
# | Storage     |                                                       5000 |
# | Provider    | gcp                                                        |
# | Region      | europe-west1                                               |
# | Status      | UP                                                         |
# | Endpoint    | SASL_SSL://pkc-4r297.europe-west1.gcp.confluent.cloud:9092 |
# | ApiEndpoint | https://pkac-42392.europe-west1.gcp.confluent.cloud        |
# +-------------+------------------------------------------------------------+
```

And in this same environment we enable the Schema Registry.

```bash
$ ccloud kafka cluster use lkc-gnv0n
$ ccloud schema-registry cluster enable --cloud gcp --geo eu
# +----------+-----------------------------------------------------+
# | Id       | lsrc-przmk                                          |
# | Endpoint | https://psrc-l7opw.europe-west3.gcp.confluent.cloud |
# +----------+-----------------------------------------------------+
```

In real life we would probably use a service account to run your application.

```bash
$ ccloud service-account create "BlogPostAccount" --description "This is a demo service account"
# +-------------+--------------------------------+
# | Id          |                          54876 |
# | Name        | BlogPostAccount                |
# | Description | This is a demo service account |
# +-------------+--------------------------------+
```

Finally, it's time to deploy our client application capable of producing in and consuming from Kafka topics. But a this point, our Confluent Cloud interface might asking us new API keys:

![foo](/images/posts/06/cluster_settings.png)

Let's create the API key we need to provide to our application in order to connect to both the Kafka cluster and the Schema Registry cluster

```bash
ccloud api-key create --service-account 54876 --resource lkc-gnv0n # kafka cluster id
# +---------+------------------------------------------------------------------+
# | API Key | 3UEZQJQVCOLLP7MN                                                 |
# | Secret  | Xk9UuVSD6uZDXW6p+Y8g652OIrgCWtQ4+jlp4pVqOl06KIpvgNxJLoEdvxCsa91z |
# +---------+------------------------------------------------------------------+

ccloud api-key create --service-account 54876 --resource lsrc-przmk # registry cluster id
# +---------+------------------------------------------------------------------+
# | API Key | KFDBC2UEPUKCHY33                                                 |
# | Secret  | dZlf50cTvJiw0dPjRYp7OzTvllPI98HwfGkhpPhS4r2KNUiX5jMKTZ3kpA6p12Um |
# +---------+------------------------------------------------------------------+
```

Now have the API Keys needed to run a Kafka Client application on behalf of the service account `BlogPostAccount`. All we have to do is share these keys.

![foo](/images/posts/06/confluent_api_keys.png)

### Topics provisioning and application deployment

In order to easily deploy our Kafka Clients in a GKE cluster we can store our Confluent Cloud credentials as [Kubernetes Secrets](https://kubernetes.io/en/docs/concepts/configuration/secret/)[.](https://kubernetes.io/fr/docs/concepts/configuration/secret/) All the keys need to be encoded in base64 and included in a proper JSON or YAML document. I do a substantial number of demos and pets project, so after repeating those steps a few time I made this script: 

{{< gist DivLoic 3140e78aad02f76ccbaf3a640f2215d5 >}}   

Quite handy, isn't it?

How to use? It can be included in a CI process to be part of our deployment phase. we just need to declare the the Confluent API Keys as environment variables. For instance, [Github Action](https://github.com/features/actions) has the concept of secrets. 

![foo](/images/posts/06/github_actions_secrets.png)


ccloud environment create BLOG
ccloud environment use ???
ccloud kafka cluster create blog-cluster --cloud gcp --region europe-west1
ccloud schema-registry cluster enable --cloud gcp --geo eu
ccloud api-key create --service-account 54876 --resource ???
ccloud api-key create --service-account 54876 --resource ???
ccloud api-key create --service-account 57062 --resource ???
ccloud api-key create --service-account 57062 --resource ???

+---------+------------------------------------------------------------------+
| API Key | 745UGPO5X6VDFOZA                                                 |
| Secret  | mRGeXOCKr3pBgdcRbUYeMs8uu9J4bKtmgwjsw4aN3KOD0tCk+ZNeL4KXI3ukW6uJ |
+---------+------------------------------------------------------------------+
+---------+------------------------------------------------------------------+
| API Key | BGF5ZS7QKKWWFHUS                                                 |
| Secret  | nv2Rud7/NtOJVwvN/WTeRqP76JxqMsfS2mDWS9j5vf2b4NzoX+QVBKuNLGYiE54N |
+---------+------------------------------------------------------------------+

------------------------------------
+---------+------------------------------------------------------------------+
| API Key | 6QJ34P6IOMN4GPHI                                                 |
| Secret  | 04s0xMDy7gFETQKfLkBk5DlDzhtYnH8lgaLi/au+Ceps8MzIdTuJf8g4MTwU3kb9 |
+---------+------------------------------------------------------------------+
+---------+------------------------------------------------------------------+
| API Key | FM5KNUG6SK4TVXKS                                                 |
| Secret  | GIhlGCRApm8Z54b0TFdQxjct1ChtikeN+KFkahzoCX6zWCUNzDXNcsHvXC/Utip/ |
+---------+------------------------------------------------------------------+
```bash

#!/usr/bin/env bash
ENV=dev API_KEY=D3JWNRBGDWSFZH2H SECRET_KEY=5/yFGcTYvA7UZMXAbuwoKiwtudirWuxeGrGeb5xptAIa0S38mdogUn9POBk7WSJX BOOTSTRAP_SERVERS=pkc-4r297.europe-west1.gcp.confluent.cloud:9092 SCHEMA_REGISTRY_API_KEY=ZV3W5BCQCGPAHT6R SCHEMA_REGISTRY_SECRET_KEY=55W2Gza7CQ9E8IRSBV55sdDyB7nmk5vbZNMCSi32mM07zhp1UuVwB+n4d/UcRu9k SCHEMA_REGISTRY_URL=https://psrc-l7opw.europe-west3.gcp.confluent.cloud

[[ -z "${ENV}" ]] && { echo "ENV was empty"; exit 1; }
[[ -z "${API_KEY}" ]] && { echo "API_KEY was empty"; exit 1; }
[[ -z "${SECRET_KEY}" ]] && { echo "SECRET_KEY was empty"; exit 1; }
[[ -z "${BOOTSTRAP_SERVERS}" ]] && { echo "BOOTSTRAP_SERVERS was empty"; exit 1; }
[[ -z "${SCHEMA_REGISTRY_API_KEY}" ]] && { echo "SCHEMA_REGISTRY_API_KEY was empty"; exit 1; }
[[ -z "${SCHEMA_REGISTRY_SECRET_KEY}" ]] && { echo "SCHEMA_REGISTRY_SECRET_KEY was empty"; exit 1; }
[[ -z "${SCHEMA_REGISTRY_URL}" ]] && { echo "SCHEMA_REGISTRY_URL was empty"; exit 1; }

export B64_API_KEY=$(base64 <(echo ${API_KEY} | tr -d \\n))
export B64_SECRET_KEY=$(base64 <(echo ${SECRET_KEY} | tr -d \\n))
export B64_BOOTSTRAP_SERVERS=$(base64 <(echo ${BOOTSTRAP_SERVERS} | tr -d \\n))
export B64_SCHEMA_REGISTRY_API_KEY=$(base64 <(echo ${SCHEMA_REGISTRY_API_KEY} | tr -d \\n))
export B64_SCHEMA_REGISTRY_SECRET_KEY=$(base64 <(echo ${SCHEMA_REGISTRY_SECRET_KEY} | tr -d \\n))
export B64_SCHEMA_REGISTRY_URL=$(base64 <(echo ${SCHEMA_REGISTRY_URL} | tr -d \\n))

envsubst <<EOF | kubectl apply -f -
---
apiVersion: v1
kind: Secret
metadata:
  name: ccloud-${ENV}-secrets
  namespace: ${ENV}
data:
  api-key: ${B64_API_KEY}
  secret-key: ${B64_SECRET_KEY}
  bootstrap-servers: ${B64_BOOTSTRAP_SERVERS}
  schema-registry-api-key: ${B64_SCHEMA_REGISTRY_API_KEY}
  schema-registry-secret-key: ${B64_SCHEMA_REGISTRY_SECRET_KEY}
  schema-registry-url: ${B64_SCHEMA_REGISTRY_URL}

EOF
```


```
DEBUG [Producer clientId=producer-1] Exception occurred during message send:
ERROR org.apache.kafka.common.errors.TopicAuthorizationException: Not authorized to access topics: [BLOG-TOPIC]
WARN Error while fetching metadata with correlation id 22 : {BLOG-TOPIC=TOPIC_AUTHORIZATION_FAILED}
ERROR Topic authorization failed for topics [BLOG-TOPIC]
```


ENV: ${{ secrets.ENV }}
API_KEY: ${{ secrets.API_KEY }}
SECRET_KEY: ${{ secrets.SECRET_KEY }}
BOOTSTRAP_SERVERS: ${{ secrets.BOOTSTRAP_SERVERS }}
SCHEMA_REGISTRY_API_KEY: ${{ secrets.SCHEMA_REGISTRY_API_KEY }}
SCHEMA_REGISTRY_SECRET_KEY: ${{ secrets.SCHEMA_REGISTRY_SECRET_KEY }}
SCHEMA_REGISTRY_URL: ${{ secrets.SCHEMA_REGISTRY_URL }}