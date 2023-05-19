# Udacity - Cloud Developer Nanodegree Capstone

## Functionality of the application

The application allows creating/removing/updating/fetching Product items. Each Product item can optionally have an attachment image. Each user only has access to Product items that he/she has created.

<div align="center">
  <img src="./screenshots/product_app.png" alt="Product App" style="zoom:40%;" />
</div>

***

## Implemented functions

The following lambda functions have been implemented (and set up in serverless.yml):
- Auth: Lambda authorizer (formerly custom authorizer)
- GetProducts: retrieves all products for
- GetProduct: retrieves one product (by id)
- CreateProduct: creates a new product item
- UpdateProduct: updates a product item
- DeleteProduct: removes a product item
- GenerateUploadUrl: returns a signed url for uploading an image file to AWS S3

The JSON shape of a product item
```
  {
    "cost": 4,
    "attachmentUrl": "https://udacity-serverless-product-images-dev.s3.amazonaws.com/4f8a50d2-b87e-423a-bad5-732d5b463ac1",
    "category": "sđfdfdfd",
    "createdAt": "2023-05-18T17:41:20.215Z",
    "description": "dffd",
    "name": "dfdfsdfdf",
    "productId": "4f8a50d2-b87e-423a-bad5-732d5b463ac1"
  }
```
All functions are already connected to appropriate events from API Gateway.
An id of a user can be extracted from a JWT token passed by a client.

Authentication is implemented with Auth0 (using asymmetrically encrypted JWT tokens).

***
## Frontend

The `client` folder contains a web application that can use the API that should be developed in the project. The apiId binding in `environment.ts` should be set to the correct value.

This file configures your client application just as it was done in the course and contains an API endpoint and Auth0 configuration:

```ts
let apiId = '....'; // API Gateway id
export const environment = {
    production: false,
    apiEndpoint: `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`,
    auth0: {
        domain: '...',
        clientId: '....',
        redirectUri: 'http://localhost:4200/callback'
    }
};


```

***

# How to run the application

## Backend

To deploy an application run the following commands:
export NODE_OPTIONS=--max_old_space_size=8192

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/app/environments/environment.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm start
```

This should start a development server with the React application that will interact with the serverless Product application.

***

# Monitoring
## Distributed tracing

X-Ray tracing has been set up

<div align="center">
  <img src="./screenshots/xray1.png" alt="1. X-Ray of the app" style="zoom:40%;" />
</div>

<div align="center">
  <img src="./screenshots/xray2.png" alt="2. X-Ray of the app" style="zoom:40%;" />
</div>

## Logging

The starter code came with a configured [Winston](https://github.com/winstonjs/winston) logger that creates [JSON formatted](https://stackify.com/what-is-structured-logging-and-why-developers-need-it/) log statements. It is used to write log messages like this:

<div align="center">
  <img src="./screenshots/CloudWatch_logs.png" alt="CloudWatch logs" style="zoom:40%;" />
</div>

```ts
import { createLogger } from '../../utils/logger'
const logger = createLogger('auth')

// You can provide additional information with every log statement
// This information can then be used to search for log statements in a log storage system
logger.info('User was authorized', {
  // Additional information stored with a log statement
  key: 'value'
})
```

<div align="center">
  <img src="./screenshots/log_events.png" alt="DeleteProduct log" style="zoom:40%;" />
</div>

***

## Postman collection

An alternative way to test your API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project.

<div align="center">
  <img src="./screenshots/postman.png" alt="Postman" style="zoom:40%;" />
</div>
