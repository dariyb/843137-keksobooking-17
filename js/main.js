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
var startX = activeMap.offsetLeft;
var startY = activeMap.offsetTop;

var typesPrice = {
  bungalo:
  {
    minPrice: 0
  },
  flat:
  {
    minPrice: 1000
  },
  house:
  {
    minPrice: 5000
  },
  palace:
  {
    minPrice: 10000
  }
};

var houseType = adForm.querySelector('#type');
var pricePlaceholder = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var submitButton = adForm.querySelector('.ad-form__submit');

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
    pinMarker.style.left = (advert[i].location.x + (pinSize / 2)) + 'px';
    if (advert[i].location.y >= (maxYLocation - pinSize)) {
      pinMarker.style.top = (advert[i].location.y - pinSize) + 'px';
    } else {
      pinMarker.style.top = (advert[i].location.y + pinSize) + 'px';
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

pinAddress.value = startX + ',' + startY;
activeMap.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (event) {
    event.preventDefault();
    dragged = true;

    var shift = {
      x: startCoordinates.x - event.clientX,
      y: startCoordinates.y - event.clientY
    };
    startCoordinates = {
      x: event.clientX,
      y: event.clientY
    };
    if (event.clientX > minXLocation) {
      startCoordinates.x = event.clientX;
    }
    if (event.clientX > maxXLocation) {
      startCoordinates.x = maxXLocation;
    }
    if (event.clientY < minYLocation) {
      startCoordinates.y = minYLocation;
    }
    if (event.clientY > maxYLocation) {
      startCoordinates.y = maxYLocation;
    }

    activeMap.style.top = (activeMap.offsetTop - shift.y) + 'px';
    activeMap.style.left = (activeMap.offsetLeft - shift.x) + 'px';
    onActiveRemoveDisabled();
  };

  var onMouseUp = function (e) {
    e.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (event) {
        event.preventDefault();
        activeMap.removeEventListener('click', onClickPreventDefault);
      };
      activeMap.addEventListener('click', onClickPreventDefault);
    }
    pinAddress.value = (activeMap.offsetLeft - (pinSize / 2)) + ',' + (activeMap.offsetTop - (pinSize + 22));
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var getHousePrice = function () {
  return typesPrice[houseType.value].minPrice;
};
var matchHousePrice = function () {
  var minPrice = getHousePrice();
  pricePlaceholder.setAttribute('placeholder', minPrice);
  pricePlaceholder.setAttribute('min', minPrice);
};

houseType.addEventListener('change', function () {
  matchHousePrice();
});

timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
});
timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
});
submitButton.addEventListener('click', function () {
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
});

insertDisabled();
mapDisabled();
matchHousePrice();
