const toTheBox = {
   
    boxMsg: function(msg, bg, fntClr, fntSize){
            var box = document.createElement("div");
            box.setAttribute("class", "boxMsg");
            box.innerHTML=`${msg} <br>`;
            box.style.background= `${bg}`;
            box.style.color= `${fntClr}`;
            box.style.border = `1px solid ${fntClr}`;
            box.style.height="150px";
            box.style.width="250px"
            box.style.zIndex="1";
            box.style.position="fixed";
            box.style.textAlign="center";
            box.style.paddingTop = "5%";
            box.style.boxShadow=`6px 6px ${fntClr}`;
            box.style.borderRadius="10px"
            box.style.fontSize= `${fntSize}`;
            box.style.left="20%";
            box.style.top="20%";
            
            var btnOK = document.createElement("input");
            btnOK.type="button";
            btnOK.style.margin="20px";
            btnOK.value="OK";
            btnOK.style.width="90px";
            btnOK.style.color= `${fntClr}`;
            
            box.appendChild(btnOK);
            document.body.appendChild(box);
        
            //btn.addEventListener("click", myScript);
           btnOK.onclick = function(){
               document.body.removeChild(box);
           };
    },
    
    boxAsk: function(){
         alert("Are you sure you want to delete this?");
    }
    
}