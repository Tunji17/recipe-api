FROM node:11

ENV PATH /app/user/bin:$PATH

WORKDIR /app/user

COPY package.json package-lock.json /app/user/

RUN npm install

COPY . /app/user/