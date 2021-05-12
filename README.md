# docker-demo

Sample project created to play with docker

# Docker

### Basic commands

#### Run

` docker run nginx`

- Run the cached version of nginx if avaialble, otherwise docker will download the image from docker hub and run
- By default the run command will run in attached mode all the output stream data is sent to the caller (ex terminal)

### Run specific version

```
docker run ubuntu:16:05
```

#### Run with name

```
docker run --name 'container_name' 'image_name'
```

#### Run and append a command

```
docker run ubuntu sleep 5

docker run -it ubuntu bash
```

#### Run in detached mode

`docker run -d "name"`

#### Attach to the already running container

`docker attach 'container_id'`

### List containers

```
docker ps  // List all running containers
docker ps -a // List all containers
```

### Execute a command in running container

```
docker exec 'container_id' 'command_to_execute'
```

### Stop container

```
docker stop 'container_name'
docker stop 'container_1_name' 'container_2_name' ... 'container_n_name'

docker stop 'container_id'
docker stop 'container_1_id' 'container_2_id' ... 'container_n_id'
```

### Remove container

```
docker rm 'container_name'
docker rm 'container_1_name' 'container_2_name' ... 'container_n_name'

docker rm 'container_1_id' 'container_2_id' ... 'container_n_id'
```

Note: Cannot remove a running container, should stop the container before removing

### List docker images

`docker images`

### Remove docker image

```
docker rmi 'image_name'

docker rmi 'image_id'

docker rmi 'image_1_id' 'image_2_id' ... 'image_n_id'
```

Note: Remove all container referring the image, before deleting an image

### Download docker images

`docker pull 'image_name'`

### Port mapping

```
docker run -p 'docker_host_port':'docker_container_app_port' 'container_name'

docker run -p 80:8080 app-name
```

### Volume mapping

```
docker run -v 'docker_host_dir':'docker_container_dir' 'container_name'

docker run -v /opt/datadir:/var/lib/mysql mysql
```

### Inspect container

```
docker inspect 'container_name'
```

### Logs

```
docker logs 'container_name'
```

### Dockerfile

```
FROM UBUNTU
RUN apt-get update && apt-get -y install python
RUN pip install flask
COPY  .  /opt/flask-app
ENTRYPOINT FLASK_APP = /opt/flask-app/app.py flask run
```

### History

```
docker history 'container_name'
```

### Command

CMD placed at the end of the docker file will be executed when running the docker image

File ubuntu_custom (docker file)

```
FROM ubuntu

CMD cat /etc/*-release
```

build & run using following command

```
docker build -t ubuntu_cmd .
docker run ubuntu_cmd
```

When run the above docker image, release information of the ubuntu distribution will be displayed on terminal

CMD can be replaced when running the image also

```
docker run ubuntu_cmd sleep 5
```

### CMD syntax

```
CMD ["executable","param1","param2"]
CMD "executable param1 param2"
```

In the above case instead of printing release information the os sleeps for 5 seconds then exit

### Entrypoint

Entrypoint instruction, similar to CMD, but it can't be replaced by the command-line parameter instead any additional command-line parameters will get appended to the entry point

```
FROM ubuntu

ENTRYPOINT ["cat"]

CMD ["/etc/adduser.conf"]
```

Build & run

```
docker build -t print_file .

docker  run print_file //No cmd-line argument, print /etc/adduser.conf

docker run print_file /etc/*-release // Print /etc/*-release

```

### Entrypoint syntax

```
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2

```

### Docker compose

Example compose. app is dependent on redis

```
version: "3"
services:
  redis:
    image: "redis"
    ports:
      - 6379:6379

  app:
    build: .
    ports:
      - 3000:8080
    links:
      - redis
    environment:
      - REDIS_URL=redis://redis
    depends_on:
      - redis
```

### Links

Example to link Redis to application

```
docker run --name 'app_name' --link redis:redis -p 3000:8080 --env=REDIS_URL=redis://redis "app_image_name"
```
