(function() {
  if (!("FormData" in window)) {
  return;
  }

  var form = document.querySelector(".form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var data = new FormData(form);

    request(data, function(response) {
      console.log(response);
    });
  });

  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);

    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        console.log(xhr.responseText);
      }
    });

    xhr.send(data);
  }

  if ("FileReader" in window) {
    var area = document.querySelector(".form__upload-area");
    form.querySelector("#upload_photo").addEventListener("change", function() {
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      }
    });

    function preview(file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();
        reader.addEventListener("load", function(event) {
          var delButton = document.createElement("div");
          delButton.classList.add("form__delete-file");
          var img = document.createElement("img");
          img.src = event.target.result;
          img.alt = file.name;
          var fileDescr = document.createElement("span");
          fileDescr.classList.add("form__uploaded-descr");
          fileDescr.innerText = file.name;
          var uploadedPhoto = document.createElement("div");
          uploadedPhoto.classList.add("form__uploaded-file");
          uploadedPhoto.appendChild(delButton);
          uploadedPhoto.appendChild(img);
          uploadedPhoto.appendChild(fileDescr);
          area.appendChild(uploadedPhoto);
        });
        reader.readAsDataURL(file);
      }
    }
  }
})();