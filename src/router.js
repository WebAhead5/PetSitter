
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

        if (endPoint === "/reservations" )
            handlers.getreservationHandler(request, response)
        else if(endPoint === "/sitters")
            handlers.getSittersHandler(request,response);
        else if(endPoint === "/availableSitters")
            handlers.getAvailableSitter(request,response)

    }

    else if(request.method === "POST"){

        if (endPoint === '/reservations' )
            handlers.askreservationHandler(request, response)
        else if(endPoint === "/sitters")
            handlers.addSitterHandler(request,response);

    }


    else handlers.notFoundHandler(request,response);


}

module.exports = router;