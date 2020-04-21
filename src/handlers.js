const { readFile } = require('fs');
const path = require('path');
const qs = require('querystring');

const serverError = (err, response) => {
    response.writeHead(500, 'Content-Type:text/html');
    response.end('<h1>Sorry, there was a problem loading the homepage</h1>');
    console.log(err);
  };

const homeHandler = (request, response) => {
    const filepath = path.join(__dirname, '..', 'public', 'index.html');
    readFile(filepath, (err, file)=> {
        if(err) return serverError(err, response);
        response.writeHead(200, {'Content-type': 'text/html'});
        response.end(file);
    });
}

const errorHandler = response => {
    response.writeHead(404, { 'content-type': 'text/html' });
    response.end('<h1>404 Page Requested Cannot be Found</h1>');
  };

const getreservationHandler = (request, response) => {

}

const askreservationHandler = (request, response) => {

}

module.exports = {
    homeHandler,
    getreservationHandler,
    askreservationHandler,
    errorHandler
};
