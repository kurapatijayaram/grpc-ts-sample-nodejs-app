import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { ServiceClientConstructor } from "@grpc/grpc-js/build/src/make-client";

var PROTO_PATH = __dirname + '/../protos/helloworld.proto';

var packageDefinition = loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var helloProto = loadPackageDefinition(packageDefinition);

function main() {
    let serviceConstructor = helloProto.Greeter as ServiceClientConstructor;
    var client = new serviceConstructor('localhost:50051', credentials.createInsecure());
    var user;
    if (process.argv.length >= 3) {
        user = process.argv[2];
    } else {
        user = 'world';
    }
    client.sayHello({ name: user }, (err: any, response: any) => {
        console.log('Greeting:', response.message);
    });
}

main();