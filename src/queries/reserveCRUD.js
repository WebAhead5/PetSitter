const dbConnection = require('../database/db_connection');


// Reads all data from reservations table on the database 
const getAll = cb => {
    dbConnection.query('SELECT * FROM reservations', (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rows);
        }
    })
}

const read = (count, offset = 0, cb) => {
    dbConnection.query('SELECT * FROM reservations offset $1 LIMIT $2',[offset, count], (err, res) => {
        if(err){
            cb(err);
        } else {
            cb(null, res.rows);
        }
    })
}

// Count 

const CountReservations = cb => {
    dbConnection.query('SELECT COUNT(is_reserved) FROM reservations WHERE is_reserved = true', (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rows[0].count)
        }
    })
}

//Insert new data to reservations table on the database

const reserveSitter = ({ name, phone,startingHr, endHr, sitterId } , cb) => {
   
    // if(!isInputValid(obj))
    //     return cb(new Error("..."))

    // let { name, phone, fromHour, toHour, sitterId } = obj;
    
    dbConnection.query('INSERT INTO reservations (reservant_full_name, reservant_phone, starting_hour, end_hour, sitter_id) VALUES ($1, $2, $3, $4, $5)',
        [name, phone, startingHr, endHr, sitterId],
        (err, res) => {
            if (err) {
                cb(err)
            } else {
                cb(null, res)
            }
        }
    )
}


// Delete

const deleteReservations = (index,cb) => {
    dbConnection.query('DELETE FROM reservations WHERE id = &1',[index], (err, res) => {
        if (err) {
            cb(err)
        } else {
            cb(null, res)
        }
    })
}


// isInputValid

function isInputValid(obj = {}) {
    // if (typeof obj.name !== 'string') {
    //     return false;
    // } else if (typeof obj.phone !== 'string') {
    //     return false;
    // } else {
    //     return true;
    // }

    return true;

}

//added to the handlers.askreserve...




module.exports = {
    readAll: getAll,
    create: reserveSitter,
    count: CountReservations,
    delete: deleteReservations,
    isInputValid,
    read
}