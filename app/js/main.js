new WOW().init();
var $myjQ = jQuery.noConflict();

jQuery(document).ready(function ($) {
  $("#phone").mask("+7 (999) 99-99-999");
});

$myjQ(document).ready(function ($) {
  // бургер меню для фильтра... Start
  $('.menu__btn').on('click', function () {
    $('.header').toggleClass('header--active');
    $('body').toggleClass('lock');
  });
  // бургер меню для фильтра... END
});

$myjQ(document).ready(function ($) {
  // открытие попап-ов
  const modalCall = $('[data-modal]');
  const modalClose = $('[data-close]');

  modalCall.on('click', function (event) {
    event.preventDefault();
    let $this = $(this);
    let modalId = $this.data('modal');

    $(modalId).addClass('show');

    $('body').addClass('lock');
  });


  modalClose.on('click', function (event) {
    event.preventDefault();
    let $this = $(this);
    let modalParent = $this.parents('.modal');

    modalParent.removeClass('show');
    modalParent.removeClass('lock');
  });


  // закрыть попап обратной связи
  $('.modal').on('click', function (event) {
    $(this).removeClass('show');
    $('body').removeClass('lock');
  });

  $('.popup-client__inner').on('click', function (event) {
    event.stopPropagation();
  });


  // закрыть попап с видео
  $('.modal').on('click', function (event) {
    $(this).removeClass('show');
    $('body').removeClass('lock');
  });

  $('.popup-video__box').on('click', function (event) {
    event.stopPropagation();
  });
});


$myjQ(document).ready(function ($) {

  $('[data-fancybox="gallery"]').fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    },
    openEffect: 'fade',
    closeEffect: 'fade',
    type: 'image',
    preload: false,
    btnTpl: {
      arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
        '<svg class="arrow-left-3" viewBox="0 0 5 9"> <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z"/></svg>' + "</button > ",
      arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
        '<svg class="arrow-right-3" viewBox="0 0 5 9"> <path d= "M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z"/></svg>' + "</button>"
    }
  });

  $('[data-fancybox="instalation"]').fancybox({
    openEffect: 'fade',
    closeEffect: 'fade',
    type: 'image',
    helpers: {
      overlay: {
        locked: false
      }
    },
    preload: false,
    type: 'image',
    btnTpl: {
      arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
        '<svg class="arrow-left-3" viewBox="0 0 5 9"> <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z"/></svg>' + "</button > ",
      arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
        '<svg class="arrow-right-3" viewBox="0 0 5 9"> <path d= "M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z"/></svg>' + "</button>"
    }
  });

  $('[data-fancybox="content"]').fancybox({
    openEffect: 'fade',
    closeEffect: 'fade',
    type: 'image',
    helpers: {
      overlay: {
        locked: false
      }
    },
    preload: false,
    type: 'image',
    btnTpl: {
      arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
        '<svg class="arrow-left-3" viewBox="0 0 5 9"> <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z"/></svg>' + "</button > ",
      arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
        '<svg class="arrow-right-3" viewBox="0 0 5 9"> <path d= "M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z"/></svg>' + "</button>"
    }
  });
});