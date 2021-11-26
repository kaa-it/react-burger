.PHONY: build push

VERSION := 1.0.0

build:
	docker build -t "react-burger:${VERSION}" ./
	docker tag "react-burger:${VERSION}" "akruglov/react-burger:${VERSION}"
	docker tag "react-burger:${VERSION}" "akruglov/react-burger:latest"

push: build
	docker login
	docker image push "akruglov/react-burger:${VERSION}"
	docker image push "akruglov/react-burger:latest"