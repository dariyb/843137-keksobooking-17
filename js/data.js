'use strict';
(function () {
  window.util = {
    maxXLocation: 1200,
    minXLocation: 0,
    maxYLocation: 630,
    minYLocation: 130,
    marker: 8,
    pinSize: 65,
    activeMap: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),
    pinAddress: document.querySelector('input[name=address]')
  };
})();
