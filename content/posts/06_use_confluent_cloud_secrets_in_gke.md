---
title: "Use Confluent Cloud secrets in GKE"
date: 2020-04-09T09:00:00+01:00
draft: false
author: "Loïc DIVAD"
extra_css: ["css/post.css"]
tags: ["tooling", "cloud"]
thumbnail: thumbnail006.png
---

On your journey to build event stream and real-time applications you have probably heard about [Confluent Cloud](https://www.confluent.io/confluent-cloud/):

> [...] a fully managed, cloud-native event streaming platform powered by Apache Kafka.

The team behind this service is putting a lot of efforts to provide a smooth and complete experience in working with Apache Kafka in the cloud. Theses efforts include security of courses. This short post gives an overview of the programmatic access to a cluster and shares a quick script I use sometimes to deploy pet projects on [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine) (aka, GKE). The post also takes advantage of the command line tool [ccloud](https://docs.confluent.io/current/cloud/cli/install.html). I use my personal standard account in this post. 

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

Finally, it's time to deploy our client application capable to produce in and consume from Kafka topics. But at this point, our Confluent Cloud interface might be asking us for new API keys:

![foo](/images/posts/06/cluster_settings.png)

Let's create the API keys we need to provide to our application in order to connect to both the Kafka cluster and the Schema Registry cluster

```text
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

Now we have the API Keys needed to run a Kafka Client application on behalf of the service account `BlogPostAccount`. All we have to do is share these keys.

![foo](/images/posts/06/confluent_api_keys_ui.png)

### Application deployment and topics provisioning and

In order to easily deploy our Kafka Clients in a GKE cluster, we can store our Confluent Cloud credentials as [Kubernetes Secrets](https://kubernetes.io/en/docs/concepts/configuration/secret/)[.](https://kubernetes.io/fr/docs/concepts/configuration/secret/) All the keys need to be encoded in base64 and included in a proper JSON or YAML document. I do a substantial number of demos and pet projects, so after repeating those steps a few time I made this script: 

{{< gist DivLoic 3140e78aad02f76ccbaf3a640f2215d5 >}}

Quite handy, isn't it? How to use it? It can be included in a CI process to be part of our deployment phase. we just need to declare the Confluent API Keys as environment variables. For instance, [Github Action](https://github.com/features/actions) has the concept of secrets. 

![foo](/images/posts/06/github_actions_secrets.png)

In the Github Action workflow, we may need to install tools such as `kubctl`, `gcloud` or additional SDKs.

```yaml
jobs:
  main:
    steps:
      - name: Setup gcloud environment
        uses: GoogleCloudPlatform/github-actions@0.1.2
```

Then we run the script by passing our secrets as environment variables.

```yaml
- run: .ccloud-secrets.sh
  env: 
    API_KEY: ${{ secrets.API_KEY }}
    SECRET_KEY: ${{ secrets.SECRET_KEY }}
    BOOTSTRAP_SERVERS: ${{ secrets.BOOTSTRAP_SERVERS }}
    SCHEMA_REGISTRY_API_KEY: ${{ secrets.SCHEMA_REGISTRY_API_KEY }}
    SCHEMA_REGISTRY_SECRET_KEY: ${{ secrets.SCHEMA_REGISTRY_SECRET_KEY }}
    SCHEMA_REGISTRY_URL: ${{ secrets.SCHEMA_REGISTRY_URL }}
```

In the end of the workflow execution, a new config of type "secret" appears in the GKE interface.

![foo](/images/posts/06/gke_config_map_secrets_1.png)

All the entries are secured and can be safely access thought `spec.containers.env`.

![foo](/images/posts/06/gke_config_map_secrets_2.png)

We create the Kafka topics with the following commands:

```bash
$ ccloud kafka topic create BLOG-TOPIC
$ ccloud kafka acl create --allow \
  --service-account 54876 \
  --operation WRITE \
  --topic BLOG-TOPIC
```

Any write attempt without the access key result in a `TopicAuthorizationException`.

```text
DEBUG [Producer clientId=producer-1] Exception occurred during message send:
ERROR org.apache.kafka.common.errors.TopicAuthorizationException: Not authorized to access topics: [BLOG-TOPIC]
WARN Error while fetching metadata with correlation id 22 : {BLOG-TOPIC=TOPIC_AUTHORIZATION_FAILED}
ERROR Topic authorization failed for topics [BLOG-TOPIC]
```

### Conclusion

Finally, the key generation is super smooth! We don't need anything else to configure our application and start to use protocol SASL to authenticate to Kafka. Because we can do all the thing from the command line, we could also script and include in a CI. Next step could be to include a Secret Management Service such as Keepass or [HashiCorp Vault](https://www.vaultproject.io/) in our new routine.