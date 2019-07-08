'use strict';
(function () {
  var adFieldsets = window.util.adForm.querySelectorAll('fieldset');
  var mapForm = document.querySelector('.map__filters');
  var mapFieldsets = mapForm.querySelectorAll('select');
  var matchHousingType = mapForm.querySelector('#housing-type');
  var offersData;

  window.backend.load(function (data) {
    offersData = data;
    window.util.blockElements.addEventListener('click', function (event) {
      if (event.target.localName === 'img' && event.target.alt !== 'Метка объявления') {
        openPopup();
      }
    });
    var openPopup = function () {
      var popupBlock = document.querySelector('.map__card');

      popupBlock.classList.remove('hidden');
    };
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
    var mapBlock = document.querySelector('.map');
    mapBlock.classList.remove('map--faded');
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

  var mathHousingFilter = function (item, type) {
    if (type === 'any') {
      return true;
    }
    return item.offer.type === type;
  };
  var applyFilter = function (offer, filters) {
    return offer.filter(function (item) {
      return mathHousingFilter(item, filters);
    });
  };

  var getCurrentFilter = function () {
    return matchHousingType.value;
  };
  var insertFilter = function () {
    var currentFilter = getCurrentFilter();
    var filteredOffers = applyFilter(offersData, currentFilter);
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
  matchHousingType.addEventListener('change', insertFilter);


  insertDisabled();
  mapDisabled();
})();
