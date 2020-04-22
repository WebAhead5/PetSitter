

let sitterCRUD = require("./sittersCRUD");
let resCRUD = require("./reserveCRUD");


module.exports = function getAvailableSitters(startHr,endHr,cb) {

    let returnArr;
    sitterCRUD.readAll((err,res)=>
    {
        if(err)
            return cb(err)

        returnArr = Array.from(res).filter(obj =>
            obj["starting_hour"] <= startHr
            && obj["end_hour"] >= endHr );



        resCRUD.readAll((err,reservations)=>{

            if(err)
                return cb(err)

            reservations = Array.from(reservations)
                .filter(res=> returnArr.some(s=>s.id === res["sitter_id"]));

            reservations.forEach(res=>{
                if(!( res["starting_hour"] >= endHr || res["end_hour"] < startHr))
                    returnArr = returnArr.filter(t=>t.id !== res["sitter_id"])
            })

            cb(null,returnArr);


        });


    })

}