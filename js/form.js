(function() {
  if (!("FormData" in window)) {
  return;
  }
  
  var form = document.querySelector(".form");
  var template = document.querySelector("#image-template").innerHTML;
  var area = document.querySelector(".form__upload-area");
  var queue = [];

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var data = new FormData(form);

    queue.forEach(function (element) {
      data.append("images", element.file);
    });

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
    form.querySelector("#upload_photo").addEventListener("change", function() {
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      }
      this.value = "";
    });

    function preview(file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();
        reader.addEventListener("load", function(event) {
          var html = Mustache.render(template, {
            "image": event.target.result,
            "name": file.name
          });

          var div = document.createElement("div");
          div.classList.add("form__uploaded-file");
          div.innerHTML = html;

          area.appendChild(div);

          div.querySelector(".form__delete-file").addEventListener("click",
          function(event) {
            event.preventDefault();
            removePreview(div);
          });

          queue.push({"file": file, "div": div});
        });
        reader.readAsDataURL(file);
      }
    }

    function removePreview(div) {
      queue = queue.filter(function(element) {
        return element.div != div;
      });

      div.parentNode.removeChild(div);
    }
  }
})();