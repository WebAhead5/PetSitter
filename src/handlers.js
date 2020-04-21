
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const urlR = require("url")

exports.homeHandler = function(request,response){

    let filePath =path.join("./","public","index.html")
    loadFile(filePath,".html",response);

}
exports.fileHandler = function(request,response){

    let endPoint = new urlR.URL(request.url ,"http://localhost:3000").pathname
    let ext = path.extname(endPoint)

    let filePath = path.join("./","public",endPoint);
    // filePath = path.resolve(baseName,filePath, "./");

    loadFile(filePath, ext,response);

}


exports.notFoundHandler = function(response){
    response.writeHead(404, {'content-type': 'text/html'})
    response.end('<h1>not found</h1>');
}
exports.badRequestHandler = function(response){
    response.writeHead(400, {'content-type': 'text/html'})
    response.end('<h1>bad request</h1>');
}
exports.serverErrorHandler = function(response){
    response.writeHead(502, {'content-type': 'text/html'})
    response.end('<h1>server error</h1>');
}






function loadFile(path, fileExt ,response){


    fs.readFile(path, (err,res)=>{
        if(err) {
            exports.serverErrorHandler(response);
        }
        else {
            response.writeHead(200, {'content-type':mime.lookup(fileExt)})
            response.end(res);
        }


    })

}





