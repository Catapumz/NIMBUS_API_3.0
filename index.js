//Inicializar app
const { conexion } = require("./src/conexion"); //importamos función conexion del archivo conexion(previamente la exportamos en este archivo)
const { app } = require("./src/app");
const fs = require("fs");
const https = require("https");
//const privateKey = fs.readFileSync("./server.key", "utf8");
//const certificate = fs.readFileSync("./server.crt", "utf8");

//const credentials = { key: privateKey, cert: certificate };
//const httpsServer = https.createServer(credentials, app);

const PORT = 3000;

async function main() {
  console.log("App de node arrancada");

  //Conectar a la base de datos
  await conexion();

  app.listen(PORT, () =>
    console.log("Servidor HTTP corriendo en el puerto " + PORT)
  );

  //httpsServer.listen(8443, () =>
  // console.log("Servidor HTTPS corriendo en el puerto 8443 ")
  //);
}

main();
