//use javascript to fill hours here

const hoursFrom = document.getElementById('from');
setTime(hoursFrom)

const hoursTo = document.getElementById('to');
hoursFrom.onchange= (e)=>{

    let selectedDate = new Date(parseInt(hoursFrom.value));
    hoursTo.innerHTML="";
    setTime(hoursTo,selectedDate)
}
setTime(hoursTo,hoursFrom.value)

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







//passing values to sitters table
function formVerification(){
    const name = document.getElementById('name');
    const hoursFrom = document.getElementById('from');
    const hoursTo = document.getElementById('to');
    const cost = document.getElementById('cost');
    const phone = document.getElementById('phoneNumber');

    logic.addSitters(name.value, hoursFrom.value, hoursTo.value, cost.value, (e) => {
        toTheBox.boxMsg("Your info were added successfully", "#5a7233", "#3e4f24", "20px");
    });
}

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    formVerification();
})

