const form = document.querySelector(".inputContainer");
const content = document.querySelector(".content");
const noData = document.querySelector(".noData");

const api = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = `2a8281574a4c9d124b4d892e016d5e60`;

async function getWeather(city) {
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  try {
    const wheather = await fetch(
      `${api}?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!wheather.ok) {
      return alert("City not found");
    }
    noData.style.display = "none";
    content.style.display = "flex";
    const data = await wheather.json();
    createNdde(
      data.main.temp,
      data.wind.speed,
      data.main.humidity,
      data.weather[0].icon,
      data.name
    );
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const city = formData.get("city");
  form.reset();
  getWeather(city);
});
function createNdde(temp, wind, humidity, icon, city) {
  const temprature = content.getElementsByTagName("h3")[0];
  const humidityDiv = content.getElementsByTagName("h4")[0];
  const windDiv = content.getElementsByTagName("h4")[1];
  const imgDiv = content.getElementsByTagName("img")[0];
  const cityDiv = content.getElementsByTagName("p")[0];
  cityDiv.innerText = city;
  temprature.innerHTML = `${Math.round(temp)}<span>&#176;</span>C`;
  humidityDiv.innerText = `${humidity}%`;
  windDiv.innerText = `${wind} km/h`;
  if (icon.includes("n")) {
    imgDiv.style.filter = "invert(1)";
  } else {
    imgDiv.style.filter = "invert(0)";
  }
  const imgurl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  imgDiv.src = imgurl;
}
