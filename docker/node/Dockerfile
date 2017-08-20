FROM node:8.4

# Create app directory
RUN mkdir -p /home/persons-and-apartments
RUN mkdir -p /home/persons-and-apartments/dbs
WORKDIR /home/persons-and-apartments

# Install app dependencies
COPY package.json /home/persons-and-apartments
RUN npm install

# Bundle app source
COPY app.js /home/persons-and-apartments

EXPOSE 8080
CMD [ "npm", "run", "start-inside-docker" ]
