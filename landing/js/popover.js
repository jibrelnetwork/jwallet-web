(function($) {
  'use strict';

  var POPOVER_ANIMATION_TIMEOUT = 300;

  window.initPopover = function(props) {
    if (!(props.id && props.id.length)) {
      throw new Error('Please pass popover id');
    }

    var id = '#' + (props.id || '');

    initHandlers(id);
  }

  function initHandlers(id) {
    initPopoverTitleClickHandler(id);
    initPopoverOverlayClickHandler(id);
  }

  function initPopoverTitleClickHandler(id) {
    $(id + ' .popover-title').click(function() {
      openPopover(id);
    });
  }

  function initPopoverOverlayClickHandler(id) {
    $(id + ' .popover-overlay').click(function() {
      closePopover(id);
    });
  }

  function openPopover(id) {
    $(id).addClass('opening');

    // need some delay to show opening animation
    setTimeout(function() {
      $(id).addClass('open');
      $(id).removeClass('opening');
    }, 50);
  }

  function closePopover(id) {
    $(id).addClass('closing');
    $(id).removeClass('open');

    setTimeout(function() {
      $(id).removeClass('closing');
    }, POPOVER_ANIMATION_TIMEOUT);
  }
})(jQuery);
