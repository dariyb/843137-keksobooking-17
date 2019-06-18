'use strict';

var TYPE_OF_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var minXLocation = 0;
var maxXLocation = 1200;
var minYLocation = 130;
var maxYLocation = 630;
var marker = 8;
var pinSize = 65;
var blockElements = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapForm = document.querySelector('.map__filters');
var mapFieldsets = mapForm.querySelectorAll('select');
var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('fieldset');
var activeMap = document.querySelector('.map__pin--main');
var pinAddress = adForm.querySelector('input[name=address]');
var PIN_LOCATION = (activeMap.style.left + ',' + activeMap.style.top);

var getAvatarNumber = function () {
  var avatarsList = [];
  for (var i = 1; i < marker + 1; i++) {
    var avatars = 'img/avatars/user0' + i + '.png';
    avatarsList.push(avatars);
  }
  return avatarsList;
};

var getPlace = function () {
  for (var i = 0; i < TYPE_OF_OFFER.length; i++) {
    var randomIndex = Math.floor(Math.random() * TYPE_OF_OFFER.length);
  }
  return randomIndex;
};

var getLocation = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
};

var getAds = function () {
  var advert = [];
  var list = getAvatarNumber();
  for (var i = 0; i < marker; i++) {
    advert.push(
        {
          author:
          {
            avatar: list[i]
          },
          offer:
          {
            type: TYPE_OF_OFFER[getPlace()]
          },
          location:
          {
            x: getLocation(minXLocation, maxXLocation),
            y: getLocation(minYLocation, maxYLocation)
          }
        }
    );
  }
  return advert;
};
var advert = getAds();

var createNewPin = function () {
  var newPinsList = [];
  for (var i = 0; i < marker; i++) {
    var pinMarker = pinTemplate.cloneNode(true);
    pinMarker.style.left = (advert[i].location.x - (pinSize / 2)) + 'px';
    pinMarker.style.top = (advert[i].location.y - pinSize) + 'px';
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

var insertDisabled = function () {
  for (var i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].setAttribute('disabled', 'disabled');
  }
  return adFieldsets;
};

var mapDisabled = function () {
  for (var i = 0; i < mapFieldsets.length; i++) {
    mapFieldsets[i].setAttribute('disabled', 'disabled');
  }
  return mapFieldsets;
};

var onActiveRemoveDisabled = function () {
  var mapBlock = document.querySelector('.map');
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  insertPins();
  var activateMap = function () {
    for (var i = 0; i < mapFieldsets.length; i++) {
      mapFieldsets[i].removeAttribute('disabled', 'disabled');
    }
    return mapFieldsets;
  };
  activateMap();
  for (var i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].removeAttribute('disabled', 'disabled');
  }
  return adFieldsets;
};

pinAddress.value = PIN_LOCATION;
activeMap.addEventListener('click', onActiveRemoveDisabled);
activeMap.addEventListener('mouseup', function () {
  pinAddress.value = PIN_LOCATION;
});

insertDisabled();
mapDisabled();
