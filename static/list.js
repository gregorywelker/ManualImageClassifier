let imageData = [];
let listTags = [];
let tagcount = 0;
let filter = false;
let holder = document.getElementById("cardHolder");
(function () {
  listAll();
})();

function listImages(tagid) {
  let checkbox = document.getElementById(tagid);
  if (checkbox.checked) {
    listTags[tagcount++] = tagid;
  } else {
    let index = listTags.indexOf(tagid);
    listTags.splice(index, 1);
    --tagcount;
  }
  filter = true;
  listSetup();
}

function listAll() {
  listTags = [];
  let checkboxes = document.getElementsByClassName("form-check-input");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = true;
    listTags[i] = checkboxes[i].id;
  }
  tagcount = checkboxes.length;
  filter = false;
  listSetup();
}

function listNone() {
  listTags = [];
  let checkboxes = document.getElementsByClassName("form-check-input");
  for (let i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = false;
  }
  tagcount = 0;
  filter = true;
  holder.innerHTML = "";
}

function listSetup() {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      imageData = JSON.parse(this.responseText);
      if (filter) {
        filterImages();
      }
      drawList();
      populateList();
    }
  };
  req.open("GET", "http://localhost:30001/image/getjson", true);
  req.setRequestHeader("Content-type", "application/json");
  req.send(null);
}

function filterImages() {
  let tempImageData = [];
  let tempCount = 0;
  let added = false;
  for (let i = 0; i < imageData.length; i++) {
    for (let x = 0; x < imageData[i].rects.length; x++) {
      for (let y = 0; y < listTags.length; y++) {
        if (imageData[i].rects[x]._label == listTags[y]) {
          tempImageData[tempCount++] = imageData[i];
          added = true;
          break;
        }
      }
      if (added) {
        added = false;
        break;
      }
    }
  }
  imageData = tempImageData;
}

function drawList() {
  holder.innerHTML = "";
  for (let i = 0; i < imageData.length; i++) {
    holder.innerHTML +=
      '<div class="col-md-6">' +
      "<div>" +
      ' <div class="row m-2 customCard">' +
      '<div class="col-sm-12 col-lg-12 col-xl-10 imagePlaceholder d-flex justify-content-center p-2">' +
      '<canvas id="imageCanvas' +
      imageData[i].imageID +
      '"' +
      "></canvas>" +
      '<div id="labelHolder' +
      imageData[i].imageID +
      '"' +
      "></div>" +
      "</div>" +
      '<div class="col-sm-12 col-lg-12 col-xl-2 d-flex flex-column align-self-center">' +
      '<a class="btn btn-outline-primary w-100 mb-2" href="/image/edit/' +
      imageData[i].imageID +
      '">' +
      "Újra" +
      "</a>" +
      '<a class="btn btn-outline-danger w-100 mb-2" href="/image/delete/' +
      imageData[i].imageID +
      '">' +
      "Törlés" +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
  }
}
function populateList() {
  for (let i = 0; i < imageData.length; i++) {
    let canvas = document.getElementById("imageCanvas" + imageData[i].imageID);
    let ctx = canvas.getContext("2d");
    //On the classify page images are 550 px high, here they are 300
    let staticScaleFactor = 300 / 550;
    let rectHolder = document.getElementById(
      "labelHolder" + imageData[i].imageID
    );
    let img = new Image();
    img.src = "http://localhost:30001/" + imageData[i].imageName;
    img.onload = function () {
      let scaleFactor = canvas.height / img.height;
      canvas.height = 300;
      scaleFactor = canvas.height / img.height;
      canvas.width = img.width * scaleFactor;
      ctx.drawImage(img, 0, 0, img.width * scaleFactor, canvas.height);

      ctx.strokeStyle = "red";
      imageData[i].rects.forEach((element) => {
        ctx.strokeRect(
          element.startX * staticScaleFactor,
          element.startY * staticScaleFactor,
          element.width * staticScaleFactor,
          element.height * staticScaleFactor
        );

        rectHolder.innerHTML +=
          '<p style="color:red; position:absolute; top:' +
          (canvas.offsetTop + element.startY * staticScaleFactor) +
          "; left:" +
          (canvas.offsetLeft + element.startX * staticScaleFactor) +
          '">' +
          element._label +
          "</p>";
      });
    };
  }
}
