
function sendMail(){

 var tempParams = {
      from_name:document.getElementById("fromName").value,
      to_name:document.getElementById("toName").value,
      message:document.getElementById("msg").value,
      to_email:document.getElementById("toemail").value,
      agency:document.getElementById("agency").value,
      localite:document.getElementById("fromLocalite").value,
      portable:document.getElementById("fromTelephone").value,
      date:document.getElementById("date").value,
      heure:document.getElementById("heure").value,
      destination:document.getElementById("destination").value,
      depart:document.getElementById("depart").value,
      tarif:document.getElementById("tarif").value,
      name:document.getElementById("name").value,
      prenom:document.getElementById("lastname").value,
      dateV:document.getElementById("dateV").value,
      identifiant:document.getElementById("identifiant").value

  };

  emailjs.send('service_z3dyg2v','template_j9xv24n',tempParams)
  .then(function(res){
      console.log("success", res.status);
  })
  
}  



function sendMailSuggestions(){

    var tempParams = {
         from_name:document.getElementById("fromName").value,
         to_name:document.getElementById("toName").value,
         message:document.getElementById("msg").value,
         
     };
   
     emailjs.send('service_7k4h2mq','template_gbdpezc',tempParams)
     .then(function(res){
         console.log("success", res.status);
     })
     
   }  

  function sendMailDelete(agence){
  
    var tempParams = {
        
         emailD:mail, 
         numeroagence:agence

         
     };
   
    emailjs.send('service_z3dyg2v','template_fix8vjv',tempParams)
     .then(function(res){
         console.log("success", res.status);
     })
     
   }  


  

 