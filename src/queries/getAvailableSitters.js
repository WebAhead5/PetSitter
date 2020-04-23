

let sitterCRUD = require("./sittersCRUD");
let resCRUD = require("./reserveCRUD");
let validator = require("./validationUtil")

module.exports = function getAvailableSitters(startHr,endHr,cb) {

    if(!validator.isTime(startHr)||!validator.isTime(endHr))
        return cb(new Error("invalid argument(s) , does not represent a valid time."))

    if(startHr >= endHr)
        return cb(new Error("start time cannot be equal to or come after the end time"))

    let returnArr;
    sitterCRUD.readAll((err,res)=>
    {
        if(err)
            return cb(err)

        returnArr = Array.from(res).filter(sitter =>
            (sitter["starting_hour"] <= startHr +":00" && sitter["end_hour"] >= endHr +":00" ) );



        resCRUD.readAll((err,reservations)=>{

            if(err)
                return cb(err)

            reservations = Array.from(reservations)
                .filter(res=> returnArr.some(s=>s.id === res["sitter_id"]));

            reservations.forEach(res=>{
                if(!( res["starting_hour"] > endHr +":00" || res["end_hour"] <  startHr +":00"))
                    returnArr = returnArr.filter(t=>t.id !== res["sitter_id"])
            })

            cb(null,returnArr);


        });


    })

}
