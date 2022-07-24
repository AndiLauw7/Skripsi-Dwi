FROM node:16

 

# Create app directory

WORKDIR /app

# Install app dependencies

COPY package*.json ./


 

RUN npm install

# If you are building your code for production

# Bundle app source

COPY . .

CMD ["npm", "run", "start"]

EXPOSE 3000
