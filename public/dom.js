//use javascript to fill hours here
const name = document.getElementById('name');
const hoursFrom = document.getElementById('from');
const hoursTo = document.getElementById('to');
const cost = document.getElementById('cost');
const phone = document.getElementById('phoneNumber');
const form = document.getElementById('form');


setTime(hoursFrom)
hoursFrom.onchange= (e)=>{

    let selectedDate = new Date(parseInt(hoursFrom.value));
    hoursTo.innerHTML="";
    setTime(hoursTo,selectedDate)
}
setTime(hoursTo,hoursFrom.value)





form.addEventListener('submit', (e) => {
    e.preventDefault();
    formVerification();
})
name.oninput=()=>{
    console.log("test")
    name.value = validateInput(name.value);
}

function formVerification(){

        logic.addSitters(name.value, convertTimeToHours(hoursFrom.value), convertTimeToHours(hoursTo.value), cost.value, (e) => {
        toTheBox.boxMsg("Your info were added successfully", "#5a7233", "#3e4f24", "20px");
    });
}




function setTime(container,startTime = new Date(Date.now()) ){

    if(typeof startTime === "string")
        startTime = new Date(parseInt(startTime))

    let currentHour= startTime.getHours();

    if(startTime.getMinutes() >= 30)
    {
        startTime.setMinutes(0)
        startTime.setHours(currentHour + 1)
    }
    else{
        startTime.setMinutes(30)
    }

    while(startTime.getHours() !== 0){

        let option = document.createElement("option");
        option.textContent =
            `${startTime.getHours()}:${startTime.getMinutes()}${startTime.getMinutes() === 0 ? "0":""}`
        option.value =  startTime.getTime().toString();
        container.appendChild(option)
        startTime.setMinutes(startTime.getMinutes() + 30)
    }


}
function validateInput(str) {

    let regex = /[a-z ]/ig;

    if (!str.match(regex))
        str = "";
    else str = str.match(regex).join("")

    return str.trimStart() ;

}
function convertTimeToHours(time){
    let startTime = new Date(parseInt(time))
    return `${startTime.getHours()}:${startTime.getMinutes()}${startTime.getMinutes() === 0 ? "0":""}`
}

