
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const urlR = require("url")
const reserveCRUD = require('../src/queries/reserveCRUD');
const sittersCRUD = require("./queries/sittersCRUD");
const getAvailableSitters = require("./queries/getAvailableSitters");


//------------------------------------------------------------------------------
exports.homeHandler = function (request, response) {


    let filePath = path.join("./", "public", "index.html")
    loadFile(filePath, response);


}
exports.fileHandler = function (request, response) {

    let endPoint = new urlR.URL(request.url, "http://localhost:3000").pathname
    let ext = path.extname(endPoint)

    let filePath = path.join("./", "public", endPoint);
    // filePath = path.resolve(baseName,filePath, "./");

    loadFile(filePath, response);

}


exports.notFoundHandler = function (response) {
    response.writeHead(404, { 'content-type': 'text/html' })
    response.end('<h1>not found</h1>');
}
exports.badRequestHandler = function (response) {
    response.writeHead(400, { 'content-type': 'text/html' })
    response.end('<h1>bad request</h1>');
}
exports.serverErrorHandler = function (response) {
    response.writeHead(502, { 'content-type': 'text/html' })
    response.end('<h1>server error</h1>');
}

//------------------------------------------------------------------------------

//the GET method
// Gets the reservations data from the database
exports.getreservationHandler = (request, response) => {
    getReadFromDbHandler(request, response,reserveCRUD) 

}

//the POST method
//Adds received information to the database
exports.askreservationHandler = (request, response) => {

    let data = '';

    request.on('data', chunk => {
        data += chunk;
    })


    request.on('end', () => {
        let jsonObj = JSON.parse(data);

        //validate input
        if (!reserveCRUD.isInputValid(jsonObj)) {
            return exports.badRequestHandler(response)
        }

        reserveCRUD.create(jsonObj, (err, result) => {
            if (err)
                return exports.badRequestHandler(response)

            //todo redirection
                response.writeHead(308, { Location: '/index.html' })
                response.end();

        })
    })

}

//------------------------------------------------------------------------------

exports.getSittersHandler = function (request, response) {

     getReadFromDbHandler(request, response,sittersCRUD) 


}
exports.addSitterHandler = function (request, response) {


    let stream = "";

    //get the data from the stream
    request.on("data", chunk => {
        stream += chunk;
    })

    //when all the data is received

    request.on("end", () => {


        //convert the data to a json file
        let jsonObj = JSON.parse(stream);

        //add the received data to the database
        sittersCRUD.create(jsonObj, (err, result) => {

            //if for some reason adding the data failed
            if (err)
                return exports.badRequestHandler(response)


            //todo - redirect user
            response.writeHead(200)
            response.end();

        });

    })


}

//------------------------------------------------------------------------------

exports.getAvailableSitter = function (request,response) {
    //get params from url
    let { searchParams } = new urlR.URL(request.url, "http://localhost/")

    let paramOptions = ["start","end"]
    //if the url contains only the params "start" and "end"
    for (const key of searchParams.keys())
        if(!paramOptions.includes(key))
            return exports.badRequestHandler(response);

    //if the params are not duplicated (only show up once)
    if(searchParams.getAll("start").length !== 1 ||
        searchParams.getAll("end").length !== 1)
        return exports.badRequestHandler(response);


    getAvailableSitters(searchParams.get("start"),searchParams.get("end"),(err,res)=>{
        if(err)
            return exports.serverErrorHandler(response);

        response.writeHead(200,{"content-type":"application.json"});
        response.end(JSON.stringify(res))
    })
}

//------------------------------------------------------------------------------

function loadFile(path, response) {



    fs.readFile(path, (err, res) => {
        if (err) {
            exports.serverErrorHandler(response);
        }
        else {
            response.writeHead(200, { 'content-type': mime.lookup(path) })
            response.end(res);
        }


    })

}


function getReadFromDbHandler(request, response,crud) {

    //get params from url
    let { searchParams } = new urlR.URL(request.url, "http://localhost/")

    //set the read function
    let readFunc = getReadSittersFunc(searchParams, crud);

    if (!readFunc)
        return exports.badRequestHandler(response)


    readFunc((err, result) => {

        if (err)
            return exports.serverErrorHandler(request, response);

        response.writeHead(200, { "content-type": "application/json" })
        response.end(JSON.stringify(result));
    });

}
function getReadSittersFunc(searchParams, crud) {

    //count the number of params in the url
    let paramCount = 0;
    for (const pair of searchParams)
        paramCount++


    if (paramCount === 0)
        return crud.readAll;


    if (paramCount === 1) {
        let count = parseInt(searchParams.get("count"));
        if (!count || typeof count !== "number")
            return null;

        return (cb) => crud.read(count, 0, cb)
    }


    else if (paramCount === 2) {


        let count = parseInt(searchParams.get("count"));
        let offset = parseInt(searchParams.get("offset"));

        if (!count || !offset)
            return null;


        if (typeof count !== "number" && typeof offset !== "number")
            return null;


        return (cb) => crud.read(count, offset, cb)

    }

    return null;
}


//------------------------------------------------------------------------------

