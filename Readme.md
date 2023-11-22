# CHATBOT PDFGPT - Create a ChatGPT Chatbot for Your PDF Files

Use the new GPT-3.5 TURBO api to build a chatGPT chatbot for multiple Large PDF files.

Tech stack used includes LangChain, Faiss, Fs library, Nodejs, ReactJs, Openai, and JSX. LangChain is a framework that makes it easier to build scalable AI/LLM apps and chatbots. Faiss is a vectorstore for storing embeddings and your PDF in text to later retrieve similar docs.
![Screenshot (31)](https://github.com/sonu7524/Chatbot-PDFGPT-MERN/assets/100096513/cd681ce3-53da-4771-8e59-0acd78bd15d8)

## Approach

1. Frontend- It uses reactjs and other libraries such as MUI, axios, react-router-dom
    - MUI- for UI
    - axios- fetching data from server
    - react-router-dom- Navigate to different pages

2. Backend- It uses LLM, express, nodemon, multer, pdf-parse
    - LLM- to create chucks from uploaded pdf and embedded into vectorstore Faiss.
    - Express- to create a express server running at PORT 5000
    - multer- helps in storing uploaded pdf files from the frontend to server DB.
    - pdf-parse- Extract the pdf in readable stream
    - fs- to read, write, and check files from the folder and the server.


## Development

1. Clone the repo

```
git clone [github https url]
```

2. Install packages

First run `npm install node -g` to install node globally (if you haven't already).

Then run- :

```
npm run setup
```

To install node_modules for client and server. After installation, you should now see a `node_modules` folder.

3. Set up your `.env` file inside the server folder.

```
OPENAI_API_KEY=

PORT=
DIR=

```

- Visit [openai](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) to retrieve API keys and insert into your `.env` file.
- Visit [Faiss](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/faiss) to use faiss vectorstors and set the DIR to `./vectorstore` in your `.env` file, so it will create a folder vectorstore to store relevent files there.

## Convert your PDF files to embeddings

**This repo can load multiple PDF files**

1. Inside `uploads` folder in server, it will add your pdf files.

2. if it will not create `vectorstore` folder create it inside server for troubleshooting and errors.

## Run the app

`npm run dev`- It uses concurrently library to run server and clinet together on different ports.


## Challenges
1. LLM Integeration quiet become a difficult task.

## Tutorial
- Visit [Project Working Video](https://www.loom.com/share/1dd5b719349640079c6ca2b18a042584)
