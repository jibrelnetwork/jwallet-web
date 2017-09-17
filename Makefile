ECHO = /bin/echo
GIT = /usr/bin/git
DOCKER = /usr/bin/docker

GIT-REPOSITORY-BRANCH = master
DOCKER-IMAGE-TAG = jibrel-web-platform
DOCKER-CONTAINER-NAME = jwp

git-pull:
	$(ECHO) "Pulling master branch"
	$(GIT) pull origin $(GIT-REPOSITORY-BRANCH)

docker-build:
	$(ECHO) "Building docker image"
	$(DOCKER) build -t $(DOCKER-IMAGE-TAG) .

docker-start:
	$(ECHO) "Starting of docker container"
	$(DOCKER) run -d --name $(DOCKER-CONTAINER-NAME) -p 80:3000 $(DOCKER-IMAGE-TAG)

docker-stop:
	$(ECHO) "Stopping of docker container"
	$(DOCKER) stop $(DOCKER-CONTAINER-NAME)

docker-restart: docker-rm docker-start

docker-rm: docker-stop
	$(ECHO) "Removing of docker container"
	$(DOCKER) rm -f $(DOCKER-CONTAINER-NAME)
