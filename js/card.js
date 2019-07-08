'use strict';
window.card = (function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var tranclateOfferType = function (offerType) {
    switch (offerType) {
      case 'flat':
        offerType = 'Квартира';
        return offerType;

      case 'bungalo':
        offerType = 'Бунгало';
        return offerType;

      case 'house':
        offerType = 'Дом';
        return offerType;

      case 'palace':
        offerType = 'Дворец';
        return offerType;
    }
    return offerType;
  };

  var createCard = function (data) {
    var cardInfo = cardTemplate.cloneNode(true);
    cardInfo.classList.add('map__card', 'popup');
    cardInfo.style.left = data.location.x;
    cardInfo.style.top = data.location.y;
    cardInfo.querySelector('.popup__title').textContent = data.offer.title;
    cardInfo.querySelector('.popup__text--address').textContent = data.offer.address;
    cardInfo.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardInfo.querySelector('.popup__type').textContent = tranclateOfferType(data.offer.type);
    cardInfo.querySelector('.popup__text--capacity').textContent = data.offer.rooms + 'комнаты для ' + data.offer.guests + 'гостей';
    cardInfo.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardInfo.querySelector('.popup__description').textContent = data.offer.description;
    cardInfo.querySelector('.popup__avatar').src = data.author.avatar;
    cardInfo.querySelector('.popup__avatar').alt = 'Аватар пользователя';

    var features = cardInfo.querySelector('.popup__feature');
    for (var i = 0; i < data.offer.features; i++) {
      features.textContent = data.offer.features[i];
    }

    var photos = cardInfo.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();
    if (data.offer.photos.length > 0) {
      for (i = 0; i < data.offer.photos.length; i++) {
        var photo = photos.cloneNode(true);
        photo.src = data.offer.photos[i];
        photo.alt = 'Фотография места проживания';
        fragment.appendChild(photo);
      }
    }
    cardInfo.querySelector('.popup__photos').removeChild(cardInfo.querySelector('.popup__photos').querySelector('img'));
    cardInfo.querySelector('.popup__photos').appendChild(fragment);
    //    cardInfo.classList.add('hidden');
    return cardInfo;
  };
  return {
    createCard: createCard
  };
})();

// доделать features and photo
