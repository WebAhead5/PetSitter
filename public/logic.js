function getAllReservations(cb){
    fetch('/reservations')
        .then(resp => resp.json())
        .then(obj => cb(null, obj))
        .catch(err => cb(err));
    
}