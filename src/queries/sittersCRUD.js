
const dbConnection = require("../database/db_connection")
let validator = require("./validationUtil")


exports.readAll = function(cb) {

    dbConnection.query(`select * from sitters;`,(err,res)=> {
        if(cb) cb(err ,res?res.rows:undefined)
    }  )

}


exports.read = function(count, offset = 0,cb){

    let sqlC = `select * from sitters offset $1 limit $2;`
    dbConnection.query(sqlC,[offset,count],
        (err,res)=> { if(cb) cb(err ,res?res.rows:undefined)})
}


exports.count = function(cb){

    let sqlC = `select count(*) from sitters;`
    dbConnection.query(sqlC,
        (err,res)=> { if(cb) cb(err ,res?res.rows[0].count:undefined)})
}


exports.delete = function(index,cb){

    let sqlC = `delete from sitters where id = $1;`
    dbConnection.query(sqlC, [index],
        (err)=> cb(err))

}


exports.create =function({name,startingHr,endHr,cost},cb) {

    //validate inputs
    if(!validator.isTime(startingHr)||!validator.isTime(endHr))
        return cb(new Error("invalid argument(s), invalid hour argument(s)."))

    if(startingHr >= endHr)
        return cb(new Error("invalid argument(s), start time cannot be equal to or come after the end time"))

    if(!validator.isLettersAndSpacesOnly(name))
        return cb(new Error("invalid argument(s), illegal chars entered in name"))

    if(!validator.isNumber(cost))
        return cb(new Error("invalid argument(s), cost is not a number"))


    //run sql commands
    const sqlC = `insert into sitters(name,starting_hour,end_hour,cost) 
                  values ($1,$2,$3,$4);`;
    dbConnection.query(sqlC,[name,startingHr,endHr,cost], cb)
}

