// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
/* Global Variables */
const loader = document.querySelector(".loader-wrapper");
const catchError = (error) => console.error("There are Error =>", error);
const dateOut = document.getElementById("date");
const temperature = document.getElementById("temp");
// for temperature degree special mark
const deg = "&degC";
const contentOut = document.getElementById("content");
const feelings = document.getElementById("feelings");
const zipIn = document.getElementById("zip");
const generateBtn = document.getElementById("generate");
//server link i not use this variable but i prefer to placed her to know it
const projectLink = "http://127.0.0.1:8080";
// Api Key  that i  get it after regstration at OpenWeathermap
// i used this"units=metric" to get the temperature by C not by Firnhait
const openWeatherKey = "&appid=8680f3b95d143539720332fe4ca41c9b&units=metric";
const openWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";

//load Function
const reload = () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 5000);
};

//Generete BTN EventListener
generateBtn.addEventListener("click", press);
//function press is for
function press(action) {
  // debugger
  const zipInp = zipIn.value;
  const feelingsInp = feelings.value;
  weatherApi(openWeatherUrl, zipInp, openWeatherKey).then(function (myData) {
    console.log(myData);
    dataToServer("/add", {
      newDate,
      temp: myData.list[0].main.temp,
      feelingsInp,
    });
    DataToUser();
  });
}
//function to get API Data From openWeathermap
const weatherApi = async (openWeatherUrl, zip, apiKey) => {
  const responseData = await fetch(openWeatherUrl + zip + apiKey);
  try {
    const jsonRes = await responseData.json();
    return jsonRes;
  } catch (error) {
    catchError();
  }
};

async function dataToServer(url = "", intery = {}) {
  //im was used debugger to track app movment and find some errors
  // debugger
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(intery),
  });
  try {
    //if there are error or connection  lost between user And server  will alert them
    if (!response.ok) {
      alert("not sucess");
      return;
    }
    const savedData = await response.json();
    console.log(savedData);
    return savedData;
  } catch (error) {
    catchError();
  }
}
///function for data that came from server to placed on user interface area
async function DataToUser() {
  // debugger
  //post  data to a url "/all"
  let response = await fetch("/all");
  try {
    const pushData = await response.json();
    const apiDate = `Today is : ${pushData.newDate}`;
    const apiTemperature = `Temperature : ${pushData.temp}${deg}`;
    const apiFeeling = `And i'm Feeling : ${pushData.feelingsInp}`;
    dateOut.innerHTML = apiDate;
    temperature.innerHTML = apiTemperature;
    contentOut.innerHTML = apiFeeling;
  } catch (error) {
    catchError();
  }
}

reload();
