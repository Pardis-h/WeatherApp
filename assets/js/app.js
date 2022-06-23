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
const weatherImgSrc=document.querySelector(".weather-img");

form.addEventListener("submit" , e => {
    e.preventDefault();
    let inputVal = input.value;
    // const url = "";
    // console.log(inputVal);
    const geo = `http://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&limit=5&appid=${apiKey}`;
    fetch(geo)
        .then(responseGeo => responseGeo.json())
        .then(geoData => {
            const {lat ,lon} = geoData[0];
            const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&unit=metric`;
            console.log(url);
            fetch(url)
                .then(response => response.json())
                .then(data =>{
                    const {list,city:{name}}=data;
                    const {main,weather} = list[0];
                    // const icon = `http://openweathermap.org/img/w/${weather[0]["icon"]}.png`;
                    // const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
                    const icon = weather[0]["id"];
                    // if(icon===801){
                    //     weatherImgSrc.classList ="weather-img fa-solid fa-cloud-rain text-8xl";
                    // }else if{

                    // }
                    switch (icon) {
                        case 801:
                            weatherImgSrc.classList ="weather-img fa-solid fa-cloud-rain text-8xl";
                            break;
                        case 800:
                            weatherImgSrc.classList ="weather-img fa-solid fa-cloud text-8xl";
                            break;
                        case 500:
                            weatherImgSrc.classList ="weather-img fa-solid fa-sun text-8xl";
                            break;
                        default:
                            break;
                    }
                    console.log(icon);
                    todayTemp.innerText = Math.round(main.temp);
                    // weatherImgSrc.classList = icon;
                    searchBox.classList.add("hidden");
                });
        })
    
})