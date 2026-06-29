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

