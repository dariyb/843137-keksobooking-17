'use strict';
window.card = (function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var tranclateOfferType = function (offerType) {
    switch (offerType) {
      case 'flat':
        offerType = 'Квартира';
        return 'Квартира';

      case 'bungalo':
        offerType = 'Бунгало';
        return 'Бунгало';

      case 'house':
        offerType = 'Дом';
        return 'Дом';

      case 'palace':
        offerType = 'Дворец';
        return 'Дворец';
    }
    return offerType;
  };


  var createCard = function (id, data) {
    var cardInfo = cardTemplate.cloneNode(true);

    cardInfo.classList.add('map__card', 'popup');
    cardInfo.style.left = data.location.x;
    cardInfo.style.top = data.location.y;
    cardInfo.querySelector('.popup__title').textContent = data.offer.title;
    cardInfo.querySelector('.popup__text--address').textContent = data.offer.address;
    cardInfo.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
    cardInfo.querySelector('.popup__type').textContent = tranclateOfferType(data.offer.type);
    cardInfo.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardInfo.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardInfo.querySelector('.popup__description').textContent = data.offer.description;
    cardInfo.querySelector('.popup__avatar').src = data.author.avatar;
    cardInfo.querySelector('.popup__avatar').alt = 'Аватар пользователя';

    var photos = cardInfo.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();
    if (data.offer.photos.length > 0) {
      for (var i = 0; i < data.offer.photos.length; i++) {
        var photo = photos.cloneNode(true);
        photo.src = data.offer.photos[i];
        photo.alt = 'Фотография места проживания';
        fragment.appendChild(photo);
      }
    }

    var setFeatures = function (features) {
      var fragmentF = document.createDocumentFragment();
      cardInfo.querySelectorAll('.popup__feature').forEach(function (feature) {
        feature.remove();
      });
      features.forEach(function (element) {
        var newElement = document.createElement('li');
        newElement.classList.add('popup__feature', 'popup__feature--' + element);
        fragmentF.appendChild(newElement);
      });
      cardInfo.querySelector('.popup__features').appendChild(fragmentF);
    };
    setFeatures(data.offer.features);

    cardInfo.querySelector('.popup__photos').removeChild(cardInfo.querySelector('.popup__photos').querySelector('img'));
    cardInfo.querySelector('.popup__photos').appendChild(fragment);
    cardInfo.classList.add('hidden');
    cardInfo.querySelector('.popup__close').addEventListener('click', function () {
      var popId = event.target.dataset.id ? event.target.dataset.id : event.target.parentNode.dataset.id;
      closePopup(popId);
    });
    document.querySelector('keydown', onPopupEscPress);

    cardInfo.dataset.id = id;
    return cardInfo;
  };
  var onPopupEscPress = function () {
    var popId = event.target.dataset.id ? event.target.dataset.id : event.target.parentNode.dataset.id;
    if (event.keyCode === window.util.ESC_KEYCODE) {
      closePopup(popId);
    }
  };
  var closePopup = function (popupId) {
    var popupSelector = '.map__card[data-id="' + popupId + '"]';
    var popupBlock = document.querySelector(popupSelector);
    popupBlock.classList.add('hidden');
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');

    document.removeEventListener('keydown', onPopupEscPress);
  };
  var deletePopup = function (popup) {
    var elements = popup.querySelectorAll('.map__card');
    Array.from(elements).forEach(function (element) {
      element.remove();
    });
  };
  return {
    createCard: createCard,
    deletePopup: deletePopup,
    closePopup: closePopup
  };
})();
