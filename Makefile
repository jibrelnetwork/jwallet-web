ECHO = /bin/echo
GIT = /usr/bin/git
DOCKER = /usr/bin/docker
NPM = /usr/bin/npm

GIT-REPOSITORY-DEV-BRANCH = dev
GIT-REPOSITORY-MASTER-BRANCH = master
DOCKER-IMAGE-TAG = jwallet-web
DOCKER-CONTAINER-NAME = jwp

git-pull-dev:
	$(ECHO) "Pulling dev branch"
	$(GIT) pull origin $(GIT-REPOSITORY-DEV-BRANCH)

git-pull-master:
	$(ECHO) "Pulling master branch"
	$(GIT) pull origin $(GIT-REPOSITORY-MASTER-BRANCH)

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

npm-install:
	$(ECHO) "Installing of npm packages"
	$(NPM) install

compile:
	$(ECHO) "Compiling of production bundle"
	$(NPM) run compile:prod 
