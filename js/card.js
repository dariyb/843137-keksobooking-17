'use strict';
window.card = (function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createCard = function (data) {
    var cardInfo = cardTemplate.cloneNode(true);
    cardInfo.classList.add('map__card', 'popup');
    cardInfo.style.left = data.location.x;
    cardInfo.style.top = data.location.y;
    cardInfo.querySelector('.popup__title').textContent = data.offer.title;
    cardInfo.querySelector('.popup__text--address').textContent = data.offer.address;
    cardInfo.querySelector('.popup__text--price').textContent = data.offer.price + '&#x20bd;/ночь';
    cardInfo.querySelector('.popup__type').textContent = data.offer.type;
    cardInfo.querySelector('.popup__text--capacity').textContent = data.offer.rooms + 'комнаты для ' + data.offer.guests + 'гостей';
    cardInfo.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardInfo.querySelector('.popup__features').querySelector('li').textContent = data.offer.features;
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
    cardInfo.querySelector('.popup__photo').appendChild(fragment);
    return cardInfo;
  };
  return {
    createCard: createCard
  };
})();
