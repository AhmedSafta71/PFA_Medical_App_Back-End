# Backend Medical API for End-of-Year Project
This repository contains the backend code for the Medical API, developed as part of my end-of-year project. The API provides functionality related to medical records, appointments, and other healthcare-related features.

# Installation
To set up the project, follow these steps:

Install the necessary node modules by running the following command:


npm install
Create a .env file in the root directory of the project and set the required modifications. Here is an example of the .env file structure:

PORT=4000
NODE_ENV=DEVELOPMENT
DB_URI=<your_database_uri>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_TIME=<your_jwt_expires_time>
COOKIE_EXPIRES_TIME=<your_cookie_expires_time>
SMTP_HOST=<your_smtp_host>
SMTP_PORT=<your_smtp_port>
SMTP_EMAIL=<your_smtp_email>
SMTP_PASSWORD=<your_smtp_password>
SMTP_FROM_EMAIL=<your_smtp_from_email>
SMTP_FROM_NAME=<your_smtp_from_name>
Replace <your_...> with the appropriate values for your environment.

# Usage
To run the project in development mode, use the following command:

npm run start
This will start the API server, and you can make requests to the defined endpoints.

# Contributing
Contributions to the project are welcome. If you encounter any issues or have suggestions for improvement, please create an issue or submit a pull request.
