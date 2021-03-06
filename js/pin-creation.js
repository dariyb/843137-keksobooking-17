'use strict';
window.creationModule = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createNewPin = function (id, data) {
    var pinMarker = pinTemplate.cloneNode(true);
    pinMarker.style.left = (data.location.x - (window.util.pinWidth / 2)) + 'px';
    pinMarker.style.top = (data.location.y - window.util.pinHeigth) + 'px';
    pinMarker.querySelector('img').src = data.author.avatar;
    pinMarker.querySelector('img').alt = data.offer.type;
    pinMarker.dataset.id = id;
    return pinMarker;
  };
  return {
    createNewPin: createNewPin
  };
})();
