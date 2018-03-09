// Create Theme JS

window.Theme = window.Theme || {
  $: {
    container: $('.container'),
    header: $('.header'),
    menuToggle: $('.mobile-menu-toggle'),
  },
  init: function () {
    this.Menu.toggle();
    this.Turbolinks.init();
    this.reload();
  },
  reload: function () {
    Theme.themeData = _4ORMAT_DATA;
    this.initJSForPageType();
    this.bindEvents();
  },
  bindEvents: function () {
  },
  initJSForPageType: function () {
    var pageType = this.normalizedPageType();
    if (window.Theme.hasOwnProperty(pageType)) {
      window.Theme[pageType].init();
    }
  },
  normalizedPageType: function () {
    var pageType;
    if (Theme.themeData.page.hasOwnProperty('nested')) {
      pageType = Theme.themeData.page.nested.type.charAt(0).toUpperCase() + Theme.themeData.page.nested.type.slice(1);
    } else {
      pageType = Theme.themeData.page.type.charAt(0).toUpperCase() + Theme.themeData.page.type.slice(1);
    }
    return pageType;
  },
};

window.Theme.Turbolinks = window.Theme.Turbolinks || {
  init: function () {
    $(window).on("page:update", this.onUpdate.bind(this));
    $(window).on("page:before-change", this.onBeforeChange.bind(this));
    $(window).on("page:load", this.onPageLoad.bind(this));
    $(window).on("page:restore", this.onRestore.bind(this));
  },
  onBeforeChange: function (e) {
    e.preventDefault();
    if ($('body').hasClass('active')) {
      $('body').removeClass('active');
      $('.mobile-menu-toggle button').html(Theme.themeData.theme.menu_text);
    }
    if ($('.header').hasClass('nav-up')) {
      $('.header').removeClass('nav-up');
      $('.header').addClass('nav-down');
    }
    $("html").addClass("is-changing");
    Turbolinks.visit(e.originalEvent.data.url);
  },
  onUpdate: function (e) {
    window.Theme.reload();
  },
  onPageLoad: function (e) {
    setTimeout(function () {
      $("html").removeClass("is-changing");
    }, 500);
  },
  onRestore: function (e) {
    window.Theme.bindEvents();
  }
}

// Initialize menu show/hide toggle behaviour
window.Theme.Menu = window.Theme.Menu || {
  toggle: function () {
    $("html").on( "click", ".mobile-menu-toggle", function() {
      if ($('body').hasClass('active')) {
        Theme.$.header.removeClass('active');
        $('body').removeClass('active');
        $('.mobile-menu-toggle button').html(Theme.themeData.theme.menu_text);
      } else {
        Theme.$.header.addClass('active');
        $('body').addClass('active');
        $('.mobile-menu-toggle button').html('Close');
      }
    });
  }
};

// Initialize page type specific behaviour
window.Theme.Gallery = window.Theme.Gallery || {
  init: function () {
    this.respVideo();
  },
  respVideo: function () {
    $('main').fitVids();
  }
};


$(document).ready(function(){

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 50;
  var navbar = $('.header');
  var navbarHeight = navbar.outerHeight();

  $(window).scroll(function(event){
      didScroll = true;
  });

  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 0);

  function hasScrolled() {
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
          return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && !navbar.hasClass('active') && st > 0 ){
          // Scroll Down
          navbar.removeClass('nav-down').addClass('nav-up');
      } else {
          // Scroll Up
          if(st + $(window).height() < $(document).height()) {
              navbar.removeClass('nav-up').addClass('nav-down');
          }
      }

      lastScrollTop = st;
  }

  //Adjust top padding to nav height
  $('body').css('padding-top', navbarHeight);
  
  // Dropdown menus
  var dropdownTrigger = $('.dropdown-trigger'),
      dropdown = $('.dropdown');

  dropdownTrigger.click(function(){
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $(this).siblings(dropdown).removeClass('open');
      $(this).children('.plus').html('+');
    } else {
      $(this).addClass('open');
      $(this).siblings(dropdown).addClass('open');
      $(this).children('.plus').html('–');
    }
  });


  // Lightbox
  

  if (!($('body').hasClass('blog'))) {
    $("a[rel='lightbox']").fancybox({
      beforeShow: function (instance, slide) {
        $('.fancybox-bg').css('background-color', slide.opts.color);
      },

      // Enable infinite gallery navigation
      loop : true,

      // Space around image, ignored if zoomed-in or viewport width is smaller than 800px
      margin : [50, 0],

      // Horizontal space between slides
      gutter : 50,

      // Enable keyboard navigation
      keyboard : true,

      // Should display navigation arrows at the screen edges
      arrows : true,

      // Should display infobar (counter and arrows at the top)
      infobar : true,

      // Should display toolbar (buttons at the top)
      toolbar : true,

      // What buttons should appear in the top right corner.
      // Buttons will be created using templates from `btnTpl` option
      // and they will be placed into toolbar (class="fancybox-toolbar"` element)
      buttons : [
          'close'
      ],

      // Default content type if cannot be detected automatically
      defaultType : 'image',

      // Open/close animation type
      // Possible values:
      //   false            - disable
      //   "zoom"           - zoom images from/to thumbnail
      //   "fade"
      //   "zoom-in-out"
      //
      animationEffect : "zoom",

      // Duration in ms for open/close animation
      animationDuration : 600,

      // Transition effect between slides
      //
      // Possible values:
      //   false            - disable
      //   "fade'
      //   "slide'
      //   "circular'
      //   "tube'
      //   "zoom-in-out'
      //   "rotate'
      //
      transitionEffect : "fade",

      // Duration in ms for transition animation
      transitionDuration : 600,

      btnTpl : {
          // Arrows
          arrowLeft : '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
                          '<svg viewBox="0 0 40 40">' +
                            '<path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path>' +
                          '</svg>' +
                        '</button>',

          arrowRight : '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
                        '<svg viewBox="0 0 40 40">' +
                          '<path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path>' +
                        '</svg>' +
                      '</button>'
      },


      // Interaction
      // ===========

      // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
      // each option can be string or method that returns value.
      //
      // Possible values:
      //   "close"           - close instance
      //   "next"            - move to next gallery item
      //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
      //   "toggleControls"  - show/hide controls
      //   "zoom"            - zoom image (if loaded)
      //   false             - do nothing

      // Clicked on the content
      clickContent : function( current, event ) {
        return current.type === 'image' ? 'next' : false;
      },
    });
  }
  
  


  // Video overlays
  var video = $('.video'),
      videoOverlay = $('.video-overlay');

  videoOverlay.click(function(e){
    e.preventDefault();
    $(this).parent().parent('.video').addClass('playing');
    $(this).parent().parent('.video').find("iframe")[0].src += "&autoplay=1";
  });
});


$(window).on("load", function () {
  Theme.Turbolinks.onPageLoad();
});

// Initialize object on DOM load
$(document).on('DOMContentLoaded', function () {
  Theme.init();
});
