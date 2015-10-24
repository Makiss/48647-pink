(function () {
  var formNumberField = document.querySelectorAll(".form__field--number");
  for (var i = 0; i < formNumberField.length; i++) {
    initNumberField(formNumberField[i]);
  }
  function initNumberField (parent) {
    var input = parent.querySelector("input");
    var minus = parent.querySelector(".form__minus");
    var plus = parent.querySelector(".form__plus");

    minus.addEventListener("click", function() {
      changeNumber(false);
    });
    plus.addEventListener("click", function() {
      changeNumber(true);
    });

    function changeNumber (operation) {
      var value = Number(input.value);

      if(isNaN(value)) {
        value = 0; 
      }

      if (operation) {
        input.value = value + 1;
      } else {
      	if (value > 1) {
          input.value = value - 1;
        }
      } 
    }
  }
})();