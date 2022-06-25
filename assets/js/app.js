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

// Loader
let loader = document.querySelector(".loader");
loader.style.display= "none";

// SELECT ELEMENTS
const form = document.querySelector(".search-form");
const input = document.querySelector(".search-form input");
const msg = document.querySelector(".msg");
const ulList= document.querySelector(".day5forecat");
const historyUlList = document.querySelector(".search-history");

const apiKey = "f244a8c180930c1583ec919bc958b7b6";

const unitsF =document.querySelector(".fahrenhiet");
const unitsC =document.querySelector(".celsius");

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
// console.log(unitImageSrc);

// Get Today Date
const date = new Date();
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const mounts = ['January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];

todayDate.innerText = `${days[date.getDay()]} ${date.getDate()} ${mounts[date.getMonth()]}`;

// Toggle Fahrenheit and Celisius
unitsF.addEventListener("click",e =>{
    searchActiveUnitsF();
    if(unitsF.classList.contains("units-active")){
        loader.style.display= "flex";
        linkUrlF = historyUlList.lastElementChild.querySelector(".search-item").dataset.name;
        getWeather(linkUrlF);
        document.querySelector(".current-weather .units-img").src = "./assets/img/fahrenhiet.png";
        document.querySelector(".current-feel .units-img").src = "./assets/img/fahrenhiet.png";   
    }
});
function searchActiveUnitsF(){
    if(!(unitsF.classList.contains("units-active"))){
        unitsF.classList = "fahrenhiet bg-white text-slate-500 hover:cursor-pointer rounded-full py-2 px-3 units-active";
        unitsC.classList = "celsius bg-slate-600/[.6] hover:bg-white hover:text-slate-500 hover:cursor-pointer transition duration-300 ease-in-out rounded-full py-2 px-3 mx-3";
    }
}
unitsC.addEventListener("click",e=>{
    searchActiveUnitsC();
    if(unitsC.classList.contains("units-active")){
        loader.style.display= "flex";
        linkUrlC = historyUlList.lastElementChild.querySelector(".search-item").dataset.name;
        getWeather(linkUrlC);
        document.querySelector(".current-weather .units-img").src = "./assets/img/celsius.png";
        document.querySelector(".current-feel .units-img").src = "./assets/img/celsius.png";       }
});
function searchActiveUnitsC(){
    if(!(unitsC.classList.contains("units-active"))){
        unitsC.classList = "celsius bg-white text-slate-500 hover:cursor-pointer rounded-full py-2 px-3 units-active";
        unitsF.classList = "fahrenhiet bg-slate-600/[.6] hover:bg-white hover:text-slate-500 hover:cursor-pointer transition duration-300 ease-in-out rounded-full py-2 px-3 mx-3";
    }
}

// Get Weather from search
form.addEventListener("submit" , e =>{
    e.preventDefault();
    loader.style.display= "flex";

    getWeather(input.value);

    // search history List
    const newSearch = document.createElement("li");
    const newSearchMark = `
    <a href="#" data-name="${input.value}" class="search-item flex justify-between border-solid border border-transparent hover:border-slate-600 transition duration-300 ease-in-out rounded px-4 py-2 mb-2">
        <span class="leading-loose">${input.value}</span>
        <i class="fa-solid fa-angle-right text-slate-500 leading-loose"></i>
    </a>
    `;
    newSearch.innerHTML = newSearchMark;
    historyUlList.appendChild(newSearch);
    input.value="";

});

//Get search from Search History
const searchLink = document.querySelectorAll(".search-item");
searchLink.forEach(item =>{
    item.addEventListener("click",e=>{
        e.preventDefault();
        loader.style.display= "flex";
        let linkUrl = item.dataset.name;
        console.log(linkUrl);
        getWeather(linkUrl);
    });
});

// Get weather API
function getWeather(city){
    
    const inputVal = city;
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&limit=5&appid=${apiKey}`;
    fetch(geoUrl)
        .then(responseGeo => responseGeo.json())
        .then(geoData => {
            const {lat ,lon} = geoData[0];
            let units = "metric";
            unitImageSrc = "./assets/img/celsius.png";
            if (unitsF.classList.contains("units-active")) {
                units = "imperial";
                unitImageSrc = "./assets/img/fahrenhiet.png";
            }
            const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
            fetch(url)
                .then(response => response.json())
                .then(data =>{
                    loader.style.display= "none";
                    const {list,city:{name}} =  data;
                    const {main,weather} = list[0];
                    const icon = weather[0]["icon"];
                    const timesToDisplay = [0 , 8, 16 , 24 , 32 , 40 ];
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
                            listItems.classList="bg-slate-800 basis-6/12 w-44 max-w-[46%] md:max-w-none md:basis-auto rounded px-7 py-4";
                            const markup = `
                                    <p class="date text-slate-300 flex justify-between"><span>Today</span><span> ${dayTime}</span></p>
                                    <div class=" text-center mt-4 mb-5"><img class="ml-auto mr-auto" src="./assets/img/${icons}.png" alt="${descs}"></div>
                                    <div class="flex justify-between">
                                        <span class="highest ">${tempMax}<img src="${unitImageSrc}" class="units-img w-4 inline-block" alt="Units" /></span>
                                        <span class="loweset text-slate-500">${tempMin}<img src="${unitImageSrc}" class=" units-img w-4 inline-block" alt="Units" /></span>
                                    </div>
                            `;
                            listItems.innerHTML = markup;
                            ulList.appendChild(listItems);
                        }else if (timesToDisplay.includes(index) && dayName === days[date.getDay() + 1]) {

                            const listItems = document.createElement("li");
                            listItems.classList="bg-slate-800 basis-6/12 w-44 max-w-[46%] md:max-w-none md:basis-auto rounded px-7 py-4";
                            const markup = `
                                    <p class="date text-slate-300">Tommorow</p>
                                    <div class=" text-center mt-4 mb-5"><img class="ml-auto mr-auto" src="./assets/img/${icons}.png" alt="${descs}"></div>
                                    <div class="flex justify-between">
                                        <span class="highest ">${tempMax}<img src="${unitImageSrc}" class="units-img w-4 inline-block" alt="Units" /></span>
                                        <span class="loweset text-slate-500">${tempMin}<img src="${unitImageSrc}" class="units-img w-4 inline-block" alt="Units" /></span>
                                    </div>
                            `;
                            listItems.innerHTML = markup;
                            ulList.appendChild(listItems);
                        }else if (timesToDisplay.includes(index) && dayName !== days[date.getDay() + 1]) {

                            const listItems = document.createElement("li");
                            listItems.classList="bg-slate-800 basis-6/12 w-44 max-w-[46%] md:max-w-none md:basis-auto rounded px-7 py-4";
                            const markup = `
                                    <p class="date text-slate-300">${dayName} , ${d.getDate()} ${mounts[d.getMonth()]}</p>
                                    <div class=" text-center mt-4 mb-5"><img class="ml-auto mr-auto" src="./assets/img/${icons}.png" alt="${descs}"></div>
                                    <div class="flex justify-between">
                                        <span class="highest ">${tempMax}<img src="${unitImageSrc}" class="units-img w-4 inline-block" alt="Units" /></span>
                                        <span class="loweset text-slate-500">${tempMin}<img src="${unitImageSrc}" class=" units-img w-4 inline-block" alt="Units" /></span>
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
}
loader.style.display= "flex";
getWeather("Rasht");


// Slider
let sliderContainer = document.querySelector('.slider-container');
let innerSlider = document.querySelector('.day5forecat');

let pressed = false;
let startX;
let x;
sliderContainer.addEventListener("mouseenter", () => {
    sliderContainer.style.cursor = "grab";
});
sliderContainer.addEventListener("mousedown", (e) => {
    pressed = true;
    startX = e.pageX - innerSlider.offsetLeft;
    sliderContainer.style.cursor = "grabbing";
});
sliderContainer.addEventListener("mouseup", () => {
    sliderContainer.style.cursor = "grab";
    pressed = false;
});
sliderContainer.addEventListener("mousemove", (e) => {
    if (!pressed) return;
    e.preventDefault();
    x = e.pageX ;
    innerSlider.style.left = `${x - startX}px`;
    console.log(x);
    console.log(x - startX);
    checkBoundary();
});
const checkBoundary = () => {
    let outer = sliderContainer.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    if (parseInt(innerSlider.style.left) > 0) {
        innerSlider.style.left = "0px";
    }

    if (inner.right < outer.right) {
        innerSlider.style.left = `-${inner.width - outer.width}px`;
    }
};
