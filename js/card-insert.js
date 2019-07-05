'use strict';
window.insertCard = (function () {
  var insertCards = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.card.createCard(array[i]));
    }
    window.util.cardElements.insertBefore(fragment, window.util.mapFiltersContainer);
    return {
      insertCards: insertCards
    };
  };
})();
