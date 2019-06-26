'use strict';
(function () {
  window.util = {
    marker: 8,
    pinSize: 65,
    activeMap: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),
    pinAddress: document.querySelector('input[name=address]'),
    pinData: window.backend.load()
  };
})();
