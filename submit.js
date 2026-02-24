const scriptURL = "https://script.google.com/macros/s/AKfycbzqFiYXPcrIzIGIQqF_0jaUbNHd9JyzYIAoND740mWtm6HmpRfmDZ-hs1aCZfSmAEJOhw/exec";

function next(step){

  if(step === 1){
    if(!district.value) return alert("Manzilni tanlang");
  }

  if(step === 2){
    if(!transport.value) return alert("Tanlang");
  }

  if(step === 3){
    if(!salary.value) return alert("Tanlang");
  }

  document.getElementById("q"+step).classList.remove("active");
  document.getElementById("q"+(step+1)).classList.add("active");
}

function sendData(){

  if(transport.value !== "HA" || salary.value !== "HA"){
    msg.innerText = "Talabga mos emassiz.";
    msg.style.color="red";
    return;
  }

  fetch(scriptURL,{
    method:"POST",
    body:JSON.stringify({
      district:district.value,
      transport:transport.value,
      salary:salary.value,
      name:name.value,
      age:age.value,
      phone:phone.value
    }),
    headers:{ "Content-Type":"application/json" }
  })
  .then(()=> {
    msg.innerText="Ariza yuborildi!";
    msg.style.color="green";
  })
  .catch(()=> {
    msg.innerText="Xatolik yuz berdi";
    msg.style.color="red";
  });
}
