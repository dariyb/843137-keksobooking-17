'use strict';
window.pinModule = (function () {
  var blockElements = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createNewPin = function (data) {
    var pinMarker = pinTemplate.cloneNode(true);
    pinMarker.style.left = (data.location.x + (window.util.pinSize / 2)) + 'px';
    if (data.location.y >= (window.util.maxYLocation - window.util.pinSize)) {
      pinMarker.style.top = (data.location.y - window.util.pinSize) + 'px';
    } else {
      pinMarker.style.top = (data.location.y + window.util.pinSize) + 'px';
    }
    pinMarker.querySelector('img').src = data.author.avatar;
    pinMarker.querySelector('img').alt = data.offer.type;

    return pinMarker;
  };
  var insertPins = function (pin) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pin.length; i++) {
      fragment.appendChild(createNewPin(pin[i]));
    }
    blockElements.appendChild(fragment);
  };
  window.backend.load(insertPins);
  return {
    insertPins: insertPins
  };
})();
