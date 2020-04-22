/**
 * compares the body of the route with the content of a file
 * @param filePath
 * @returns {function(...[*]=)}
 */
function expect_compareWithFile(filePath){
    return (routeResponse) => {
        let fileData;
        try{
            fileData =  fs.readFileSync(path.resolve(__dirname,filePath) , 'utf8')
        } catch (e) {
            throw new Error("file path not found")
        }
        if(fileData !== routeResponse.text)
            throw new Error("path response does not equal file")

    };
}

/***
 * compares the body of the route with a filtered api call
 * @param apiPathRequest
 * @param {function(data:Object):Object} apiResultFilter - a callback function, receives the api result and returns a filtered value
 * @returns {function(...[*]=)}
 */
function expect_compareWithApiCall(apiPathRequest, apiResultFilter = (a) => a){
    return (routeResponse) => {
        let url = new urlR.URL(apiPathRequest)

        supertest(url.origin)
            .get(url.pathname + url.search)
            .expect(200)
            .end((err,res)=> {

                if (err)
                    throw new Error(`request from api error - ${err.message}`)

                let equals = deepEquals(routeResponse.body, apiResultFilter(res.body))
                    || deepEquals(routeResponse.text, apiResultFilter(res.text));

                if (!equals)
                    throw new Error("api response does not equal the route body")
            })



    };
}
