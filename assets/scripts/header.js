const week = document.querySelector(".week");
const dateFull = document.querySelector(".datefull");
const darkLightBtn = document.querySelector(".dark-light");
const darkLight = document.querySelector("#dark-light");
let toggleBtn = 1;
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const a = new Date();
let zz = a.getDay();
week.innerHTML = daysOfWeek[zz];
let aa = a.getDate() <= 9 ? "0" + a.getDate() : a.getDate();
let cc = a.getMonth() + 1;
let bb = cc <= 9 ? "0" + cc : cc();
dateFull.innerHTML = `${aa}/${bb}/${a.getFullYear()}`;
// darkmodeclick
darkLightBtn.addEventListener("click", () => {
  toggleBtn >= 1 && toggleBtn < 3 ? toggleBtn++ : (toggleBtn = 1);
  toggleBtn == 1
    ? darkLight.setAttribute("href", "#light")
    : toggleBtn == 2
    ? darkLight.setAttribute("href", "#dark")
    : darkLight.setAttribute("href", "#pc");
  toggleBtn == 1
    ? localStorage.setItem("lightmode", "light")
    : toggleBtn == 2
    ? localStorage.setItem("lightmode", "dark")
    : localStorage.setItem("lightmode", "auto");
  lightdark();

  console.log(localStorage.getItem("lightmode"));
});
// darkmodelocall

function lightdarkl() {
    let local = localStorage.getItem("lightmode");
    if (local == "light") {
      darkLight.setAttribute("href", "#light");
      toggleBtn = 1
    } else if (local == "dark") {
        darkLight.setAttribute("href", "#dark");
        toggleBtn = 2
    } else {
      darkLight.setAttribute("href", "#pc")
      toggleBtn = 3
    }
  }
// darkmodelocall
function lightdark() {
  if (toggleBtn == 1) {
    document.body.classList.remove('light','dark','auto')
    document.body.classList.add('light')
  } else if (toggleBtn == 2) {
    document.body.classList.remove('light','dark','auto')
    document.body.classList.add('dark')  
} else {
    darkLight.setAttribute("href", "#pc")
    document.body.classList.remove('light','dark','auto')
    document.body.classList.add('auto')
  }
}
window.addEventListener("load", () => {
  lightdarkl();
  lightdark();
});
