

function getAllReservations(cb){
    fetch('/reservations')
        .then(resp => resp.json())
        .then(obj => cb(null, obj))
        .catch(err => cb(err));
    
}

function getReservations(count,offset,cb){

    fetch(`/reservations?count=${count}&offset=${offset}`)
        .then(resp => resp.json())
        .then(obj => cb(null, obj))
        .catch(err => cb(err));

}

function addReservation(name,phone,startingHour,endHour,sitterId,cb){


    let dataObj = {
        name,
        phone,
        startingHr:startingHour,
        endHr:endHour,
        sitterId
    };


    fetch(`/reservations`,{
        method:"post",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(dataObj)
    })
        .catch(err => cb(err));

}