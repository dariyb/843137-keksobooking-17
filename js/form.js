'use strict';
(function () {
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

  var houseType = window.util.adForm.querySelector('#type');
  var pricePlaceholder = window.util.adForm.querySelector('#price');
  var timeIn = window.util.adForm.querySelector('#timein');
  var timeOut = window.util.adForm.querySelector('#timeout');
  var submitButton = window.util.adForm.querySelector('.ad-form__submit');

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
    window.util.adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
  matchHousePrice();
})();
