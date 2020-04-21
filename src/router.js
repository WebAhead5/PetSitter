
const path = require("path");
const urlR = require("url")
const handlers = require("./handlers");


const router = (request, response) => {

    let endPoint = new urlR.URL(request.url ,"http://localhost:3000").pathname
    let ext = path.extname(endPoint)



    if(endPoint === "/")
        handlers.homeHandler(request,response);

    else if(ext)
        handlers.fileHandler(request,response);


    else if(request.method === "GET"){

        if (endPoint === '/reservation' )
            handlers.getreservationHandler(request, response)


    }

    else if(request.method === "POST"){

        if (endPoint === '/reservation' )
            handlers.askreservationHandler(request, response)


    }


    else handlers.notFoundHandler(request,response);


}

module.exports = router;