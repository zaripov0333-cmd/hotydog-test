const scriptURL = "https://script.google.com/macros/s/AKfycbzqFiYXPcrIzIGIQqF_0jaUbNHd9JyzYIAoND740mWtm6HmpRfmDZ-hs1aCZfSmAEJOhw/exec";

function sendData(){

  const district = document.getElementById("district").value;
  const transport = document.getElementById("transport").value;
  const salary = document.getElementById("salary").value;

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const phone = document.getElementById("phone").value;

  const msg = document.getElementById("msg");
  const extra = document.getElementById("extra");

  if(transport === "HA" && salary === "HA"){
      extra.classList.remove("hidden");

      if(name && age && phone){

        fetch(scriptURL, {
          method: "POST",
          body: JSON.stringify({
            district: district,
            transport: transport,
            salary: salary,
            name: name,
            age: age,
            phone: phone
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          msg.style.color = "green";
          msg.innerText = "Arizangiz qabul qilindi!";
        })
        .catch(err => {
          msg.style.color = "red";
          msg.innerText = "Xatolik yuz berdi!";
        });
      }

  } else {
      msg.style.color = "red";
      msg.innerText = "Faqat transporti bor va ish haqi to'g'ri keladiganlar qabul qilinadi!";
  }
}
