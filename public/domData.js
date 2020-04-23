const search = document.getElementById('searchForm');
const name = document.getElementById('name');
const hoursFrom = document.getElementById('from');
const hoursTo = document.getElementById('to');
const phone = document.getElementById('phoneNumber');
let recSpan; //results' rows

search.addEventListener('submit', (e) => {
    e.preventDefault();
    search.style.paddingTop = "20px";
    displayData();
    document.getElementById('note').style.visibility = "visible";
    document.getElementById('note').innerHTML = "Click on Sitter to make a reservation";
})
name.oninput=()=>{
    console.log("test")
    name.value = validateInput(name.value);
}

function displayData(){
    search.innerHTML='';
    let title=document.createElement('span');
    title.innerHTML = "Name | Start Time | End Time | Cost per hour";
    title.style.marginBottom = "20px";
    search.appendChild(title);
    logic.getAllSitters((e,res) => { 
    res.forEach(obj => {
            console.log(res);
            //add search conditions
            recSpan = document.createElement('nav');
            recSpan.setAttribute('id', `${obj.id}`);
            recSpan.innerHTML=`${obj.name} | ${obj.starting_hour} | ${obj.end_hour} | ${obj.cost}` + "$";
            search.appendChild(recSpan);
        
        
    });
        
    search.addEventListener('click', (e) => {
        e.preventDefault();
        var clickedID = e.target.id;
        let info = "";
         res.forEach(obj => {
            if(obj.id == clickedID){
               logic.addReservation(name.value, phone.value,convertTimeToHours (hoursFrom.value),convertTimeToHours (hoursTo.value), obj.id, (e) => {
                if(e) {
                    toTheBox.boxMsg("Error...", "#5a7233", "#3e4f24", "20px");   
                } else { 
                   info = `Your reservation for ${obj.name} was made successfully`;
                   toTheBox.boxMsg(info, "#5a7233", "#3e4f24", "20px");
                }
               });
            }
         });
        
    });   
});

}



setTime(hoursFrom)
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

function convertTimeToHours(time){
    let startTime = new Date(parseInt(time))
    return `${startTime.getHours()}:${startTime.getMinutes()}${startTime.getMinutes() === 0 ? "0":""}`
}


function validateInput(str) {

    let regex = /[a-z ]/ig;

    if (!str.match(regex))
        str = "";
    else str = str.match(regex).join("")

    return str.trimStart() ;

}
