"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grpc_js_1 = require("@grpc/grpc-js");
var proto_loader_1 = require("@grpc/proto-loader");
var PROTO_PATH = __dirname + '/../protos/helloworld.proto';
var packageDefinition = proto_loader_1.loadSync(PROTO_PATH, { keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
var helloProto = grpc_js_1.loadPackageDefinition(packageDefinition);
/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name });
}
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc_js_1.Server();
    var serviceConstructor = helloProto.Greeter;
    server.addService(serviceConstructor.service, { sayHello: sayHello });
    server.bindAsync('0.0.0.0:50051', grpc_js_1.ServerCredentials.createInsecure(), function () {
        console.log("started");
        server.start();
    });
}
main();
