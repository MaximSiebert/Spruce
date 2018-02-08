// Create Theme JS

window.Theme = window.Theme || {
  $: {
    container: $('.container'),
    header: $('.header'),
    menuToggle: $('.mobile-menu-toggle'),
  },
  themeData: _4ORMAT_DATA,
  init: function () {
    this.Menu.toggle();
    this.Turbolinks.init();
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
    this.Menu.toggle();
  },
  onBeforeChange: function (e) {
    e.preventDefault();
    $("body").addClass("is-changing");
    Turbolinks.visit(e.originalEvent.data.url);
    console.log('onBeforeChange');
  },
  onUpdate: function (e) {
    console.log('onUpdate');
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
    Theme.$.container.fitVids();
  }
};

// Initialize object on DOM load
$(document).on('DOMContentLoaded', function () {
  Theme.init();
});

$(window).on("load", function () {
  Theme.Turbolinks.onPageLoad();
});


$(document).ready(function(){

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

  video.click(function(e){
    $(this).addClass('playing');
    $(this).find("iframe")[0].src += "&autoplay=1";
    e.preventDefault();
  });
});
