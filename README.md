# Starter CRUD API
A lightweight CRUD application that be used to start any project.  It uses Express JS to expose HTTP endpoints that perform CRUD operations on a Mongo database.

## Routes
|Route|Operation|Description|
|---|---|---|
|GET /|N/A|Loads the root route|
|GET /api|N/A|Loads the /api route|
|GET /api/posts|Read all|Gets all the posts|
|GET /api/posts/:id|Read one|Gets one specific post|
|POST /api/posts/|Create one|Creates a new post|
|PUT /api/posts/:id|Update one|Updates a specific post|
|DELETE /api/posts/:id|Delete one|Deletes a specific post|


## Setup

```
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
