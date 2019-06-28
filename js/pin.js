'use strict';
window.pinModule = (function () {
  var blockElements = document.querySelector('.map__pins');

  var insertPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.creationModule.createNewPin(array[i]));
    }
    blockElements.appendChild(fragment);
  };
  return {
    insertPins: insertPins
  };
})();
