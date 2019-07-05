'use strict';
window.pinModule = (function () {

  var insertPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.creationModule.createNewPin(array[i]));
    }
    window.util.blockElements.appendChild(fragment);
  };
  var deletePins = function (block) {
    var elements = block.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.from(elements).forEach(function (element) {
      element.remove();
    });
  };
  return {
    insertPins: insertPins,
    deletePins: deletePins
  };
})();
