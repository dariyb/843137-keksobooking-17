'use strict';
window.pinModule = (function () {
  var blockElements = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createNewPin = function (data) {
    var newPinsList = [];
    for (var i = 0; i < data.length; i++) {
      var pinMarker = pinTemplate.cloneNode(true);
      pinMarker.style.left = (data[i].location.x + (window.util.pinSize / 2)) + 'px';
      if (data[i].location.y >= (window.util.maxYLocation - window.util.pinSize)) {
        pinMarker.style.top = (data[i].location.y - window.util.pinSize) + 'px';
      } else {
        pinMarker.style.top = (data[i].location.y + window.util.pinSize) + 'px';
      }
      pinMarker.querySelector('img').src = data[i].author.avatar;
      pinMarker.querySelector('img').alt = data[i].offer.type;
      newPinsList.push(pinMarker);
    }
    return newPinsList;
  };
  var newPinsList = createNewPin();

  var insertPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 8; i++) {
      fragment.appendChild(newPinsList[i]);
    }
    blockElements.appendChild(fragment);
  };
  var errorData = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var main = document.body;
    var errorBlock = errorTemplate.cloneNode(true);
    var errorButton = errorBlock.querySelector('.ererror__button');

    errorButton.addEventListener('click', function () {
      main.removeChild(errorBlock);
    });
    main.appendChild(errorBlock);
  };
  return {
    insertPins: insertPins,
    errorData: errorData
  };
})();
