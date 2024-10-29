const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const packageDefinition = protoLoader.loadSync("./src/chat.proto");

const proto = grpc.loadPackageDefinition(packageDefinition).chat_package;

const client = new proto.ChatService('localhost:5000', grpc.credentials.createInsecure());

client.Chat({ chatId: 1, message: 'Hello from client' }, (err, response) => {
    if(err) {
        console.log(err)
        return;
    }

    console.log(response);
})