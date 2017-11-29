$(document).ready(function() {

    //AOS
    AOS.init({
        disable: 'mobile'
    });

    //Header animation
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 100) {
            $('.header').addClass('active');
        }
        else {
            $('.header').removeClass('active');
        }
    });

    $('.faq h3').click(function() {
        $('.faq .item').removeClass('active');
        $(this).parent().toggleClass('active');
    });

    //Menu
    $('.menu-button').click(function() {
        $(this).toggleClass('active');
        $('.menu, html').toggleClass('active');
        return false;
    });

    $('.menu .scroll').click(function() {
        $('.menu-button').toggleClass('active');
        $('.menu, html').removeClass('active');
        return false;
    });

    //Waves
    $('#feel-the-wave-two').wavify({
        height: 60,
        bones: 2,
        amplitude: 30,
        color: '#fff',
        speed: .15
    });

    $('#feel-the-wave').wavify({
        height: 40,
        bones: 1,
        amplitude: 20,
        color: 'rgba(0, 193, 255, .8)',
        speed: .20
    });

    //Scroll
    $('.scroll').smoothScroll();

    //Tokens
    var a = document.querySelectorAll('#tokens p');
    a = Array.prototype.slice.call(a);

    var b = document.querySelectorAll('#tokens div');
    b = Array.prototype.slice.call(b);

    a.forEach(function(el, i, ra) {
        var to = {
            x: Math.random() * 2,
            y: Math.random() * 1.2
        }

        el.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: 'translate('+to.x+'rem,'+to.y+'rem) scale('+Math.random()+')', opacity: Math.random() }
        ], {
            duration: (Math.random() + 1) * 2000,
            direction: 'alternate',
            fill: 'forwards',
            iterations: Infinity,
            easing: 'ease-in-out',
            delay: 0
        });
    });

    var width = 800;
    var height = 400;
    b.forEach(function(el, i, ra) {
        var translate = (Math.random()*width*(i%2 == 0 ? -1 : 1)) +'px,' + (Math.random()*height);
        el.animate([
            { transform: 'scale(0) translate(0)' },
            {transform: 'scale(1)  translate(' + translate + 'px)'}
        ], {
            duration: 5000,
            fill: 'both',
            easing: 'ease-out'
        });
    });

    //
    // these easing functions are based on the code of glsl-easing module.
    // https://github.com/glslify/glsl-easings
    //

    var ease = {
        exponentialIn: function(t) {
            return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
        },
        exponentialOut: function(t) {
            return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
        },
        exponentialInOut: function(t) {
            return t == 0.0 || t == 1.0
                ? t
                : t < 0.5
                    ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
                    : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
        },
        sineOut: function(t) {
            const HALF_PI = 1.5707963267948966;
            return Math.sin(t * HALF_PI);
        },
        circularInOut: function(t) {
            return t < 0.5
                ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
                : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
        },
        cubicIn: function(t) {
            return t * t * t;
        },
        cubicOut: function(t) {
            const f = t - 1.0;
            return f * f * f + 1.0;
        },
        cubicInOut: function(t) {
            return t < 0.5
                ? 4.0 * t * t * t
                : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
        },
        quadraticOut: function(t) {
            return -t * (t - 2.0);
        },
        quarticOut: function(t) {
            return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
        },
    }

    // Loader
    // Timeout is needed to prevent screen blinking if page loaded to fast
    setTimeout(function() {
      $('.loader').css('display', 'none');
    }, 500);

    //Banner animation
    function showSaleNotification() {
      try {
        var isSaleNotificationClosed = (localStorage.getItem('saleNotificationClosed') === '1');

        if (isSaleNotificationClosed) {
          return;
        }

        $('.sale-starts').addClass('active');
      } catch (err) {
        console.error(err);
      }
    }

    function closeSaleNotification() {
      $('.sale-starts').removeClass('active');

      try {
        localStorage.setItem('saleNotificationClosed', '1');
      } catch (err) {
        console.error(err);
      }
    }

    function closeSaleNotificationPrevent(e) {
      e.preventDefault();
      closeSaleNotification();
      e.stopPropagation();
    }

    $('#sale-notification').click(closeSaleNotification);
    $('#close-sale-notification').click(closeSaleNotificationPrevent);

    $(window).scroll(function() {
      if ($(this).scrollTop() >= 500) {
        showSaleNotification()
      } else {
        $('.sale-starts').removeClass('active');
      }
    });

});
