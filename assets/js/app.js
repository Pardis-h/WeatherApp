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
const ulList= document.querySelector(".day5forecat");
const apiKey = "f244a8c180930c1583ec919bc958b7b6";

const todayTemp = document.querySelector(".degree");
const weatherImgSrc = document.getElementById("weather-img");
const weatherStatus = document.querySelector(".weather-status");
const locationName = document.querySelector(".location-name");
const todayDate = document.querySelector(".today-date");
const humidity = document.querySelector(".humidity");
const humidityRange = document.querySelector(".humidity-range");
const weatherVisibility = document.querySelector(".weather-visibility");
const pressure = document.querySelector(".pressure");
const fellLikes = document.querySelector(".feel-likes");

const date = new Date();
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
            const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetch(url)
                .then(response => response.json())
                .then(data =>{
                    const {list,city:{name}}=data;
                    const {main,weather} = list[0];
                    const icon = weather[0]["icon"];
                    const timesToDisplay = [0, 8, 16];
                    console.log(list);

                    todayTemp.innerText = Math.round(main.temp);
                    weatherImgSrc.src = `./assets/img/${icon}.png`;
                    weatherImgSrc.alt = weather[0].description;
                    weatherStatus.innerText =weather[0].description;
                    locationName.innerText=name;
                    humidity.innerText = Math.round(main.humidity);
                    humidityRange.value = Math.round(main.humidity);
                    weatherVisibility.innerText = Math.round(list[0].visibility * 0.0006213712);
                    pressure.innerText = Math.round(main.pressure);
                    fellLikes.innerText = Math.round(main.feels_like);

                    let d;
                    let dayName;
                    list.forEach((item,index) => {
                        let items = list[index].dt;
                        d = new Date(items * 1000);
                        dayName = days[d.getDay()];
                        dayTime = `${d.getHours()}: ${d.getMinutes()}`;
                        let icons = list[index].weather[0]["icon"];
                        let descs = list[index].weather[0].description;
                        let tempMin =Math.round(list[index].main.temp_min);
                        let tempMax =Math.round(list[index].main.temp_max);
        
                        if(dayName === days[date.getDay()]){
                            const listItems = document.createElement("li");
                            const markup = `
                                <div class="bg-slate-800 basis-6/12 max-w-[46%] md:max-w-none md:basis-auto rounded px-7 py-4" >
                                    <p class="date text-slate-300 flex justify-between"><span>Today</span><span>${dayTime}</span></p>
                                    <div class=" text-center mt-4 mb-5"><img src="./assets/img/${icons}.png" alt="${descs}"></div>
                                    <div class="flex justify-between">
                                        <span class="highest ">${tempMax}<img src="./assets/img/celsius.png" class="w-4 inline-block" alt="Celsius" /></span>
                                        <span class="loweset text-slate-500">${tempMin}<img src="./assets/img/celsius.png" class="w-4 inline-block" alt="Celsius" /></span>
                                    </div>
                                </div>
                            `;
                            listItems.innerHTML = markup;
                            ulList.appendChild(listItems);
                        }else if (timesToDisplay.includes(index) && dayName === days[date.getDay() + 1]) {

                            const listItems = document.createElement("li");
                            const markup = `
                                <div class="bg-slate-800 basis-6/12 max-w-[46%] md:max-w-none md:basis-auto rounded px-7 py-4" >
                                    <p class="date text-slate-300">Tommorow</p>
                                    <div class=" text-center mt-4 mb-5"><img src="./assets/img/${icons}.png" alt="${descs}"></div>
                                    <div class="flex justify-between">
                                        <span class="highest ">${tempMax}<img src="./assets/img/celsius.png" class="w-4 inline-block" alt="Celsius" /></span>
                                        <span class="loweset text-slate-500">${tempMin}<img src="./assets/img/celsius.png" class="w-4 inline-block" alt="Celsius" /></span>
                                    </div>
                                </div>
                            `;
                            listItems.innerHTML = markup;
                            ulList.appendChild(listItems);
                        }else if (timesToDisplay.includes(index) && dayName !== days[date.getDay() + 1]) {

                            const listItems = document.createElement("li");
                            const markup = `
                                <div class="bg-slate-800 basis-6/12 max-w-[46%] md:max-w-none md:basis-auto rounded px-7 py-4" >
                                    <p class="date text-slate-300">${dayName} , ${d.getDate()} ${mounts[d.getMonth()]}</p>
                                    <div class=" text-center mt-4 mb-5"><img src="./assets/img/${icons}.png" alt="${descs}"></div>
                                    <div class="flex justify-between">
                                        <span class="highest ">${tempMax}<img src="./assets/img/celsius.png" class="w-4 inline-block" alt="Celsius" /></span>
                                        <span class="loweset text-slate-500">${tempMin}<img src="./assets/img/celsius.png" class="w-4 inline-block" alt="Celsius" /></span>
                                    </div>
                                </div>
                            `;
                            listItems.innerHTML = markup;
                            ulList.appendChild(listItems);
                        }
                    });
                    searchBox.classList.add("hidden");
                });
        })
        .catch(() => {
            msg.innerText="Please search a valid city";
        })
    ulList.innerHTML="";
    input.value="";
})