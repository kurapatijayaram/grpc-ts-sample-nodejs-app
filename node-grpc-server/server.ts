import { Server, ServerCredentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { ServiceClientConstructor, PackageDefinition } from "@grpc/grpc-js/build/src/make-client";

var PROTO_PATH = __dirname + '/../protos/helloworld.proto';

let packageDefinition: PackageDefinition = loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

var helloProto = loadPackageDefinition(packageDefinition);

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call: any, callback: any) {
  callback(null, {message: 'Hello ' + call.request.name});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main(): void {
  let server: Server = new Server();
  let serviceConstructor = helloProto.Greeter as ServiceClientConstructor;
  server.addService(serviceConstructor.service, {sayHello: sayHello});
  server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
      console.log("started");
      server.start();
  });
  
}

main();
