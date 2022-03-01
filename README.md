# Working sample of microservices with kubernetes
- These two micro services can be used as api on http://localhost:3001 and http://localhost:3002.
- These two micro services are talking with [Request-Response](https://docs.nestjs.com/microservices/nats#request-response)
- These two micro services are built with [nestjs](https://docs.nestjs.com/microservices/basics
)
- Have a look at the Hybrid application documentation https://docs.nestjs.com/faq/hybrid-application



## How to setup locally?
---

- Setup [NATs server](https://nats.io/)

```bash
# Install dependencies for microservice1
$ cd microservice1 && npm i && NODE_ENV NATS_HOST=locahost npm start


# In another terminal install dependencies for microservice2
$ cd microservice2 && npm i && NODE_ENV NATS_HOST=locahost npm start
```
- Visit http://localhost3001 to check the result.


## How to setup in kubernetes locally?
---
```bash
# CD to microservice1
$ cd microservice1

# Build docker image
$ docker build -t username/microservice1 .
```
_... do same for microservice2_

```bash
# CD to microservice1
$ cd microservice2

# Build docker image
$ docker build -t username/microservice2 .
```

Push image to dockerhub
```bash
$ docker push username/microservice2 && docker push username/microservice2
```
After pushing to dockerhub, update your dockerhub username in microservice1-depl.yaml

```yaml
spec:
  containers:
    - name: microservice1
      image: sssrockgupta/microservice1 # <= Replace username
```

Then apply kubernetes yaml files,
```bash
$ kubectl apply -f ./infra/k8s\
```

You need to add `microservice.com` in host file as well,
``C:\Windows\System32\drivers\etc\hosts``

... And done. Phew

Test it in browser
| Visit http://microservice.com/micro1
