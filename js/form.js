'use strict';
window.form = (function () {
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
  var roomNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var guestsOption = guestsNumber.querySelectorAll('option');
  var adFormReset = window.util.adForm.querySelector('.ad-form__reset');

  var LIMIT = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

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
      window.backend.save(new FormData(window.util.adForm), onLoad, window.error.errorData);
      evt.preventDefault();
    });
  });
  matchHousePrice();

  var matchRoomCapacity = function () {
    var numberOfGuests = LIMIT[roomNumber.value];
    for (var i = 0; i < guestsOption.length; i++) {
      guestsOption[i].disabled = false;
      if (numberOfGuests.indexOf(guestsOption[i].value) === -1) {
        guestsOption[i].disabled = true;
      }
    }
    if (numberOfGuests.indexOf(guestsNumber.value) === -1) {
      guestsNumber.setCustomValidity('Необходимо выбрать другой вариант');
    }
  };
  roomNumber.addEventListener('change', matchRoomCapacity);
  var onLoad = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(success);
    window.pinModule.deletePins(window.util.blockElements);
    resetForm();
    disableMap();
    window.util.pinAddress.value = (window.util.activeMap.offsetLeft - (window.util.pinSize / 2)) + ',' + (window.util.activeMap.offsetTop + (window.util.pinSize + 20));

    var successClick = function () {
      main.removeChild(success);
      document.removeEventListener('click', successClick);
    };
    document.addEventListener('click', successClick);
  };
  var resetForm = function () {
    window.util.adForm.reset();
    window.map.insertDisabled();
    window.map.mapDisabled();
    window.map.deactivateMap();
  };
  var disableMap = function () {
    window.util.adForm.classList.add('ad-form--disabled');
    adFormReset.removeEventListener('click', resetForm);
    window.map.insertDisabled();
    window.map.mapDisabled();
    submitButton.removeEventListener('click', function () {
      window.util.adForm.addEventListener('submit', function (evt) {
        window.backend.save(new FormData(window.util.adForm), onLoad, window.error.errorData);
        evt.preventDefault();
      });
    });
  };
  disableMap();
  return {
    disableMap: disableMap
  };
})();
