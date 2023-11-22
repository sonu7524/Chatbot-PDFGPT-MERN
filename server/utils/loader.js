import { OpenAI } from "langchain/llms/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as dotenv from 'dotenv';
dotenv.config();

export const ingestMultipleDocs = async (pdfFilePaths) => {
  // Loop through the array of file paths
  for (const pdfFilePath of pdfFilePaths) {
    const loader = new PDFLoader(pdfFilePath);
    const docs = await loader.load();
    console.log(`Loaded PDF: ${pdfFilePath}`);

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docOutput = await textSplitter.splitDocuments(docs);
    let vectorStore = await FaissStore.fromDocuments(
      docOutput,
      new OpenAIEmbeddings(),
    );
    console.log('Saving vector store...');

    const vectorStoreDirectory = "./vectorstore"; // Directory to save vector store
    await vectorStore.save(vectorStoreDirectory);
    console.log('Saved vector store!');
  }
};




