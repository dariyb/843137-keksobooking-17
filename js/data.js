'use strict';
(function () {
  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    maxXLocation: 1200,
    minXLocation: 0,
    maxYLocation: 630,
    minYLocation: 130,
    pinStartX: 570,
    pinStartY: 375,
    maxDisplay: 5,
    pinSize: 65,
    pinWidth: 50,
    pinHeigth: 70,
    activeMap: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),
    pinAddress: document.querySelector('input[name=address]'),
    blockElements: document.querySelector('.map__pins'),
    cardElements: document.querySelector('.map'),
    mapForm: document.querySelector('.map__filters')
  };
})();
