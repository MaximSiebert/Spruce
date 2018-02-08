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
    $('.mobile-menu-toggle').on("click", this.Menu.toggle);
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
    $(window).on("page:before-unload", this.onBeforeUnload.bind(this));
    $(window).on("page:restore", this.onRestore.bind(this));
  },
  onBeforeUnload: function (e) {
    $("body").removeClass("is-changing");
    console.log('onBeforeUnload');
  },
  onPageLoad: function (e) {
    console.log('onPageLoad');
  },
  onBeforeChange: function (e) {
    e.preventDefault();
    $("body").addClass("is-changing");
    Turbolinks.visit(e.originalEvent.data.url);
    console.log('onBeforeChange');
  },
  onUpdate: function (e) {
    console.log('onUpdate');
    window.Theme.reload();
  },
  onRestore: function (e) {
    console.log('onRestore');
    window.Theme.bindEvents();
  }
}

// Initialize menu show/hide toggle behaviour
window.Theme.Menu = window.Theme.Menu || {
  toggle: function () {
    Theme.$.menuToggle.on('click', function() {
      Theme.$.header.toggleClass('active');
      $('body').toggleClass('active');
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
  var delta = 0;
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
      if (st > lastScrollTop && !navbar.hasClass('active') ){
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

  // Dropdown menus
  var dropdownTrigger = $('.dropdown-trigger'),
      dropdown = $('.dropdown');

  dropdownTrigger.click(function(){
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $(this).siblings(dropdown).removeClass('open');
    } else {
      $(this).addClass('open');
      $(this).siblings(dropdown).addClass('open');
    }
  });


  // Lightbox
  $('a[rel="lightbox"]').fluidbox();

  $('a[rel="lightbox"]').click(function(e) {
    e.preventDefault();
    var color = $(this).data('color');
    $('.fluidbox__overlay').css('background-color', color);
  });


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
