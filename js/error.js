'use strict';
window.error = (function () {
  var errorData = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var main = document.querySelector('main');
    var errorBlock = errorTemplate.cloneNode(true);
    var errorButton = errorBlock.querySelector('.error__button');

    main.appendChild(errorBlock);
    window.map.deactivateMap();
    window.form.disableMap();

    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      main.removeChild(errorBlock);
      window.map.onActiveRemoveDisabled();
    });
  };
  return {
    errorData: errorData
  };
})();
