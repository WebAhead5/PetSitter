

function getAllReservations(cb) {
    fetch('/reservations')
        .then(resp => resp.json())
        .then(obj => cb(null, obj))
        .catch(err => cb(err));

}

function getReservations(count, offset, cb) {

    fetch(`/reservations?count=${count}&offset=${offset}`)
        .then(resp => resp.json())
        .then(obj => cb(null, obj))
        .catch(err => cb(err));

}

function addReservation(name, phone, startingHour, endHour, sitterId, cb) {


    let dataObj = {
        name,
        phone,
        startingHr: startingHour,
        endHr: endHour,
        sitterId
    };


    fetch(`/reservations`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(dataObj)
    })
        .catch(err => cb(err));

}


//sitters fetching
function getAllSitters(cb) {
    fetch('/sitters')
        .then(res => res.json())
        .then(obj => cb(null, obj))
        .catch(err => cb(err));
}

function getSitters(count, offset, cb) {
    fetch(`/sitters?count=${count}&offset=${offset}`)
        .then(res => res.json())
        .then(obj => cb(null, obj))
        .catch(err => cb(err));
}


function addSitters(name, startingHour, endHour, cost) {

    let sitterObj = {
        name,
        startingHr: startingHour,
        endHr: endHour,
        cost
    }

    fetch('/sitters', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(sitterObj)
    })
        .catch(err => cb(err));
}

export default logic;