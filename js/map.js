'use strict';
window.map = (function () {
  var adFieldsets = window.util.adForm.querySelectorAll('fieldset');
  var mapFieldsets = window.util.mapForm.querySelectorAll('select');
  var offersData;
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingPrice = document.querySelector('#housing-price');
  var housingType = window.util.mapForm.querySelector('#housing-type');
  var maxPrice = 50000;
  var minPrice = 10000;

  var matchPrice = function (price) {
    if (price < minPrice) {
      return 'low';
    }
    if (price > maxPrice) {
      return 'high';
    }
    return 'middle';
  };

  window.backend.load(function (data) {
    offersData = data;
    window.util.blockElements.addEventListener('click', function (event) {
      var popupBlock = document.querySelector('.map__card');
      var pinBlock = document.querySelector('.map__pin:not(.map__pin--main)');
      var popId = popupBlock.dataset.id;
      var pinId = pinBlock.dataset.id;
      // добавляю условие открытия
      if (event.target.localName === 'img' && event.target.alt !== 'Метка объявления' && pinId === popId) {
        openPopup();
      }
    });
    window.util.blockElements.addEventListener('keydown', function (e) {
      var popupBlock = document.querySelector('.map__card');
      var pinBlock = document.querySelector('.map__pin:not(.map__pin--main)');
      var popId = popupBlock.dataset.id;
      var pinId = pinBlock.dataset.id;
      // добавляю условие открытия
      if (e.target.localName === 'img' && e.target.alt !== 'Метка объявления' && pinId === popId) {
        openPopup();
      } else if (e.keyCode === window.util.ENTER_KEYCODE) {
        openPopup();
      }
    });
  }, window.error.errorData);

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
    window.util.cardElements.classList.remove('map--faded');
    window.util.adForm.classList.remove('ad-form--disabled');
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

  var filterPins = function (data) {
    var setType = housingType.value;
    var setPrice = housingPrice.value;
    var setRoom = housingRooms.value;
    var setGuest = housingGuests.value;

    if (setType !== 'any') {
      data = data.filter(function (info) {
        return info.offer.type === setType;
      });
    }
    if (setPrice !== 'any') {
      data = data.filter(function (info) {
        return setPrice === matchPrice(info.offer.price);
      });
    }
    if (setRoom !== 'any') {
      data = data.filter(function (info) {
        return info.offer.rooms === housingRooms.value;
      });
    }
    if (setGuest !== 'any') {
      data = data.filter(function (info) {
        return info.offer.guests === housingGuests.value;
      });
    }
    return data;
  };
  var insertFilter = function () {
    var filteredOffers = filterPins(offersData);
    window.pinModule.deletePins(window.util.blockElements);
    window.pinModule.insertPins(filteredOffers.slice(0, window.util.maxDisplay));
  };

  window.util.activeMap.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    insertFilter();

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

      if (
        (window.util.activeMap.offsetLeft < window.util.minXLocation - (window.util.pinSize / 2) && shift.x >= 0) ||
        (window.util.activeMap.offsetLeft > window.util.maxXLocation - (window.util.pinSize / 2) && shift.x <= 0) ||
        (window.util.activeMap.offsetTop < window.util.minYLocation && shift.y >= 0) ||
        (window.util.activeMap.offsetTop > window.util.maxYLocation && shift.y <= 0)
      ) {
        shift = {
          x: 0,
          y: 0
        };
      }

      window.util.activeMap.style.top = (window.util.activeMap.offsetTop - shift.y) + 'px';
      window.util.activeMap.style.left = (window.util.activeMap.offsetLeft - shift.x) + 'px';
      onActiveRemoveDisabled();
    };

    var onMouseUp = function (e) {
      e.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (event) {
          event.preventDefault();
          window.util.activeMap.removeEventListener('click', onClickPreventDefault);
        };
        window.util.activeMap.addEventListener('click', onClickPreventDefault);
      }
      window.util.pinAddress.value = (window.util.activeMap.offsetLeft - (window.util.pinSize / 2)) + ',' + (window.util.activeMap.offsetTop + (window.util.pinSize + 20));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.util.mapForm.addEventListener('change', insertFilter);

  var openPopup = function () {
    var popupBlock = document.querySelector('.map__card');
    popupBlock.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.card.closePopup();
      }
    });
  };
  var deactivateMap = function () {
    window.util.cardElements.classList.add('map--faded');
    window.util.activeMap.style.top = window.util.pinStartY + 'px';
    window.util.activeMap.style.left = window.util.pinStartX + 'px';
    document.querySelectorAll('.map__pin');
    document.querySelectorAll('.map__card');
    window.card.closePopup();
  };

  insertDisabled();
  mapDisabled();
  return {
    insertDisabled: insertDisabled,
    mapDisabled: mapDisabled,
    deactivateMap: deactivateMap,
    onActiveRemoveDisabled: onActiveRemoveDisabled
  };
})();
