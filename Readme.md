## *Objective:*
Your task is to create a backend system using Node.js that enables users to upload text files, initiate text analysis on these files, and retrieve the results of such analyses. You can use Javascript or Typescript and any framework of your choice such as Express, Next.js or Nest.js.

## *High-Level Requirements:*

1. *File Upload:*
   - Build an API endpoint enabling users to upload text files.
   - Upon successful upload, generate and return a unique fileId for the file.
   - Store metadata of the uploaded file (like filename and upload date) in the database.

2. *Initiate Analysis Task:*
   - Develop an API endpoint that allows users to start a text analysis task on an uploaded file, identified by its fileId.
   - The endpoint should support the following analysis operations:
     - countWords: Counts the total number of words in the text.
     - countUniqueWords: Counts the number of unique words.
     - findTopKWords: Finds the {k} most frequent words in the text (k is user provided parameter).
   - Users must specify the analysis operation and options in their request.
   - When a task is initiated, return a unique taskId for tracking and retrieving the analysis results.

3. *Retrieve Analysis Results:*
   - Implement an API endpoint to fetch the results of an analysis task using the taskId.
   - The response should return the results of the requested analysis operation.


## *Database Requirements:*
- Select a suitable database (options include SQL, NoSQL, or Redis) for storing file metadata and analysis results.
- Your database schema should be designed to efficiently facilitate the operations required by the system.
- You can use ORM such as Prisma to interact with the database.

# Prisma Schema Summary

## Overview

This Prisma schema defines the data models for a MongoDB database using Prisma Client. The schema includes two models, `File` and `AnalysisResult`, to represent files uploaded to the system and the results of various analyses performed on those files.

## Models

### 1. File

- **Fields:**
  - `id`: Auto-generated unique identifier for the file record.
  - `fileId`: Unique identifier for the file, often generated based on a timestamp.
  - `filename`: The name of the uploaded file.
  - `uploadDate`: Date and time when the file was uploaded, set to the current timestamp by default.

### 2. AnalysisResult

- **Fields:**
  - `id`: Auto-generated unique identifier for the analysis result record.
  - `taskId`: Unique identifier for the analysis task, often generated based on a specific operation.
  - `fileId`: Reference to the corresponding `File` that the analysis result belongs to.
  - `operation`: The type of analysis operation performed.
  - `result`: JSON data representing the result of the analysis operation.

## Datasource

The schema specifies a MongoDB datasource named `db` with the `mongodb` provider. The connection URL is configured through the `DATABASE_URL` environment variable available in the .env file which is to be created in the root directory.

## Prisma Client

The Prisma schema includes a `client` block specifying the use of the "prisma-client-js" provider, indicating the generation of a Prisma Client for JavaScript.

## Notes

- The `ObjectId` type is used for identifiers in MongoDB.
- The schema assumes the existence of a MongoDB database with a connection URL provided through the `DATABASE_URL` environment variable.


## sample .env file structure
```
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>"
UPLOAD_PATH="uploads"
```
### modify the DATABASE_URL according to the connection string in mongodb atlas

## installing dependencies and start the server
```
npm i
npx prisma generate
node index.js

```

## Use this api endpoint to run the backend requests in postman
### Import the collection into your postman workspace by using this url
https://api.postman.com/collections/14912192-543839b9-18e4-4a59-9f4c-12ce17363f7a?access_key=PMAT-01HM4RG3652ETRGCG890198FCG