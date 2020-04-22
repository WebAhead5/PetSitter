
const logic =
    {

    getAllReservations:
        function (cb) {
            fetch('/reservations')
                .then(resp => resp.json())
                .then(obj => cb(null, obj))
                .catch(err => cb(err));

        },

    getReservations:
        function (count, offset, cb) {

            fetch(`/reservations?count=${count}&offset=${offset}`)
                .then(resp => resp.json())
                .then(obj => cb(null, obj))
                .catch(err => cb(err));

        },

    addReservation:
        function (name, phone, startingHour, endHour, sitterId, cb) {
            let dataObj = {
                name,
                phone,
                startingHr: startingHour,
                endHr: endHour,
                sitterId
            };


            fetch(`/reservations`, {
                method: "post",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(dataObj)
            })
                .catch(err => cb(err));

        },

    getAllSitters:
        function (cb) {
            fetch('/sitters')
                .then(res => res.json())
                .then(obj => cb(null, obj))
                .catch(err => cb(err));
        },

    getSitters:
        function (count, offset, cb) {
            fetch(`/sitters?count=${count}&offset=${offset}`)
                .then(res => res.json())
                .then(obj => cb(null, obj))
                .catch(err => cb(err));
        },

    addSitters:
        function (name, startingHour, endHour, cost, cb) {

            let sitterObj = {
                name,
                startingHr: startingHour,
                endHr: endHour,
                cost
            }

            fetch('/sitters', {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(sitterObj)
            })
                .then (()=>cb(null))
                .catch(err => cb(err));
        },

    getAvailableSitter:
        function (startingHour, endHour,cb) {
            const reg = /^\d{2,}:\d{2}$/;

            if (!reg.test(startingHour) || !reg.test(endHour))
                return cb(new Error("invalid argument - value must be in 'HH:MM' format"));


            fetch(`/availableSitters?start=${encodeURI(startingHour)}&end=${encodeURI(endHour)}`)
                .then(res => res.json())
                .then(obj => cb(null, obj))
                .catch(err => cb(err));
        },

}

// export default logic;



