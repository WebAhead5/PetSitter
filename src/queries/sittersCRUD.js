
const dbConnection = require("../database/db_connection")

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
        (err,res)=> { if(cb) cb(err ,res?res.rows:undefined)})
}


exports.delete = function(index,cb){

    let sqlC = `delete from sitters where id = $1;`
    dbConnection.query(sqlC, [index],
        (err)=> cb(err))

}


exports.create =function({name,startingHour,endHour,cost},cb) {
    const sqlC = `insert into sitters(name,starting_hour,end_hour,cost) 
                  values ($1,$2,$3,$4);`;
    dbConnection.query(sqlC,[name,startingHour,endHour,cost], cb)
}

