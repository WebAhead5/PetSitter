
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const urlR = require("url")
const { getAll,
    reserveSitter,
    CountReservations,
    deleteReservations }
    = require('../src/queries/reserveCRUD')

const sittersCRUD = require("./queries/sittersCRUD")

exports.homeHandler = function (request, response) {


    let filePath =path.join("./","public","index.html")
    loadFile(filePath,response);


}
exports.fileHandler = function (request, response) {

    let endPoint = new urlR.URL(request.url, "http://localhost:3000").pathname
    let ext = path.extname(endPoint)

    let filePath = path.join("./", "public", endPoint);
    // filePath = path.resolve(baseName,filePath, "./");

    loadFile(filePath,response);

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


//the GET method
// Gets the reservations data from the database
exports.getreservationHandler = (request, response) => {
    getAll((err, res) => {
        if (err) {
            exports.serverErrorHandler(response)
        } else {
            response.writeHead(200, { 'Content-Type': 'Application/JSON' });
            response.end(JSON.stringify(res.rows));
        }
    });
}



//the POST method
//Adds received information to the database

exports.askreservationHandler = (request, response) => {
    let data = '';

    response.on('data', chunk => {
        data += chunk;
    })

    //typeof jsonbj[name] !== string
    //trim

    response.on('end', () => {
        let jsonObj = JSON.from(data);
        reserveSitter(jsonObj, (err, result) => {
            if (err) {
                return exports.badRequestHandler(request, response)
            } else if (typeof jsonObj.name !== 'string') {
                return exports.serverErrorHandler(request, response)
            } else if (typeof jsonObj.phone !== 'number') {
                return exports.serverErrorHandler(request, response)
            } else {

                response.writeHead(200, { "content-type": "application/json" })
                response.end(JSON.stringify(result.rows));

            }
        })
    })
}

exports.getSittersHandler = function(request, response) {

    //get params from url
    let {searchParams} = new urlR.URL( request.url,"http://localhost/")

    //set the read function
    let readFunc = sittersCRUD.readAll;


    readFunc((err,result)=>{

        if(err)
            return exports.serverErrorHandler(request,response)


        response.writeHead(200, { "content-type": "application/json" })
        response.end(JSON.stringify(result));
    });

}

exports.addSitterHandler = function(request, response) {


    let stream = "";

    //get the data from the stream
    response.on("data", chunk => {
        stream += chunk;
    })

    //when all the data is received
    response.on("end",  () => {

        //convert the data to a json file
        let jsonObj = JSON.from(stream);

        //add the received data to the database
        sittersCRUD.create(jsonObj, (err, result) => {

            //if for some reason adding the data failed
            if (err)
                return exports.badRequestHandler(request, response)


            //todo - redirect user
            response.writeHead(200, {"content-type": "application/json"})

            response.end(JSON.stringify(result));

        });

    })


}


function loadFile(path ,response){



    fs.readFile(path, (err, res) => {
        if (err) {
            exports.serverErrorHandler(response);
        }
        else {
            response.writeHead(200, {'content-type':mime.lookup(path)})
            response.end(res);
        }


    })

}




function getReadSittersFunc(searchParams) {
    let readFunc = sittersCRUD.readAll;
    if(searchParams !== 0){

        readFunc =  sittersCRUD.read;

        //check of the count is valid
        let count = searchParams.get("count") ;
        if(count)
            if(typeof count === "number")
                readFunc = readFunc.bind(count);
            else
                return badRequestHandler(request,response);



        //check of the count is valid
        let offset = searchParams.get("offset") ;
        if(offset)
            if(typeof offset === "number")
                readFunc = readFunc.bind(offset);
            else
                return badRequestHandler(request,response);


    }

}



