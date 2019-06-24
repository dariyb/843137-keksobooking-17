'use strict';
window.pinModule = (function () {
  var blockElements = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getAvatarNumber = function () {
    var avatarsList = [];
    for (var i = 1; i < window.util.marker + 1; i++) {
      var avatars = 'img/avatars/user0' + i + '.png';
      avatarsList.push(avatars);
    }
    return avatarsList;
  };

  var getPlace = function () {
    for (var i = 0; i < window.util.TYPE_OF_OFFER.length; i++) {
      var randomIndex = Math.floor(Math.random() * window.util.TYPE_OF_OFFER.length);
    }
    return randomIndex;
  };

  var getLocation = function (min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
  };

  var getAds = function () {
    var advert = [];
    var list = getAvatarNumber();
    for (var i = 0; i < window.util.marker; i++) {
      advert.push(
          {
            author:
            {
              avatar: list[i]
            },
            offer:
            {
              type: window.util.TYPE_OF_OFFER[getPlace()]
            },
            location:
            {
              x: getLocation(window.util.minXLocation, window.util.maxXLocation),
              y: getLocation(window.util.minYLocation, window.util.maxYLocation)
            }
          }
      );
    }
    return advert;
  };
  var advert = getAds();

  var createNewPin = function () {
    var newPinsList = [];
    for (var i = 0; i < window.util.marker; i++) {
      var pinMarker = pinTemplate.cloneNode(true);
      pinMarker.style.left = (advert[i].location.x + (window.util.pinSize / 2)) + 'px';
      if (advert[i].location.y >= (window.util.maxYLocation - window.util.pinSize)) {
        pinMarker.style.top = (advert[i].location.y - window.util.pinSize) + 'px';
      } else {
        pinMarker.style.top = (advert[i].location.y + window.util.pinSize) + 'px';
      }
      pinMarker.querySelector('img').src = advert[i].author.avatar;
      pinMarker.querySelector('img').alt = advert[i].offer.type;
      newPinsList.push(pinMarker);
    }
    return newPinsList;
  };
  var newPinsList = createNewPin();
  var insertPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advert.length; i++) {
      fragment.appendChild(newPinsList[i]);
    }
    blockElements.appendChild(fragment);
  };
  return {
    insertPins: insertPins
  };
})();
