/* ====================================
   Onload functions
   ==================================== */

var aeApp = aeApp || {};

  aeApp.hamburgerNav = function(){
      $('.hamburger').click(function(e){
        e.preventDefault();
        if($('body').hasClass('activeNav')){
          $('body').removeClass('activeNav');
        } else {
          $('body').addClass('activeNav');
        }
      });
      $('.nav-work').click(function(e){
        if($('body').has('.home-page')){
          $('body').removeClass('activeNav');
        }
      });
  };

  aeApp.scrollThings = function(){
    window.onscroll = function(e) {
      var scrollPosition = window.pageYOffset;
      var windowSize     = window.innerHeight;
      var bodyHeight     = document.body.offsetHeight + 634;
      var distanceToBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0);
      var speed = (distanceToBottom / 100).toFixed(2);
      if(speed < 1) {
        $('.section-bg').css('opacity', speed)
      } else {
        $('.section-bg').css('opacity', 1);
      }
      var opacity = 1 - scrollPosition * .01;

      if (scrollPosition <= 100) {
        $('.site-intro').css({
          'opacity': opacity,
          'visibility': 'visible'
        });
      } else if (scrollPosition > 100) {
        $('.site-intro').css({
          'opacity': 0,
          'visibility': 'hidden'
        });
      }
    }
  };

  // Define load object
  aeApp.onload = function() {
    aeApp.hamburgerNav();
    aeApp.scrollThings();
  };

  (function($, window, document) {
    aeApp.onload();


    var primaryVideo;
    var inview;
    var portfolioVideo;
    var portfolioVideoContainer;

    if (document.querySelector('.primary-video')) {
      primaryVideo = document.querySelector('.primary-video');
      inview = new Waypoint.Inview({
        element: primaryVideo,
        enter: function () {
          if (document.querySelector('.hamburger').classList.contains('on')) {
            document.querySelector('.hamburger').classList.remove('on');
          }
        },
        exited: function () {
          document.querySelector('.hamburger').classList.add('on');
        }
      });
    }

    var portfolioVideoControls = function(){
      portfolioVideo = document.querySelector('.portfolio-video');
      portfolioVideoContainer = document.querySelector('.portfolio-video-container');
      portfolioVideoContainer.addEventListener('click', function(){
        if (!(portfolioVideo.paused || portfolioVideo.ended)) {
            portfolioVideo.pause();
            portfolioVideo.parentNode.classList.add('paused');
        } else {
          portfolioVideo.play();
          portfolioVideo.parentNode.classList.remove('paused');
        }
      });
      inview = new Waypoint.Inview({
        element: portfolioVideo,
        exited: function () {
          portfolioVideo.pause();
          portfolioVideo.parentNode.classList.add('paused');
        }
      });
    }

    if (document.querySelector('.portfolio-video')) {
      portfolioVideoControls();
    }


    var source,
        video,
        nextModule,
        nextSource,
        activeModule,
        lazyLoad,
        firstLazyLoad,
        source,
        thumbnailMoudule,
        credit,
        helfCredits;

    if (document.getElementsByClassName('lazy-load')[0]) {
      lazyLoad = document.getElementsByClassName('lazy-load');
      firstLazyLoad = document.getElementsByClassName('lazy-load')[0];
      if (firstLazyLoad.getElementsByTagName('video')[0]) {
        source = firstLazyLoad.getElementsByTagName('video')[0].getAttribute('data-src');
        firstLazyLoad.getElementsByTagName('video')[0].removeAttribute("data-src");
        firstLazyLoad.getElementsByTagName('video')[0].setAttribute('src', source);
      } else if ((firstLazyLoad.getElementsByTagName('img')[0])) {
        source = firstLazyLoad.getElementsByTagName('img')[0].getAttribute('data-src');
        firstLazyLoad.getElementsByTagName('img')[0].removeAttribute("data-src");
        firstLazyLoad.getElementsByTagName('img')[0].setAttribute('src', source);
      }
      for (var i = 0; i < lazyLoad.length; i++) {
        inview = new Waypoint.Inview({
          element: lazyLoad[i],
          enter: function(direction){
            activeModule = this.element;
            inViewPort(activeModule);
            if (activeModule.nextElementSibling) {
              if (activeModule.nextElementSibling.classList.contains('lazy-load')) {
                activeModule = activeModule.nextElementSibling;
                preloadNextUp(activeModule);
              }
            }
          },
          exited: function () {
            if (this.element.getElementsByTagName('video')[0]) {
              if (!(this.element.getElementsByTagName('video').paused || this.element.getElementsByTagName('video').ended)) {
                this.element.getElementsByTagName('video')[0].pause();
              }
            }
          }
        });
      }

      inViewPort = function(activeModule){
        if (activeModule.getElementsByTagName('video')[0]) {
          lazyLoadContent('video', activeModule);
        } else if (activeModule.getElementsByTagName('img')[0]) {
          lazyLoadContent('img', activeModule);
        }
        if(! activeModule.classList.contains('animate-in')){
          activeModule.classList.add('animate-in');
        }
      }

      var preloadNextUp = function(activeModule){
        if (activeModule.getElementsByTagName('video')[0]) {
          lazyLoadContent('video', activeModule);
        } else if (activeModule.getElementsByTagName('img')[0]) {
          lazyLoadContent('img', activeModule);
        }
      }
    }

    var lazyLoadContent = function(contentType, activeModule){
      if (activeModule.getElementsByTagName(contentType)){
        if (activeModule.getElementsByTagName(contentType)[0].getAttribute('data-src')) {
          source = activeModule.getElementsByTagName(contentType)[0].getAttribute('data-src');
          activeModule.getElementsByTagName(contentType)[0].removeAttribute('data-src');
          activeModule.getElementsByTagName(contentType)[0].setAttribute('src', source);
        }
        if (contentType === "video") {
          activeModule.getElementsByTagName(contentType)[0].play();
        }
      }
    }

    var caseStudyLinks;
    var alternatingPosts = function(){
      caseStudyLinks = document.querySelectorAll('.case-study-link');
      for (var i = 0; i < caseStudyLinks.length; i++) {
        if(i % 2 === 0) {
          caseStudyLinks[i].classList.add('right-img');
          caseStudyLinks[i].classList.remove('left-img');
          thumbnailMoudule = caseStudyLinks[i].querySelector('.title-and-thumbnail');
          thumbnailMoudule.classList.remove('offset-md-0');
          thumbnailMoudule.classList.add('offset-md-1');
          thumbnailMoudule.classList.add('order-last-md');
        }
      }
    };
    if (document.querySelector('.home-page') || document.querySelector('.info-page')) {
      alternatingPosts();
    }

    // move credits to two columns
    if (document.querySelectorAll('.credit')) {
      credit = document.querySelectorAll('.credit');
      halfCredits =  Math.ceil(credit.length / 2);
      for (var i = 0; i < credit.length; i++) {
        if (i >= halfCredits) {
          credit[i].remove();
          document.querySelector('.credits-row-two').appendChild(credit[i]);
        }
      }
    }

    var waypoint = new Waypoint({
      element: $('.section-change'),
      handler: function(direction) {
        if (direction == 'down') {
          $('.to-white').addClass('on');
        } else {
          $('.to-white').removeClass('on');
        }
      },
      offset: '50%'
    })

  }(window.jQuery, window, document));
