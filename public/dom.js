//use javascript to fill hours here


//passing values to sitters table
function formVerification(){
    const name = document.getElementById('name');
    const hoursFrom = document.getElementById('from');
    const hoursTo = document.getElementById('to');
    const cost = document.getElementById('cost');
    const phone = document.getElementById('phoneNumber');
     
    logic.addSitters(name.value, hoursFrom.value, hoursTo.value, phone.value, (e) => {
        toTheBox.boxMsg("Your info were added successfully", "#5a7233", "#3e4f24", "20px");
    });
}

 const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
    e.preventDefault();
    formVerification();
})

 const search = document.getElementById('searchForm');
    search.addEventListener('submit', (e) => {
    e.preventDefault();
        alert("search...");
    
    //formVerification();
})
