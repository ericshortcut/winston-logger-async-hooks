FROM node:16
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD [ "node","index.js" ]
# CMD [ "tail","-f","/dev/null" ]