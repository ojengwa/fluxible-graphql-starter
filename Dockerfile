FROM node:10.14.2-slim

# Create app directory
WORKDIR /app

# Copy app to directory
COPY . /app/

# Install app dependencies
RUN yarn install

# Compile app
RUN yarn build

# Run Database Migrations
RUN yarn db:migrate

EXPOSE 3000
CMD yarn start
