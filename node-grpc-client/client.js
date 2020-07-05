"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grpc_js_1 = require("@grpc/grpc-js");
var proto_loader_1 = require("@grpc/proto-loader");
var PROTO_PATH = __dirname + '/../protos/helloworld.proto';
var packageDefinition = proto_loader_1.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
var helloProto = grpc_js_1.loadPackageDefinition(packageDefinition);
function main() {
    var serviceConstructor = helloProto.Greeter;
    var client = new serviceConstructor('localhost:50051', grpc_js_1.credentials.createInsecure());
    var user;
    if (process.argv.length >= 3) {
        user = process.argv[2];
    }
    else {
        user = 'world';
    }
    client.sayHello({ name: user }, function (err, response) {
        console.log('Greeting:', response.message);
    });
}
main();
