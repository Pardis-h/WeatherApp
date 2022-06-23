// Toggle Search Box
const searchBtn1 = document.querySelector(".search-btn span");
const searchBtn2 = document.querySelector(".search-btn i");
const searchBox = document.querySelector(".search-box");
searchBtn1.addEventListener("click",searchShow);
searchBtn2.addEventListener("click",searchShow);
function searchShow(){
    searchBox.classList.contains("hidden") ? searchBox.classList.remove("hidden") : searchBox.classList.add("hidden");
}

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click",() => {
    searchBox.classList.add("hidden");
})

// get Weather with an API
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}&unit=metric
const form = document.querySelector(".search-form");
const input = document.querySelector(".search-form input");
const msg = document.querySelector(".msg");
const apiKey = "f244a8c180930c1583ec919bc958b7b6";

const todayTemp = document.querySelector(".degree");
const weatherImgSrc=document.getElementById("weather-img");
const weatherStatus = document.querySelector(".weather-status");
const locationName = document.querySelector(".location-name");
const todayDate=document.querySelector(".today-date");

const date=new Date();
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const mounts = ['January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];
todayDate.innerText = `${days[date.getDay()]} ${date.getDate()} ${mounts[date.getMonth()]}`;

form.addEventListener("submit" , e => {
    e.preventDefault();
    let inputVal = input.value;
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&limit=5&appid=${apiKey}`;
    fetch(geoUrl)
        .then(responseGeo => responseGeo.json())
        .then(geoData => {
            const {lat ,lon} = geoData[0];
            // const units = "";
            const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=metric`;
            fetch(url)
                .then(response => response.json())
                .then(data =>{
                    const {list,city:{name}}=data;
                    const {main,weather} = list[0];
                    const icon = weather[0]["icon"];

                    console.log(list);

                    todayTemp.innerText = Math.round(main.temp);
                    weatherImgSrc.src = `./assets/img/${icon}.png`;
                    weatherImgSrc.alt = weather[0].description;
                    weatherStatus.innerText =weather[0].description;
                    locationName.innerText=name;


                    searchBox.classList.add("hidden");
                });
        })
        .catch(() => {
            msg.innerText="Please search a valid city";
        })
    
})