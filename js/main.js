'use strict';

var TYPE_OF_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var minXLocation = 0;
var maxXLocation = 1200;
var minYLocation = 130;
var maxYLocation = 630;

var getAvatarNumber = function () {
  var avatarsList = [];
  for (var i = 1; i < 8; i++) {
    var avatars = 'img/avatars/user0' + i + '.png';
    avatarsList.push(avatars);
  }
  return avatarsList;
};

var getPlace = function () {
  for (var i = 0; i < TYPE_OF_OFFER.length; i++) {
    var randomIndex = Math.floor(Math.random() * TYPE_OF_OFFER.length);
  }
  return randomIndex;
};

var getLocation = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
};

var advert = [
  {
    author:
    {
      avatar: getAvatarNumber()
    }
  },
  {
    offer:
    {
      type: TYPE_OF_OFFER[getPlace()]
    }
  },
  {
    location:
    {
      x: getLocation(minXLocation, maxXLocation),
      y: getLocation(minYLocation, maxYLocation)
    }
  },
  {
    author:
    {
      avatar: getAvatarNumber()
    }
  },
  {
    offer:
    {
      type: TYPE_OF_OFFER[getPlace()]
    }
  },
  {
    location:
    {
      x: getLocation(minXLocation, maxXLocation),
      y: getLocation(minYLocation, maxYLocation)
    }
  },
  {
    author:
    {
      avatar: getAvatarNumber()
    }
  },
  {
    offer:
    {
      type: TYPE_OF_OFFER[getPlace()]
    }
  },
  {
    location:
    {
      x: getLocation(minXLocation, maxXLocation),
      y: getLocation(minYLocation, maxYLocation)
    }
  },
  {
    author:
    {
      avatar: getAvatarNumber()
    }
  },
  {
    offer:
    {
      type: TYPE_OF_OFFER[getPlace()]
    }
  },
  {
    location:
    {
      x: getLocation(minXLocation, maxXLocation),
      y: getLocation(minYLocation, maxYLocation)
    }
  },
  {
    author:
    {
      avatar: getAvatarNumber()
    }
  },
  {
    offer:
    {
      type: TYPE_OF_OFFER[getPlace()]
    }
  },
  {
    location:
    {
      x: getLocation(minXLocation, maxXLocation),
      y: getLocation(minYLocation, maxYLocation)
    }
  },
  {
    author:
    {
      avatar: getAvatarNumber()
    }
  },
  {
    offer:
    {
      type: TYPE_OF_OFFER[getPlace()]
    }
  },
  {
    location:
    {
      x: getLocation(minXLocation, maxXLocation),
      y: getLocation(minYLocation, maxYLocation)
    }
  },
  {
    author:
    {
      avatar: getAvatarNumber()
    }
  },
  {
    offer:
    {
      type: TYPE_OF_OFFER[getPlace()]
    }
  },
  {
    location:
    {
      x: getLocation(minXLocation, maxXLocation),
      y: getLocation(minYLocation, maxYLocation)
    }
  },
  {
    author:
    {
      avatar: getAvatarNumber()
    }
  },
  {
    offer:
    {
      type: TYPE_OF_OFFER[getPlace()]
    }
  },
  {
    location:
    {
      x: getLocation(minXLocation, maxXLocation),
      y: getLocation(minYLocation, maxYLocation)
    }
  }
];

var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');

var createNewPin = function () {
  for (var i = 0; i < advert.length; i++) {
    var userPin = document.createElement('button');
    var userAvatar = document.createElement('img');
    userPin.className = 'pin';
    userPin.style.left = (advert[i].location.x - (65 / 2)) + 'px';
    userPin.style.top = (advert[i].location.y - 87) + 'px';
    userAvatar.width = 40;
    userAvatar.height = 40;
    userAvatar.src = advert[i].author.avatar[i];
    userAvatar.alt = 'Метка объявления';
    userPin.appendChild(userAvatar);
  }
  return userPin;
};

var blockElements = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var i = 0; i < advert.length; i++) {
  fragment.appendChild(createNewPin(advert[i]));
}
blockElements.appendChild(fragment);
