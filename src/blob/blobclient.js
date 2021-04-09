const {BlobServiceClient,StorageSharedKeyCredential} = require("@azure/storage-blob");

// Load the .env file if it exists
require("dotenv").config();

const account = process.env.ACCOUNT_NAME || "";
const accountKey = process.env.ACCOUNT_KEY || "";
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(    
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
);

const listContainers = async () => {
    let i = 1;
    console.log('Fetching list of containers');    
    for await (const container of blobServiceClient.listContainers()) {
      console.log(`Container ${i++}: ${container.name}`);
    }
}

const createContainer = async () => {
    const containerName = process.env.CONTAINER_NAME+new Date().getTime();
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);    
}

// Create/Upload a block blob
const createBlob = async () => {
    const blobContent = "This is a sample blob content";
    const blobName = "emublob"+new Date().getTime()+".txt";
    const containerName = process.env.TEXT_CONTAINER_NAME;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(blobContent, Buffer.byteLength(blobContent));
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}

module.exports = {createContainer,listContainers,createBlob};




