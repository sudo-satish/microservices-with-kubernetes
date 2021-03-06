# Monorepo

This is a monorepo which have 2 microservices
1. microservice1: [nestjs](https://docs.nestjs.com)
2. microservice2: [nestjs](https://docs.nestjs.com)

## Monorepo setup
This project is built on top of the [turborepo](https://turborepo.org/)
# Working sample of microservices with kubernetes
- These two micro services can be used as api on http://localhost:3001 and http://localhost:3002.
- These two micro services are talking with [Request-Response](https://docs.nestjs.com/microservices/nats#request-response)
- These two micro services are built with [nestjs](https://docs.nestjs.com/microservices/basics
)
- Have a look at the Hybrid application documentation https://docs.nestjs.com/faq/hybrid-application



## How to setup locally?
---

- Setup [NATs server](https://nats.io/)
-- OR --
If you wanna spin a nets-streaming server with docker 

```bash
$ docker run --rm --name=jst -p 4222:4222 nats-streaming:0.17.0  -hbi 5s -hbt 5s -hbf 2 -SD -cid ticketing
```

### Install dependencies

```bash
$ npm i
```

```bash
# Install dependencies for microservice1
$ cd apps/be/microservice1 && npm i && npm start

# In another terminal install dependencies for microservice2
$ cd apps/be/microservice2 && npm i && npm start
```
- Visit http://localhost to check if fe-microservice is working
- Visit http://localhost/m1 to check if be/microservice1 is working.
- Visit http://localhost/m2 to check if be/microservice2 is working.




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

## You need to install ingress-controller

### What is ingress-controller
[ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop)

```bash
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
```
Then apply kubernetes yaml files,
```bash
$ kubectl apply -f ./infra/k8s
```

Stop applied kubernetes yaml files,

```bash
$ kubectl delete -f ./infra/k8s
```

You need to add `microservice.com` in host file as well for Windows,
``C:\Windows\System32\drivers\etc\hosts``

You need to add `microservice.com` in host file as well for Mac,
``sudo nano /etc/hosts``

... And done. Phew

Test it in browser
| Visit http://microservice.com/micro1


## How to use docker-compose.yml

Export NPM_TOKEN to access @satishkumr001/ui and @satishkumr001/common from docker
```bash
$ export NPM_TOKEN=npm_6xxxx
```

Run
```bash
$ docker-compose up
```

# Note:
If you wanna spin a nets-streaming server with docker 
```bash
$ docker run --rm --name=jst -p 4222:4222 nats-streaming:0.17.0  -hbi 5s -hbt 5s -hbf 2 -SD -cid ticketing
```


# Cleanup

### Stop applied kubernetes yaml files,

```bash
$ kubectl delete -f ./infra/k8s
```
### Delete ingress-controller Deployment

```bash
$ kubectl get controller --namespace=ingress-nginx
$ kubectl delete controller ${controller-name} --namespace=ingress-nginx
```


## How to add a new Workspace?

Install dependencies in newly added workspace
```bash
$ npm i --workspace=apps/fe/fe-microservice1
```
then, run

```bash
$ npm run start:dev --workspace=apps/fe/fe-microservice1
```
to start dev server of newly added work space or else it will not work,

Once runing above command, You can then normally run cmds.

```bash
$ npm run start:dev
```

npm run start:dev --workspace=packages/common