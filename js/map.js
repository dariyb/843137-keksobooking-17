'use strict';
(function () {
  var adFieldsets = window.util.adForm.querySelectorAll('fieldset');
  var mapForm = document.querySelector('.map__filters');
  var mapFieldsets = mapForm.querySelectorAll('select');

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
    window.pinModule.insertPins();
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

  window.util.activeMap.addEventListener('mousedown', function (evt) {
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
      window.util.pinAddress.value = (window.util.activeMap.offsetLeft - (window.util.pinSize / 2)) + ',' + (window.util.activeMap.offsetTop + (window.util.pinSize + 22));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  insertDisabled();
  mapDisabled();
})();
