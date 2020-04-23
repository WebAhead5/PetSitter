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
                alert(clickedID);
               logic.addReservation(name.value, phone.value, hoursFrom.value, hoursTo.value, obj.id, (e) => {
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


