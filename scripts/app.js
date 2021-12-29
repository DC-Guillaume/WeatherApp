const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUi = (data) => {
  // const cityDetails = data.cityDetails;
  // const weather = data.weather;

  // Destructuration des propriétés
  const { cityDetails, weather } = data;

  // Update les détails du template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
  `;

  // mise à jour des images night/day et des icons

  const iconSrc = `./assets/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  // opérateur ternaire

  let timeSrc = weather.IsDayTime ? "./assets/day.svg" : "./assets/night.svg";
  // if (weather.IsDayTime) {
  //   timeSrc = "./assets/day.svg";
  // } else {
  //   timeSrc = "./assets/night.svg";
  // }
  time.setAttribute("src", timeSrc);

  //Retirer le d-none class est présent
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    // cityDetails: cityDetails,
    // weather: weather,
    // équivalent:
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //acquisition de la valeur de la ville
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //   Mise à jour de l'ui avec la nouvelle ville
  updateCity(city)
    .then((data) => {
      updateUi(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
