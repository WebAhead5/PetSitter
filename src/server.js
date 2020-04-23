const http = require('http');
const router = require('./router.js');

const server = http.createServer(router);
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server is running on:  ${port}`);
});
