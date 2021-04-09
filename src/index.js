const {listContainers,createContainer,createBlob} = require('./blob/blobclient');

async function main() {
     //createContainer();
     listContainers();
     createBlob();

}

main().catch((err) => {
    console.error("Error running sample:", err);
}); 