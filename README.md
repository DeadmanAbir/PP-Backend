# PP-Backend

PP-Backend is the backend project for Post-Pilot, a platform that helps you to automate your Linkedln posts. 

## Features

- User authentication and authorization
- Project creation and management
- Notification system
- GPT integration

## Technologies

- Node JS
- Express
- OpenAI
- MongoDB
- Mongoose
- NodeMailer

## Installation

To run this project locally, you need to have latest Node JS installed on your machine. Then, follow these steps:

1. Clone this repository: `git clone https://github.com/DeadmanAbir/PP-Backend.git`
2. Change your directory: `cd PP-Backend`
3. Create a .env file in the root of project, and set up the required environment variables such as database connection details, API keys, and other configurations.
5. Set up your MongoDB with your corresponding MongoURL
6. Run `npm install`
7. Run `nodemon index.js`


## Work

The backend has different routes for different operations.

- The `cronJobs` route if for all those apis which have to be hitted up once in a day.
- The `Linkedin` route handles every thing like accessing the tokens from user etc.
- The `general` route involves general operations like User Management, Project Deletion etc.

## Scraper

Postpilot has a scraper bot which scrapes data everyday and stores it into DB. Later that data is used to generare quality posts.

**Scraper Repo** - https://github.com/DeadmanAbir/PP-Scraper

