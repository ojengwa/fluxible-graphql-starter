# student


## Usage
This project can be deployed in one of two ways:
* In a container
* As a process on the host machine

1. ## Container based-deploy
   You would need to have the latest (Docker)[https://docker.com] installed.
   1. Ensure that the docker daemon is running by executing `docker` in your terminal
   2. CD into the root of this project `cd <path_to_this_project>`
   3. Run the docker-compose command `docker-compose -f docker-compose.dev.yml up`
    Note that there are four docker-compose files in the root directory. 
    Each file is specifically written for different deployment environments
2. ## Non-container deploy
   You would need to have your Mysql/MariaDB and NodeJS (verion 10.14.x) installed
   1. Ensure that your Mysql database running by executing `mysql -u <mysql_username>` in your terminal.
   2. Ensure that you have the required NodeJS version by executing `node --version` in your terminal.
   3. CD into the root of this project `cd <path_to_this_project>`
   4. Install the project dependencies by executing `yarn install`
   5. Run the database schema migrations by executing `yarn db:migrate`
   6. Alternatively seed the database tables by executing `yarn db:seed`
   7. Compile the app by executing `yarn build`
   8. Start the app server by executing `yarn start`

This will use `nodemon` and `webpack` to watch for changes and restart and rebuild as needed.

Open http://localhost:3000
