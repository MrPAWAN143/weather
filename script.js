const apikey = "33c19001a4b04691fae8a57b2a94b4d0";
const api = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

let msg = ""

let weatherdecription = document.querySelector('.a1')
let searchbtn = document.querySelector('.searchbtn')

let country = document.querySelector('.contery')
let windspd = document.querySelector('.windspd')
let cloudyimg = document.querySelector('.cloudyimg')
let subrise = document.querySelector('.subrise span')
let sunsettime = document.querySelector('.sunsettime span')





const getweather = async (city) => {

    try {

        msg = "Loading..."
        document.querySelector('.tempshow').innerText = msg

        document.querySelector('.city').innerText = msg

        const promise = await fetch(api + city + `&appid=${apikey}`)
        const data = await promise.json()
        setData(data)


    } catch (error) {

        // console.log("Error fetching weather data:", error);

    }

}
getweather("delhi")

const setData = (data) => {
    if (data.cod !== "404") {
        document.querySelector('.main').style.display = "block"
        document.querySelectorAll('.msg')[0].innerHTML = ""
        document.querySelectorAll('.msg')[1].innerHTML = ""


        cloudyimg.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        document.querySelector('.tempshow').innerText = Math.floor(data.main.temp)
        document.querySelector('.city').innerText = `${data.name} ${data.sys.country}`
        document.querySelector('.humi p').innerText = data.main.humidity + "%"
        weatherdecription.innerText = data.weather[0].description
        windspd.innerText = data.wind.speed + "km/h"
        let sunrise = data.sys.sunrise;
        sunrise = new Date(sunrise * 1000); // Convert to milliseconds

        let hours = sunrise.getHours(); // Get hours in 24-hour format
        let minutes = sunrise.getMinutes().toString().padStart(2, '0'); // Pad minutes
        let seconds = sunrise.getSeconds().toString().padStart(2, '0'); // Pad seconds

        let ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
        hours = hours % 12 || 12; // Convert to 12-hour format (0 becomes 12)

        subrise.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;

        // Repeat the same logic for sunset
        let sunset = data.sys.sunset;
        sunset = new Date(sunset * 1000); // Convert to milliseconds

        let shours = sunset.getHours(); // Get hours in 24-hour format
        let sminutes = sunset.getMinutes().toString().padStart(2, '0'); // Pad minutes
        let sseconds = sunset.getSeconds().toString().padStart(2, '0'); // Pad seconds

        let sampm = shours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
        shours = shours % 12 || 12; // Convert to 12-hour format (0 becomes 12)

        sunsettime.innerText = `${shours}:${sminutes}:${sseconds} ${sampm}`;


    } else {

        document.querySelector('.main').style.display = "none"

        document.querySelectorAll('.msg')[0].innerHTML = data.cod
        document.querySelectorAll('.msg')[1].innerHTML = data.message


    }
}

const searchweather = (e) => {
    e.preventDefault()

    let searchval = document.querySelector('#searchinput')
    searchval = searchval.value

    if (searchval === "") {
     
        return
    } else {
        getweather(searchval)
    }



}


searchbtn.addEventListener('click', searchweather)


let searchval = document.querySelector('#searchinput')

searchval.addEventListener('input', () => {
    if (searchval.value === "") {
        getweather("delhi")
    }

})



