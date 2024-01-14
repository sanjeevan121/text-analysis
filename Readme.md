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

