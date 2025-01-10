const week = document.querySelector(".week");
const dateFull = document.querySelector(".datefull");
const darkLightBtn = document.querySelector(".dark-light");
const darkLight = document.querySelector("#dark-light");
const btnAddT = document.querySelector("#btn-add-task");
const modalAdds = document.querySelector(".modal-add");
const modalAdd = document.querySelector(".modaladd");
const modalEdits = document.querySelector(".modal-edit");
const modalEdit = document.querySelector(".modaledit");
const goback = document.querySelector(".goback");
const gobackEdit = document.querySelector(".gobackedit");
const btnSubmit = document.querySelector("#btn-submit");
const btnSubmitEdit = document.querySelector("#btn-submit-edit");
const title = document.querySelector("#title");
const DateTask = document.querySelector("#Date-task");
const extreme = document.querySelector("#extreme");
const moderate = document.querySelector("#moderate");
const dashBordFullTask = document.querySelector("#dashbordfulltask");
const low = document.querySelector("#low");
const textDescription = document.querySelector("#textdescription");
const progressCircle = document.querySelectorAll(".progress-circle");
const progressText = document.querySelectorAll(".progress-text");
let statuss;
let notstarted;
let started;
let toggleBtn = 1;
let taskValArr = [];
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
});
// darkmodelocall

function lightdarkl() {
  let local = localStorage.getItem("lightmode");
  if (local == "light") {
    darkLight.setAttribute("href", "#light");
    toggleBtn = 1;
  } else if (local == "dark") {
    darkLight.setAttribute("href", "#dark");
    toggleBtn = 2;
  } else {
    darkLight.setAttribute("href", "#pc");
    toggleBtn = 3;
  }
}
// darkmodelocall
function lightdark() {
  if (toggleBtn == 1) {
    document.body.classList.remove("light", "dark", "auto");
    document.body.classList.add("light");
    modalAdd.classList.remove("light", "dark", "auto");
    modalAdd.classList.add("light");
    modalEdit.classList.remove("light", "dark", "auto");
    modalEdit.classList.add("light");
  } else if (toggleBtn == 2) {
    document.body.classList.remove("light", "dark", "auto");
    document.body.classList.add("dark");
    modalAdd.classList.remove("light", "dark", "auto");
    modalAdd.classList.add("dark");
    modalEdit.classList.remove("light", "dark", "auto");
    modalEdit.classList.add("dark");
  } else {
    darkLight.setAttribute("href", "#pc");
    document.body.classList.remove("light", "dark", "auto");
    document.body.classList.add("auto");
    modalAdd.classList.remove("light", "dark", "auto");
    modalAdd.classList.add("auto");
    modalEdit.classList.remove("light", "dark", "auto");
    modalEdit.classList.add("auto");
  }
}
window.addEventListener("load", () => {
  lightdarkl();
  lightdark();
  loadTasks();
  getcomplocal();
  notstartp();
  completp();
  startp();
});
btnAddT.addEventListener("click", () => {
  modalAdds.classList.remove("hidden-add-task");
  modalAdds.classList.add("active-add-task");
});
goback.addEventListener("click", () => {
  modalAdds.classList.add("hidden-add-task");
  modalAdds.classList.remove("active-add-task");
});

gobackEdit.addEventListener("click", () => {
  modalEdits.classList.add("hidden-edit-task");
  modalEdits.classList.remove("active-edit-task");
});

