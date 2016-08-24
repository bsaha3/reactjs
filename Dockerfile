FROM mhart/alpine-node:6.3.0
RUN npm install  -g json-server
COPY db.json .
RUN mkdir public
COPY public public
CMD ["json-server","db.json","--port","8080"]
