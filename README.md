# Starter CRUD API
A lightweight CRUD application that be used to start any project.  It uses Express JS to expose HTTP endpoints that perform CRUD operations on a Mongo database.

## Routes
|Route|Operation|Description|
|---|---|---|
|GET /|N/A|Loads the root route|
|GET /api|N/A|Loads the /api route|
|GET /api/posts|Read all|Gets all the posts|
|GET /api/posts/id|Read one|Gets a specific post|
|POST /api/posts/|Create one|Creates a new post|
|PUT /api/posts/id|Update one|Updates a specific post|
|DELETE /api/posts/id|Delete one|Deletes a specific post|


## Using Postman
If you use [Postman](https://www.getpostman.com/) you can click the following button to import the CRUD API Starter as a collection:  
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3750251-61450419-140e-4cb2-947f-e77837d4f012-T1LQfQpF)


## Setup
Make sure MongoDB is <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/" target="_blanks">installed and running</a>.

```
aws configure
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```
