const dbConnection = require('../database/db_connection');


// Reads all data from reservations table on the database 
const getAll = cb => {
    dbConnection.query('SELECT * FROM reservations', (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rows)
        }
    })
}

// Count 

const CountReservations = cb => {
    dbConnection.query('SELECT COUNT(is_reserved) FROM reservations WHERE is_reserved = true', (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rowCount)
        }
    })
}

//Insert new data to reservations table on the database

const reserveSitter = ({ name, phone, fromHour, toHour, sitterId }, cb) => {
    dbConnection.query('INSERT INTO reservations (reservant_full_name, reservant_phone, starting_hour, end_hour, sitter_id, is_reserved) VALUES ($1, $2, $3, $4, $5)', [name, phone, fromHour, toHour, sitterId],
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

const deleteReservations = (cb) => {
    dbConnection.query('DELETE FROM reservations WHERE id = index', (err, res) => {
        if (err) {
            cb(err)
        } else {
            cb(null, res)
        }
    })
}


// isInputValid

function isInputValid(obj = {}) {
    if (typeof obj.name !== 'string') {
        return false;
    } else if (typeof jsonObj.phone !== 'number') {
        return false;
    } else {
        return true;
    }
}

//added to the handlers.askreserve...




module.exports = {
    readAll: getAll,
    create: reserveSitter,
    count: CountReservations,
    delete: deleteReservations,
    isInputValid
}