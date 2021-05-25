let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let drag = false;
let imageObj = null;
let rects = [];
let rectCount = 0;
let scaleFactor = 0;
let labelHolder = null;
let imagename = "";
let imageidData = "";
let label = "";

(function () {
  imageObj = new Image();
  imagename = document.getElementById("serverimageid").getAttribute("name");
  if (imagename !== "none") {
    imageObj.src = "http://localhost:30001/" + imagename;
    let dotPosition = imagename.indexOf(".");
    imageidData = imagename.substring(0, dotPosition);
    document.getElementById("imageidData").value = imageidData;
    document.getElementById("classifyForm").action = "/image/update";
    document.getElementById("classifyForm").enctype =
      "application/x-www-form-urlencoded";
  }
  canvas.width = 0;
  canvas.height = 0;
  imageObj.onload = function () {
    canvas.height = 550;
    scaleFactor = canvas.height / imageObj.height;
    canvas.width = imageObj.width * scaleFactor;
    ctx.drawImage(imageObj, 0, 0, imageObj.width * scaleFactor, canvas.height);
  };
  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mouseup", mouseUp, false);
  canvas.addEventListener("mousemove", mouseMove, false);
  labelHolder = document.getElementById("labelHolder");
})();

function getFile() {
  document.getElementById("realUploadBtn").click();
}

function addPreview(event) {
  if (event.target.files.length > 0) {
    imagename = "";
    document.getElementById("classifyForm").action = "/image/new";
    let src = URL.createObjectURL(event.target.files[0]);
    document.getElementById("fileName").placeholder = src.slice(5, src.length);
    imageObj.src = src;
    resetRects();
  }
}

function mouseDown(e) {
  if (label === "") {
    alert("Válassz vagy vagyél fel új címkét");
    return;
  }
  rects.push({
    _label: label,
    startX: e.pageX - canvas.getBoundingClientRect().left,
    startY:
      e.pageY - (canvas.getBoundingClientRect().top + document.body.scrollTop),
  });
  labelHolder.style.visibility = "hidden";
  labelHolder.innerHTML +=
    '<p style="color:red; position:absolute; top:' +
    (canvas.offsetTop + rects[rectCount].startY) +
    "; left:" +
    (canvas.offsetLeft + rects[rectCount].startX) +
    '">' +
    rects[rectCount]._label +
    "</p>";

  drag = true;
}

function mouseUp() {
  drag = false;
  labelHolder.style.visibility = "visible";
  let rectData = document.getElementById("rectData");
  rectData.value = JSON.stringify(rects);
  ++rectCount;
}

function mouseMove(e) {
  if (drag) {
    ctx.clearRect(0, 0, imageObj.width * scaleFactor, 550);
    ctx.drawImage(imageObj, 0, 0, imageObj.width * scaleFactor, 550);
    rects[rectCount].width =
      e.pageX - (canvas.getBoundingClientRect().left + rects[rectCount].startX);
    rects[rectCount].height =
      e.pageY -
      (canvas.getBoundingClientRect().top +
        rects[rectCount].startY +
        document.body.scrollTop);
    ctx.strokeStyle = "red";
    rects.forEach((element) => {
      ctx.strokeRect(
        element.startX,
        element.startY,
        element.width,
        element.height
      );
    });
  }
}

function resetRects() {
  rects = [];
  rectCount = 0;
  ctx.clearRect(0, 0, imageObj.width * scaleFactor, 550);
  ctx.drawImage(imageObj, 0, 0, imageObj.width * scaleFactor, 550);
  rectData.value = "";
  labelHolder.innerHTML = "";
}

function setLabel(tagName) {
  label = tagName;
}
