function makeDraggable(element) {
  let initialX = 0, initialY = 0;
  let currentX = 0, currentY = 0;

  const handle = document.getElementById(element.id + "header")
    ?? element;
  handle.onmousedown = startDragging;

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup   = stopDragging;
    document.onmousemove = onDrag;
  }

  function onDrag(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top  = (element.offsetTop  - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup   = null;
    document.onmousemove = null;
  }
}

function updateTime() {
    document.querySelector("#timeCurrent").innerHTML = new Date().toLocaleString();
}

setInterval(updateTime, 1000);





let biggestIndex = 1;
const topBar = document.querySelector("#top");

function bringToFront(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex  = biggestIndex + 1;
}

let selectedIcon = undefined;

function selectIcon(element)   { element.classList.add("selected"); selectedIcon = element; }
function deselectIcon(element) { element.classList.remove("selected"); selectedIcon = undefined; }

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    openWindow(element);
  } else {
    selectIcon(element);
  }
}

function openWindow(element) {
  element.style.display = "block";
  bringToFront(element);
}

function closeWindow(element) {
  element.style.display = "none";
}

function handleWindowTap(element) {
  bringToFront(element);
  if (selectedIcon) deselectIcon(selectedIcon);
}

function initializeWindow(id) {
  const win    = document.getElementById(id);
  const opener = document.getElementById(id + "open");
  const closer = document.getElementById(id + "close");

  makeDraggable(win);
  win.addEventListener("mousedown", () => handleWindowTap(win));
  closer.addEventListener("click", () => closeWindow(win));
  opener.addEventListener("click", () => {
    openWindow(win);
    handleIconTap(opener);
  });
}

["welcome", "potato", "blueberry"].forEach(initializeWindow);


var content = [
  {
    title: "Welcome :D",
    date: '6/28/26',
    content: `
        <div contenteditable="True">
          <span contenteditable="true">Welcome to <strong>potato notes :)</strong></span>

          <br>
          <br>

          Feel free to edit this text as you would like :D
        </div>`
  }
]

function setNotesContent(index) {

  var notesContent = document.querySelector("#notesContent")

  notesContent.innerHTML = `<p contenteditable="true" id="title">${content[index].title}</p>
  <p id="date">${content[index].date}</p>
  <div contenteditable="true" id="content">${content[index].content}</div>`
  notesContent.dataset.index = String(index);
}



function loadSideBar() {
  var notesList = document.querySelector("#noteslist");
  notesList.innerHTML = "";
	var sidebar = document.querySelector("#sidebar");
  for (let i = 0; i < content.length; i++) {
    let button = document.createElement("button");
    button.innerHTML = content[i].title;
    button.classList.add("button")
    button.onclick = function () {
      setNotesContent(i);
    };

    notesList.appendChild(button);

  }
  
}

function addNotes() {
  var notesContent = document.querySelector("#notesContent");
  const date = new Date();
  notesContent.innerHTML = `
    <p contenteditable="true" id="title">Untitled document</p>
    <p contenteditable="true" id="date">${date.toLocaleDateString()}</p>
    <div contenteditable="true" id="content">

      Feel free to edit this text as you would like :D
    </div>`;
  const title = document.getElementById("title");
  const datee = document.getElementById("date");
  const conteent = document.getElementById("content");
  content.push({
      title: title.innerHTML,
      date: datee.innerHTML,
      content: conteent.innerHTML
  })

  loadSideBar();
  setNotesContent(content.length - 1);
}

function saveContent() {
  const title = document.getElementById("title");
  const datee = document.getElementById("date");
  const conteent = document.getElementById("content");
  var notesContent = document.getElementById("notesContent")
  let indexx = parseInt(notesContent.dataset.index, 10);
  content[indexx] = {
    title: title.innerHTML,
    date: datee.innerHTML,
    content: conteent.innerHTML,
  }
  loadSideBar();
  setNotesContent(indexx);

}

const addnootes = document.getElementById("addnootes")
const savenotes = document.getElementById("savenotes")
addnootes.addEventListener("click", () => addNotes());
savenotes.addEventListener("click", () => saveContent());
loadSideBar();
setNotesContent(0);
