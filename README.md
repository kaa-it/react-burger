# Учебный проект Stellar Burgers

Сайт проекта: [Stellar Burgers](https://akruglov.tech).

## Установка с помощью готового дистрибутива

* Для установки дистрибутива необходима виртуальная машина или компьютер (далее ВМ) с предустановленными docker и docker-compose
  (инструкции по установке docker и docker-compose можно найти [здесь](https://docs.docker.com/get-docker/)).
* Необходимо загрузить на ВМ файл docker-compose.yml.
* В папку /var/certs на ВМ необходимо положить файл SSL сертификата (certificate.crt) и
  файл с ключом сертификата (certificate.key).
* При необходимости пути к сертификатам можно изменить в файле docker-compose.yml:

    ```
    environment:
          - UI_PATH=/var/ui
          - KEY_PATH=/var/certs/<файл ключа>
          - CERT_PATH=/var/certs/<файл сертификата>
        volumes:
          - <новый путь>:/var/certs
    ```

* Запустите команду `docker-compose up -d`  в папке на ВМ, в которой находится файл docker-compose.yml.
* Установка завершена.

## Сборка своего дистрибутива

Чтобы собрать свой дистрибутив необходимо:

* Создать аккаунт на сайте [DockerHub](https://hub.docker.com).
* Создать репозиторий react-burger в своем аккаунте на этом сайте.
* В файле Makefile заменить все вхождения "akruglov" на свой логин на сайте DockerHub.
* Запустить команду `make push` или выполнить вручную команды из этого файла, если утилита
  make не установлена на вашем компьютере.
* Дистрибутив будет загружен в ваш репозиторий на сайте DockerHub.
* Чтобы использовать для установки свой дистрибутив необходимо заменить в файле
  docker-compose.yml название образа на свой:

    ```
    stellar_burger:
        image: <ваш образ>
    ```
    В остальном алгоритм установки аналогичен установке с помощью готового дистрибутива.