/* ====================================
   Onload functions
   ==================================== */
   //
   //
  //  var mainContent = document.querySelector('.main-content');
  //  var gradientCanvas = document.createElement('canvas');
  //  var gradientCanvasContext = gradientCanvas.getContext('2d');
  //  var lineCanvas = document.createElement('canvas');
  //  var lineCanvasContext = lineCanvas.getContext('2d');
  //  var pointLifetime = 1000;
  //  var points = [];
   //
  //  start();
   //
  //  /**
  //   * Attaches event listeners and starts the effect.
  //   */
  //  function start() {
  //    document.addEventListener('mousemove', onMouseMove);
  //    window.addEventListener('resize', resizeCanvases);
  //    mainContent.appendChild(gradientCanvas);
  //    resizeCanvases();
  //    tick();
  //  }
   //
  //  /**
  //   * Records the user's cursor position.
  //   *
  //   * @param {!MouseEvent} event
  //   */
  //  function onMouseMove(event) {
  //    points.push({
  //      time: Date.now(),
  //      x: event.clientX,
  //      y: event.clientY
  //    });
  //  }
   //
  //  /**
  //   * Resizes both canvases to fill the window.
  //   */
  //  function resizeCanvases() {
  //    gradientCanvas.width = lineCanvas.width = window.innerWidth;
  //    gradientCanvas.height = lineCanvas.height = window.innerHeight;
  //  }
   //
  //  /**
  //   * The main loop, called at ~60hz.
  //   */
  //  function tick() {
  //    // Remove old points
  //    points = points.filter(function(point) {
  //      var age = Date.now() - point.time;
  //      return age < pointLifetime;
  //    });
   //
  //    drawLineCanvas();
  //    drawImageCanvas();
  //    requestAnimationFrame(tick);
  //  }
   //
  //  /**
  //   * Draws a line using the recorded cursor positions.
  //   *
  //   * This line is used to mask the original image.
  //   */
  //  function drawLineCanvas() {
  //    var minimumLineWidth = 60;
  //    var maximumLineWidth = 100;
  //    var lineWidthRange = maximumLineWidth - minimumLineWidth;
  //    var maximumSpeed = 150;
   //
  //    lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
  //    lineCanvasContext.lineCap = 'round';
  //    lineCanvasContext.shadowBlur = 40;
  //    lineCanvasContext.shadowColor = '#000';
   //
  //    for (var i = 1; i < points.length; i++) {
  //      var point = points[i];
  //      var previousPoint = points[i - 1];
   //
  //      // Change line width based on speed
  //      var distance = getDistanceBetween(point, previousPoint);
  //      var speed = Math.max(0, Math.min(maximumSpeed, distance));
  //      var percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
  //      lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;
   //
  //      // Fade points as they age
  //      var age = Date.now() - point.time;
  //      var opacity = (pointLifetime - age) / pointLifetime;
  //      lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';
   //
  //      lineCanvasContext.beginPath();
  //      lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
  //      lineCanvasContext.lineTo(point.x, point.y);
  //      lineCanvasContext.stroke();
  //    }
  //  }
   //
  //  /**
  //   * @param {{x: number, y: number}} a
  //   * @param {{x: number, y: number}} b
  //   * @return {number} The distance between points a and b
  //   */
  //  function getDistanceBetween(a, b) {
  //    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  //  }
   //
  //  /**
  //   * Draws the original image, masked by the line drawn in drawLineToCanvas.
  //   */
   //
   //
  //  function drawImageCanvas() {
   //
  //    var width = window.innerWidth;
  //    var height = window.innerHeight;
   //
  //    gradientCanvasContext.clearRect(0, 0, gradientCanvas.width, gradientCanvas.height);
  //    gradientCanvasContext.globalCompositeOperation = 'source-over';
  //    gradientCanvasContext.fillRect(0, 0, width, height);
   //
  //    var grd = gradientCanvasContext.createLinearGradient(0,0,width,0);
  //    grd.addColorStop(0,"#f2f7f9");
  //    grd.addColorStop(1,"#f7f6f2");
   //
  //    gradientCanvasContext.fillStyle = grd;
   //
  //    gradientCanvasContext.globalCompositeOperation = 'destination-in';
  //    gradientCanvasContext.drawImage(lineCanvas, 0, 0);
  //  }





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
      // var speed = -distanceToBottom / 2;
      var speed = (distanceToBottom / 100).toFixed(2);
      if(speed < 1) {
        $('.section-bg').css('opacity', speed);
      }

    }
  };

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

  // aeApp.slickSlider = function(){
  //     $('.slider-a').slick({
  //       dots: false,
  //       autoplay: true,
  //       arrows: false,
  //       fade: true,
  //       pauseOnHover: false,
  //       speed: 300,
  //       infinite: true,
  //       slidesToShow: 1,
  //       slidesToScroll: 1
  //     });
  //
  //     $('.slider-b').slick({
  //       dots: false,
  //       autoplay: true,
  //       arrows: false,
  //       fade: true,
  //       pauseOnHover: false,
  //       speed: 300,
  //       infinite: true,
  //       slidesToShow: 1,
  //       slidesToScroll: 1
  //     });
  // };

  // Define load object
  aeApp.onload = function() {
    // aeApp.videoControls();
    // aeApp.playReel();
    // aeApp.slickSlider();
    aeApp.hamburgerNav();
    aeApp.scrollThings();
  };

  (function($, window, document) {
    aeApp.onload();

    var waypoint = new Waypoint({
      element: document.getElementById('work'),
      handler: function(direction) {
        console.log('Scrolled to waypoint!')
      }
    })




    // require([
    //   'lib/waypoints',
    //   'lib/waypoints.inview'
    // ], function () {
    //   'use strict';
    //   var parallaxes = 0;
    //
    //   function Parallax(trigger) {
    //     var parent;
    //
    //     function getTriggerId() {
    //       return trigger.getAttribute('id');
    //     }
    //
    //     if (getTriggerId() === null) {
    //       trigger.setAttribute('id', 'waypoint-' + parallaxes);
    //       parallaxes += 1;
    //     }
    //
    //     parent = document.getElementById(getTriggerId());
    //
    //     if (!parent) {return false;}
    //
    //     var delta;
    //     var parallaxCount;
    //     var parallaxing;
    //     var body;
    //     var container;
    //     var layerBack;
    //     var layerFront;
    //
    //     function isScrolling(back, front) {
    //       // back.style.transform = 'translateY(' + (parallaxCount * 10) + '%)';
    //       front.style.transform = 'translateY(' + (parallaxCount * 300) + '%)';
    //     }
    //
    //     parallaxCount = 0;
    //     parallaxing = false;
    //     body = document.body;
    //     container = parent;
    //     layerBack = container.querySelector('.Parallax-layer--back');
    //     layerFront = container.querySelector('.Parallax-layer--front');
    //
    //     var layerFrontHeight = (layerFront.clientHeight);
    //     var topPosition = ((layerFrontHeight / 2) * -1);
    //     // layerFront.style.top = '50%';
    //     // layerFront.style.bottom = topPosition + 'px';
    //     layerFront.style.bottom = topPosition + 'px';
    //
    //     window.addEventListener('mousewheel', function (e) {
    //       delta = e.wheelDelta < 0
    //         ? 'down'
    //         : 'up';
    //     });
    //
    //     window.addEventListener('scroll', function () {
    //       var top = body.scrollTop;
    //       var height = window.innerHeight - body.clientHeight;
    //       var scrollPosition = Math.abs(top / height);
    //
    //       parallaxCount = scrollPosition * -1;
    //
    //       if (parallaxing === true) {
    //         if (delta === 'up') {
    //           isScrolling(layerBack, layerFront);
    //         }
    //         else if (delta === 'down') {
    //           isScrolling(layerBack, layerFront);
    //         }
    //       }
    //     });
    //
    //     var waypoint = new Waypoint.Inview({
    //       element: container,
    //       enter: function () {
    //         parallaxing = true;
    //       },
    //       exited: function () {
    //         parallaxing = false;
    //       }
    //     });
    //   }
    //
    //   var parallaxTriggers = document.querySelectorAll('.parallax-trigger');
    //
    //   // convert nodelist to array
    //   var parallaxTriggerArray = Array.prototype.slice.call(parallaxTriggers);
    //
    //   parallaxTriggerArray.forEach(function (waypoint) {
    //     Parallax(waypoint);
    //   });
    // });














  }(window.jQuery, window, document));
