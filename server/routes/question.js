import { OpenAI } from "langchain/llms/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { loadQAStuffChain } from "langchain/chains";

import express from 'express';
const questionRouter = express.Router();

questionRouter.get('/ask', async (req, res) => {
        try {
      
            const llmA = new OpenAI({ modelName: "gpt-3.5-turbo"});
            const chainA = loadQAStuffChain(llmA);
            const directory = process.env.DIR //saved directory in .env file
            
            const loadedVectorStore = await FaissStore.load(
              directory,
              new OpenAIEmbeddings()
              ).catch(error => {
                console.error(error);
                res.status(500).json({ error: 'File not found' });
              });
              
              const question = decodeURIComponent(req.query.question);
              console.log(question); //question goes here. 
              const result = await loadedVectorStore.similaritySearch(question, 1);
              const resA = await chainA.call({
                input_documents: result,
                question,
              });
              // console.log({ resA });
              res.json({ result: resA }); // Send the response as JSON
        } 
          
          catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
        }
});

export default questionRouter;