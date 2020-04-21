const dbConnection = require('../database/db_connection');

// const getSitters = cb => {
//     dbConnection.query('SELECT * FROM sitters'), (err, res) => {
//         if (err) {
//             return cb(err);
//         } else {
//             cb(null, res.rows);
//         }
//     }
// }

const getAll = cb => {
    dbConnection.query('SELECT * FROM reservation', (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res)
        }
    })
}

const reserveSitter = (name, phone, fromHour, toHour, sitterId, cb) => {
    dbConnection.query('INSERT INTO reservation (reservant_full_name, reservant_phone, starting_hour, end_hour, sitter_id, is_reserved) VALUES ($1, $2, $3, $4, $5)', [name, phone, fromHour, toHour, sitterId],
        (err, res) => {
            if (err) {
                cb(err)
            } else {
                cb(null, res)
            }
        }
    )
}



module.exports = {
    getAll,
    reserveSitter
}