FROM mcr.microsoft.com/playwright:v1.44.1-jammy

RUN apt update
RUN apt install default-jre default-jdk -y

WORKDIR /code
