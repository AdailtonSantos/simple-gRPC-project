const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const packageDefinition = protoLoader.loadSync("./src/chat.proto");

const proto = grpc.loadPackageDefinition(packageDefinition).chat_package;

const handlers = {
    Chat: (call, callback) => {
        const { chatId, message } = call.request;
        const responseFromServer = { message: {
            id: chatId,
            message: message,
            createdAt: new Date().toISOString()
        }, 
        createdAt: new Date().toISOString() }
        console.log(responseFromServer)
        callback(null, responseFromServer )
    },
}

const server = new grpc.Server();
server.addService(proto.ChatService.service, handlers);


const address = '0.0.0.0:5000'
server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if(err) {
        console.log(err);
        return;
    }

    console.log('Servidor rodando em', address); 
});