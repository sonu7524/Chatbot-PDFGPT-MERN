# Use an official Node.js runtime as a base image
FROM node:slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Create the uploads and vectorstore folders in the container
RUN mkdir uploads
RUN mkdir vectorstore

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the uploads and vectorstore folders to the working directory
COPY uploads ./uploads
COPY vectorstore ./vectorstore

# Expose the port that the app will run on
EXPOSE 5000

# Command to run your application
CMD npm run dev
