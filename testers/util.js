


const fs = require("fs")
const path = require("path")



/**
 * compares the body of the route with the content of a file
 * @param filePath
 * @returns {function(...[*]=)}
 */
module.exports= function expect_compareWithFile(filePath){
    return (routeResponse) => {
        let fileData;
        try{
            fileData =  fs.readFileSync(path.resolve("./",filePath) , 'utf8')
        } catch (e) {
            throw new Error("file path not found")
        }
        if(fileData !== routeResponse.text)
            throw new Error("path response does not equal file")

    };
}
