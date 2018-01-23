// Create Theme JS

window.Theme = window.Theme || {
  $: {
    container: $('.container'),
    header: $('.header'),
    menuToggle: $('.mobile-menu-toggle'),
  },
  themeData: _4ORMAT_DATA,
  init: function () {
    this.initJSForPageType();
    this.Menu.toggle();
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

// Initialize menu show/hide toggle behaviour

window.Theme.Menu = window.Theme.Menu || {
  toggle: function () {
    Theme.$.menuToggle.on('click', function() {
      Theme.$.header.toggleClass('active');
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
