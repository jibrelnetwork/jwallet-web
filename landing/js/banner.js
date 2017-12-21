(function($) {
  'use strict';

  function showSaleNotification() {
    try {
      var isSaleNotificationClosed = (sessionStorage.getItem('saleNotificationClosed') === '1');

      if (!isSaleNotificationClosed) {
        $('.sale-starts').addClass('active');
      }
    } catch (err) {
      console.error(err);
    }
  }

  function closeSaleNotification() {
    $('.sale-starts').removeClass('active');
    $('.sale-starts').addClass('hidden');

    try {
      sessionStorage.setItem('saleNotificationClosed', '1');
    } catch (err) {
      console.error(err);
    }
  }

  function checkSaleNotificationClosed() {
    var isSaleNotificationClosed = (sessionStorage.getItem('saleNotificationClosed') === '1');

    if (!isSaleNotificationClosed) {
      $('.sale-starts').removeClass('hidden');
    }
  }

  function closeSaleNotificationPrevent(e) {
    e.preventDefault();
    closeSaleNotification();
    e.stopPropagation();
  }

  $(document).ready(function() {
    checkSaleNotificationClosed();
    $('#sale-notification').bind('touchstart click', closeSaleNotification);
    $('#close-sale-notification').bind('touchstart click', closeSaleNotificationPrevent);

    $(window).scroll(function() {
      if ($(this).scrollTop() >= 500) {
        showSaleNotification();
      } else {
        $('.sale-starts').removeClass('active');
      }
    });
  });
})(jQuery);
