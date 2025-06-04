FROM node:alpine
WORKDIR /app
COPY package*.json /app
RUN npm install
RUN npm install serve
COPY . /app
RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 4010