'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var startX = window.util.activeMap.offsetLeft;
  var startY = window.util.activeMap.offsetTop;

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

  window.util.pinAddress.value = startX + ',' + startY;
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
  matchHousePrice();
})();
