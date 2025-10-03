const elCerdTemp = document.getElementById("cardTemp");
const elParent = document.getElementById("parent");
const elLoader = document.getElementById("loader");
const elError = document.getElementById("text-error");
const elLoader1 = document.getElementById("loader-1");
const elContainer1 = document.getElementById("container-1");
const elToastContainer = document.getElementById("toastContainer");
const elTemplateToast = document.getElementById("toastTemplate");



function init() {
    elLoader1.style.display = "block";
  elLoader.classList.remove("hidden");
  fetch("https://json-api.uz/api/project/fn43/cars")
  .then((res) => res.json())
  .then((res) => {
    ui(res.data);
  })
  .catch(() => {
    elError.classList.remove("hidden");
  })
  .finally(() => {
    elLoader1.style.display = "none";
    elLoader.classList.add("hidden");
    
  });
}





 


  function deleteCar(id) {
    fetch(`https://json-api.uz/api/project/fn43/cars/${id}`, {
    method: "DELETE",
  }
    )
  .then((res) => {
    return res.text();
    
  })
  .then((res) => {
   
    toast(res);
    elParent.innerHTML="";
    init();
    
  })
  .catch(() => {
    elError.classList.remove("hidden");
  })
  .finally(() => {
    elLoader1.style.display = "none";
    elLoader.classList.add("hidden");
    
  });
  }

  init();
// crud

elParent.addEventListener("click",(e) => {
  if(e.target.classList.contains("js-delete")){
    if(confirm("Rostdan ham o'chirmoqchimisiz")){
      e.target.innerText="Loading...";
      deleteCar(e.target.id);
    }
 
}
});


function ui(cars) {
  elParent.innerHTML = "";





  cars.forEach((car) => {
    
    const elCard = elCerdTemp.content.cloneNode(true);
    elCard.querySelector(".card-title").textContent = car.name;
    elCard.querySelector(".card").classList.add("card-stil");
    elCard.querySelector("p").innerHTML = `
      <b>Trim:</b> ${car.trim} <br>
      <b>Generation:</b> ${car.generation} <br>
      <b>Year:</b> ${car.year} <br>      <b>Color:</b> ${car.color} <br>
      <b>Category:</b> ${car.category} <br>
      <b>Door Count:</b> ${car.doorCount}, <b>Seat Count:</b> ${car.seatCount} <br>
      <b>Max Speed:</b> ${car.maxSpeed} <br>
      <b>Acceleration:</b> ${car.acceleration} <br>
      <b>Engine:</b> ${car.engine}, ${car.horsepower} HP <br>
      <b>Fuel Type:</b> ${car.fuelType} <br>
      <b>Fuel Consumption:</b> City – ${car.fuelConsumption.city}, Highway – ${car.fuelConsumption.highway}, Combined – ${car.fuelConsumption.combined} <br>
      <b>Country:</b> ${car.country} <br>
      <b>Description:</b> ${car.description}
    `
    const elDeleteButton = elCard.querySelector(".js-delete");
    elDeleteButton.id=car.id;
    
    ;

    elParent.appendChild(elCard);
  });
}


function toast(text){
  const clone = elTemplateToast.cloneNode(true).content;
  const elCloseButton = clone.querySelector("button");
  const elMessage=clone.querySelector("p");
  elMessage.innerText=text;

  elCloseButton.addEventListener("click", (e)=>{
    e.target.parentElement.remove();
  });

  elToastContainer.appendChild(clone);
}