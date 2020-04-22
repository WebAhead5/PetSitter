
const dbConnection = require("../database/db_connection")

exports.readAll = function(cb) {

    dbConnection.query(`select * from sitters;`,(err,res)=> {
        if(cb) cb(err ,res?res.rows:undefined)
    }  )

}

exports.create =function({name,startingHour,endHour,cost},cb = undefined) {
    const sqlC = `insert into sitters(name,starting_hour,end_hour,cost) 
                  values ($1,$2,$3,$4);`;
    dbConnection.query(sqlC,[name,startingHour,endHour,cost], cb)
}

