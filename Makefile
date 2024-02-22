MAKEFLAGS += --silent --keep-going

DOCKER_COMPOSE_LOCAL = $(shell echo ".docker/docker-compose.local.yml")
DOCKER_COMPOSE_PROD = $(shell echo ".docker/docker-compose.prod.yml")

########################################################################################
####                               Local Environment                                ####
########################################################################################
.PHONY: docker-build-local docker-run-local docker-run-attach-local docker-down-local

docker-build-local:
	@docker-compose \
 		--file $(DOCKER_COMPOSE_LOCAL) \
		--project-directory . \
 		build \
		--no-cache
	@echo "[INFO] Local instance was successfully built!"

docker-run-local:
	@docker-compose \
		--file $(DOCKER_COMPOSE_LOCAL) \
		--project-directory . \
		up \
		--detach
	@echo "[INFO] Local instance was successfully started!"

docker-run-attach-local:
	@docker-compose \
		--file $(DOCKER_COMPOSE_LOCAL) \
		--project-directory . \
		up
	@echo "[INFO] Local instance was successfully started and attached!"

docker-down-local:
	@docker-compose \
		--file $(DOCKER_COMPOSE_LOCAL) \
		--project-directory . \
 		down --remove-orphans
	@echo "[INFO] Local instance was successfully downed."

########################################################################################
####                            Production Environment                              ####
########################################################################################
.PHONY: docker-build-prod docker-run-prod docker-run-attach-prod docker-down-prod

docker-build-prod:
	@docker-compose \
 		--file $(DOCKER_COMPOSE_PROD) \
		--project-directory . \
 		build \
		--no-cache
	@echo "[INFO] Production instance was successfully built!"

docker-run-prod:
	@docker-compose \
		--file $(DOCKER_COMPOSE_PROD) \
		--project-directory . \
		up \
		--detach
	@echo "[INFO] Production instance was successfully started!"

docker-run-attach-prod:
	@docker-compose \
		--file $(DOCKER_COMPOSE_PROD) \
		--project-directory . \
		up
	@echo "[INFO] Production instance was successfully started and attached!"

docker-down-prod:
	@docker-compose \
		--file $(DOCKER_COMPOSE_PROD) \
		--project-directory . \
 		down --remove-orphans
	@echo "[INFO] Production instance was successfully downed."

########################################################################################
####                              NPM BASE SCRIPTS                                  ####
########################################################################################
.PHONY: dev build start test lint clean

dev:
	@pnpm run dev

build:
	@pnpm run build

start:
	@pnpm run start

test:
	@pnpm run test

lint:
	@pnpm run lint

clean:
	@pnpm run clean

########################################################################################
####                                 NPM SCRIPTS                                    ####
########################################################################################
.PHONY: dev-api dev-web dev-web-electron dev-nuxt dev-mobile build-api build-web build-web-electron build-nuxt build-mobile start-api start-web start-nuxt mobile-android mobile-ios

dev-api:
	@pnpm run dev-api

dev-web:
	@pnpm run dev-web

dev-web-electron:
	@pnpm run dev-web-electron

dev-nuxt:
	@pnpm run dev-nuxt

dev-mobile:
	@pnpm run dev-mobile

build-api:
	@pnpm run build-api

build-web:
	@pnpm run build-web

build-web-electron:
	@pnpm run build-web-electron

build-nuxt:
	@pnpm run build-nuxt

build-mobile:
	@pnpm run build-mobile

start-api:
	@pnpm run start-api

start-web:
	@pnpm run start-web

start-nuxt:
	@pnpm run start-nuxt

mobile-android:
	@pnpm run mobile-android

mobile-ios:
	@pnpm run mobile-ios
