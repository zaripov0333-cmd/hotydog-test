const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzqFiYXPcrIzIGIQqF_0jaUbNHd9JyzYIAoND740mWtm6HmpRfmDZ-hs1aCZfSmAEJOhw/exec";

document.getElementById("submitBtn").addEventListener("click", async function () {

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const errorBox = document.getElementById("errorBox");
  const successBox = document.getElementById("successBox");

  errorBox.style.display = "none";
  successBox.style.display = "none";

  if (!firstName || !lastName || !phone) {
    errorBox.innerText = "Barcha maydonlarni to‘ldiring!";
    errorBox.style.display = "block";
    return;
  }

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        date: new Date().toLocaleString()
      })
    });

    successBox.style.display = "block";

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";

  } catch (error) {
    errorBox.innerText = "Xatolik yuz berdi!";
    errorBox.style.display = "block";
  }

});
