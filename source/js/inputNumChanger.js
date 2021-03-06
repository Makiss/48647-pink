(function () {
  if (!(document.querySelector(".form")) ) {
  return;
  }

  var formFellowsContainer = document.querySelector(".form__field--fellows-container");
  var formNumberField = document.querySelectorAll(".form__field--number");
  var html = document.querySelector("#fellow-template").innerHTML;

  for (var i = 0; i < formNumberField.length; i++) {
    initNumberField(formNumberField[i]);
  }
  function initNumberField (parent) {
    var input = parent.querySelector("input");
    var minus = parent.querySelector(".form__minus");
    var plus = parent.querySelector(".form__plus");

    minus.addEventListener("tap", function() {
      changeNumber(false);
    });
    plus.addEventListener("tap", function() {
      changeNumber(true);
    });

    function changeNumber (operation) {
      var value = Number(input.value);

      if(isNaN(value)) {
        value = 0;
      }

      if (operation) {
        input.value = value + 1;
        if (input.classList.contains("form__item--fellow-number")) {
          var div = document.createElement("div");
          div.classList.add("form__field", "form__field--fellows-data");
          div.innerHTML = html;
          formFellowsContainer.appendChild(div);
        }
      } else {
          if (value > 0) {
            input.value = value - 1;
          if (input.classList.contains("form__item--fellow-number")) {
            formFellowsContainer.removeChild(formFellowsContainer.lastElementChild);
          }
        }
      }
    }
  }
})();
