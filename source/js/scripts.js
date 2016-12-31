/* ====================================
   Onload functions
   ==================================== */

var aeApp = aeApp || {};

  aeApp.videoControls = function(){
    $('.portfolio-video').hover(function toggleControls() {
      if (this.hasAttribute("controls")) {
          this.removeAttribute("controls")
      } else {
          this.setAttribute("controls", "controls")
      }
    });

    $('.portfolio-video').click(function(){
      $(this).get(0).play();
    });

    $('.portfolio-video').click(function(){
        $(this).play();
    },false);
  };


  aeApp.playReel = function(){
    // hide cover play reel on click
    $('.intro').click(function(e){
      e.preventDefault();
      if ($('.intro').hasClass('active-reel')) {

      } else {
        $('.intro').addClass('active-reel');
        $('#hero-reel').get(0).play();
      }
    });

    $('.play-reel').hover(function(e){
      $(this).addClass('active');
    }, function(){
      $(this).removeClass('active');
    });

    // follow mouse cursor
    // $('.intro').on('mousemove', function(e){
    //   const xPos = e.pageX;
    //   const yPos = e.pageY;
    //   $('#desktop-play-reel').css({ left: xPos, top: yPos });
    // });

    // Show play button on hover
    // $('.intro').hover(function(){
    //   $('#desktop-play-reel').addClass('active');
    // }, () => {
    //   $('#desktop-play-reel').removeClass('active');
    // });
  };

  aeApp.slickSlider = function(){
      $('.slider-a').slick({
        dots: false,
        autoplay: true,
        arrows: false,
        fade: true,
        pauseOnHover: false,
        speed: 300,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });

      $('.slider-b').slick({
        dots: false,
        autoplay: true,
        arrows: false,
        fade: true,
        pauseOnHover: false,
        speed: 300,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });
  };

  // Define load object
  aeApp.onload = function() {
    aeApp.videoControls();
    aeApp.playReel();
    aeApp.slickSlider();
  };

  (function($, window, document) {
    aeApp.onload();

  }(window.jQuery, window, document));
