const BOT_TOKEN = "8723692215:AAECHULu5H76njzlVBisVbkCGWi9Tjfrnvc";
const CHAT_ID = "-5125266750";

function sendData(){

  if(transport.value !== "HA" || salary.value !== "HA"){
    msg.innerText = "Talabga mos emassiz.";
    msg.style.color="red";
    return;
  }

  if(!name.value || !age.value || !phone.value){
    alert("Ma'lumotlarni to‘ldiring");
    return;
  }

  const text = `
🚴 YANGI KURIER ARIZA

📍 Manzil: ${district.value}
🚗 Transport: ${transport.value}
💰 Maosh: ${salary.value}

👤 Ism: ${name.value}
🎂 Yosh: ${age.value}
📞 Telefon: ${phone.value}
`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text
    })
  })
  .then(res => res.json())
  .then(() => {
    msg.innerText="Ariza yuborildi!";
    msg.style.color="green";
  })
  .catch(() => {
    msg.innerText="Xatolik yuz berdi";
    msg.style.color="red";
  });
}