// addtaskfunc
function addtask() {
  let priority;
  extreme.checked
    ? (priority = extreme.value)
    : moderate.checked
    ? (priority = moderate.value)
    : low.checked
    ? (priority = low.value)
    : (priority = "no priority");
  let obj = {
    title: title.value,
    date: DateTask.value,
    desc: textDescription.value,
    prior: priority,
    completed: null,
    inprogress: null,
    notstarted: "notstart",
    id: Math.floor(Math.random() * 100000000) + DateTask.value,
  };
  taskValArr.push(obj);
}
function createtask() {
  let flaglength = taskValArr.length;
  if (flaglength > 0) {
    flaglength--;
    let div = document.createElement("div");
    div.id = taskValArr[flaglength].id;
    div.innerHTML = `                                    <div class="border rounded-2xl p-4 max-h-48 min-h-48">
                                        <div class="flex justify-end items-center">
                                            <ul class="relative">
                                                <li class="group">
                                                    <button><span><svg class="w-6 h-6"><use href="#more"></use></svg></span></button>
                                                    <ul class="absolute left-[-80px] bg-white w-[110px] group-hover:flex flex-col hidden *:p-3 text-black rounded-2xl *:hover:bg-gray-300 overflow-hidden *:duration-300 cursor-pointer">
                                                        <li onclick="starttask(this);">Start Task</li>
                                                        <li onclick="endtask(this);">End Task</li>
                                                        <li onclick="edittask(this);">Edit Task</li>
                                                        <li onclick="deltask(this);">Delete Task</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="overflow-hidden"><h2 class="font-extrabold text-lg">${taskValArr[flaglength].title}</h2></div>
                                        <div class="w-full h-[80px] overflow-hidden"><p>${taskValArr[flaglength].desc}</p></div>
                                        <div class="flex gap-5">
                                            <div><span class="text-[10px]">Priority : </span><span class="
                                                text-blue-700 text-[10px]">${taskValArr[flaglength].prior}</span></div>
                                            <div><span class="text-[10px]">Status : </span><span class="
                                                text-red-700 text-[10px]">${taskValArr[flaglength].prior}</span></div>
                                            <div><span class="text-[10px]">Create on : </span><span class="
                                                text-green-700 text-[10px]">${taskValArr[flaglength].date}</span></div>
                                        </div>
                                    </div>`;
    dashBordFullTask.appendChild(div);
    saveTasks();
    notstartp();
    startp();
    completp();
    getcomplocal()
  }
}
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  addtask();
  createtask();
  title.value = "";
  DateTask.value = "";
  textDescription.value = "";
  goback.click();
});
function deltask(e) {
  let select =
    e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  taskValArr.map((val, i) => {
    if (val.id == select.id) {
      taskValArr.splice(i, 1);
      e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
    }
  });
  saveTasks();
  getcomplocal()
  completp();
  notstartp();
  startp();
}
let indexflag;
function edittask(e) {
  modalEdits.classList.remove("hidden-edit-task");
  modalEdits.classList.add("active-edit-task");
  let select =
    e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  taskValArr.map((val, i) => {
    if (val.id == select.id) {
      indexflag = i;
      let xx = taskValArr[i];
      document.querySelector("#titleedit").value = xx.title;
      document.querySelector("#Date-task-edit").value = xx.date;
      taskValArr[i].prior == "moderate"
        ? document.querySelector("#moderateedit").click()
        : taskValArr[i].prior == "extreme"
        ? document.querySelector("#extremeedit").click()
        : taskValArr[i].prior == "low"
        ? document.querySelector("#lowedit").click()
        : console.log("first");
      document.querySelector("#textdescriptionedit").value = xx.desc;
    }
  });
}
btnSubmitEdit.addEventListener("click", (e) => {
  e.preventDefault();
  modalEdits.classList.add("hidden-edit-task");
  modalEdits.classList.remove("active-edit-task");
  taskValArr[indexflag].title = document.querySelector("#titleedit").value;
  taskValArr[indexflag].date = document.querySelector("#Date-task-edit").value;
  document.querySelector("#extremeedit").checked
    ? (taskValArr[indexflag].prior =
        document.querySelector("#extremeedit").value)
    : document.querySelector("#moderateedit").checked
    ? (taskValArr[indexflag].prior =
        document.querySelector("#moderateedit").value)
    : document.querySelector("#lowedit").checked
    ? (taskValArr[indexflag].prior = document.querySelector("#lowedit").value)
    : (taskValArr[indexflag].prior = "no priority");
  taskValArr[indexflag].desc = document.querySelector(
    "#textdescriptionedit"
  ).value;
  saveTasks();

  // loadTasks()
  window.location.reload();
});
function loadTasks() {
  tasks = JSON.parse(localStorage.getItem("taskValArr"));
  tasks.forEach((task) => {
    taskValArr.push(task);
    createtask();
  });
}
function saveTasks() {
  localStorage.setItem("taskValArr", JSON.stringify(taskValArr));
}
function starttask(e) {
  let select =
    e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  taskValArr.map((val, i) => {
    if (val.id == select.id) {
      taskValArr[i].completed = null;
      taskValArr[i].notstarted = null;
      taskValArr[i].inprogress = "start";
      saveTasks();
      getcomplocal()
      startp();
      completp();
      notstartp();
    }
  });
}
function endtask(e) {
  let select =
    e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  taskValArr.map((val, i) => {
    if (val.id == select.id) {
      taskValArr[i].inprogress = null;
      taskValArr[i].notstarted = null;
      taskValArr[i].completed = "complete";
      startp();
      completp();
      notstartp();
      getcomplocal()
    }
  });
}

function completp() {
  let x = taskValArr.length;
  let sum = 0;
  taskValArr.map((val, i) => {
    if (val.completed != null) {
      sum++;
    }
    statuss = (sum / x) * 100;
    localStorage.setItem("statucom", statuss);
  });
}
function startp() {
  let x = taskValArr.length;
  let sum = 0;
  taskValArr.map((val, i) => {
    if (val.inprogress != null) {
      sum++;
    }
    started = (sum / x) * 100;
    localStorage.setItem("start", started);
  });
}
function notstartp() {
  let x = taskValArr.length;
  let sum = 0;

  taskValArr.map((val, i) => {
    if (val.notstarted != null) {
      sum++;
    }
    notstarted = (sum / x) * 100;
    localStorage.setItem("notstart", notstarted);
    getcomplocal()
  });
}
function getcomplocal() {
  statuss = localStorage.getItem("statucom");
  notstarted = localStorage.getItem("notstart");
  started = localStorage.getItem("start");
  progressText[0].innerHTML = parseInt(statuss) + "%";
  progressCircle[0].style.cssText =
    "   background: conic-gradient(#00ff00 0% " +
    statuss +
    "%, #ddd " +
    statuss +
    "% 100%);";
  progressText[2].innerHTML = parseInt(notstarted) + "%";
  progressCircle[2].style.cssText =
    "   background: conic-gradient(red 0% " +
    notstarted +
    "%, #ddd " +
    notstarted +
    "% 100%);";
  progressText[1].innerHTML = parseInt(started) + "%";
  progressCircle[1].style.cssText =
    "   background: conic-gradient(blue 0% " +
    started +
    "%, #ddd " +
    started +
    "% 100%);";
}
