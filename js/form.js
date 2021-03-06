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
  window.util.pinAddress.value = startX + ',' + startY;

  var getAvailableOptions = function () {
    guestsOption.forEach(function (guest) {
      guest.remove();
    });
    var applyCapacity = function (guests) {
      guests.forEach(function (guest) {
        guestsNumber.appendChild(guestsOption[guest]);
      });
    };
    switch (roomNumber.selectedIndex) {
      case 0:
        applyCapacity([2]);
        break;
      case 1:
        applyCapacity([1, 2]);
        break;
      case 2:
        applyCapacity([0, 1, 2]);
        break;
      case 3:
        applyCapacity([3]);
        break;
    }
  };
  var getHousePrice = function () {
    return typesPrice[houseType.value].minPrice;
  };
  var matchHousePrice = function () {
    var minPrice = getHousePrice();
    pricePlaceholder.setAttribute('placeholder', minPrice);
    pricePlaceholder.setAttribute('min', minPrice);
  };

  var onLoad = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(success);
    window.pinModule.deletePins(window.util.blockElements);
    resetForm();
    disableMap();
    window.util.pinAddress.value = window.util.pinStartX + ',' + window.util.pinStartY;

    var successClick = function () {
      main.removeChild(success);
      document.removeEventListener('click', successClick);
      document.removeEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          successClick();
        } else if (evt.keyCode === window.util.ENTER_KEYCODE) {
          successClick();
        }
      });
    };
    document.addEventListener('click', successClick);
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === window.util.ENTER_KEYCODE) {
        successClick();
      } else if (e.keyCode === window.util.ESC_KEYCODE) {
        successClick();
      }
    });
  };
  var resetForm = function () {
    window.util.adForm.reset();
    window.pinModule.deletePins(window.util.blockElements);
    window.card.deletePopup(document);
    window.util.mapForm.reset();
    disableMap();
    window.map.deactivateMap();
    window.util.pinAddress.value = window.util.pinStartX + ',' + window.util.pinStartY;
  };
  var disableMap = function () {
    window.util.adForm.classList.add('ad-form--disabled');
    adFormReset.removeEventListener('click', resetForm);
    window.map.insertDisabled();
    window.map.mapDisabled();
    houseType.removeEventListener('change', function () {
      matchHousePrice();
    });
    timeIn.removeEventListener('change', function () {
      timeOut.value = timeIn.value;
    });
    timeOut.removeEventListener('change', function () {
      timeIn.value = timeOut.value;
    });
    roomNumber.removeEventListener('change', getAvailableOptions);
    submitButton.removeEventListener('click', function () {
      window.util.adForm.addEventListener('submit', function (evt) {
        window.backend.save(new FormData(window.util.adForm), onLoad, window.error.errorData);
        evt.preventDefault();
      });
    });
  };
  adFormReset.addEventListener('click', function () {
    resetForm();
    disableMap();
  });
  getAvailableOptions();
  matchHousePrice();
  disableMap();
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
  roomNumber.addEventListener('change', getAvailableOptions);

})();
