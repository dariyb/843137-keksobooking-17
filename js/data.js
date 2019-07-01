'use strict';
(function () {
  window.util = {
    maxXLocation: 1200,
    minXLocation: 0,
    maxYLocation: 630,
    minYLocation: 130,
    maxDisplay: 5,
    pinSize: 65,
    activeMap: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),
    pinAddress: document.querySelector('input[name=address]'),
    housingType: document.querySelector('#housing-type'),
    blockElements: document.querySelector('.map__pins')
  };
})();
