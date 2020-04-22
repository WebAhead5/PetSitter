function isTime(startHr){
    const reg = /^\d{2}:\d{2}$/;

    if (!reg.test(startHr))
        return false;


    let [hrs,min] = startHr.split(":")
    hrs = parseInt(hrs);
    min = parseInt(min);

    if(hrs<0 ||  hrs>= 24  || min<0 || min>59)
        return false;


    return true;

}

function isLettersAndSpacesOnly(str){

    let regex =/^[a-z ]+$/ig;

    return regex.test(str) && str.trim() !== ""

}

function isNumber(str) {
    return  str && str.toString().trim() !=="" && typeof Number(str) === "number"

}

module.exports = {isTime,isLettersAndSpacesOnly,isNumber}