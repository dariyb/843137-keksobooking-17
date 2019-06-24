'use strict';
(function () {
  window.util = {
    TYPE_OF_OFFER: ['palace', 'flat', 'house', 'bungalo'],
    minXLocation: 0,
    maxXLocation: 1200,
    minYLocation: 130,
    maxYLocation: 630,
    marker: 8,
    pinSize: 65,
    activeMap: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),
    pinAddress: document.querySelector('input[name=address]')
  };
})();
