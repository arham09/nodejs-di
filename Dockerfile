# Base Image
FROM node:12.16-alpine


# Create App Directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 2020
CMD [ "npm", "run", "start" ]

# docker build -t <your username>/node-web-app .