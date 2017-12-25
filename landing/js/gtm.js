(function($) {
  'use strict';

  function push(data) {
    var dataLayer = window.dataLayer || [];
    dataLayer.push(data);
  }

  function pushTryJwallet(isFromHeader) {
    push({
      event: 'TryJwallet',
      eventCategory: 'TryWallet',
      eventAction: 'OpenAuthFrom',
      eventLabel: isFromHeader ? 'HeaderButton' : 'AppButton',
    });
  }

  $('#try-jwallet-header').click(function() {
    pushTryJwallet(true);
  });

  $('#try-jwallet-web-app').click(function() {
    pushTryJwallet();
  });
})(jQuery);
