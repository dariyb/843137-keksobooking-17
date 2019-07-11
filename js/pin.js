'use strict';
window.pinModule = (function () {

  var insertPins = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (element, id) {
      fragment.appendChild(window.creationModule.createNewPin(id, element));
      window.util.cardElements.insertBefore(fragment.appendChild(window.card.createCard(id, element)), document.querySelector('.map__filters-container'));
    });
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
