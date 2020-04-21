const {
    homeHandler,
    getreservationHandler,
    askreservationHandler
} = require('./handlers');


const router = (request, response) => {
    const { url } = request;

    if(url === '/') {
        homeHandler(request, response)
    } else if (url === '/reservation' && request.method === 'GET') {
        getreservationHandler(request, response)
    } else if (url === '/reservation' && request.method === 'POST') {
        askreservationHandler(request, response)
    }
}