# High Availability Chat Application

This code is a template for a HA chat application. It uses a fargate cluster behind a load balancer and it includes the UI

## Infrastructure

A fargate cluster that communicates with a redis database in elastic cache.

The containers provide an API for accessing the frontend files and a port for connecting to the websocket.

![Infrastructure](https://user-images.githubusercontent.com/16513413/97634600-5ac93e80-1a0c-11eb-9803-d8645654c7a4.png)

## Deployment

```
yarn
yarn client_install
yarn client_build
yarn server_build
```

create a python virtual environment and run

```
pip install -r cdkChat/requirements.txt
cdk deploy chat-base
cdk deploy chat-cluster
```
