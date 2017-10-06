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

    $('.slider-review').slick({
      dots: false,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
      fade: true,
      pauseOnHover: false,
      speed: 400,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    });

    var totalReviews = $('.slider-review .slick-slide').length;
    var initalSlide = Math.floor(Math.random() * totalReviews);
    $(".slider-review").slick('slickGoTo', initalSlide);
  };

  aeApp.joinList = function(){
    $('.join-list').click(function(e){
      e.preventDefault();
      $('.subscribe').addClass('active');
    });
    $('.close-form').click(function(e){
      e.preventDefault();
      $('.subscribe').removeClass('active');
      $('.subscribe-result').remove();
    });
  }

  aeApp.joinWorkList = function(){
    $('.join-work-list').click(function(e){
      e.preventDefault();
      $('.work-with-us').addClass('active');
    });
    $('.close-form').click(function(e){
      e.preventDefault();
      $('.work-with-us').removeClass('active');
      $('.subscribe-result').remove();
    });
  }


  // Turn the given MailChimp form into an ajax version of it.
  // If resultElement is given, the subscribe result is set as html to
  // that element.




  function ajaxMailChimpForm($form, $resultElement) {

    // Hijack the submission. We'll submit the form manually.
    $form.submit(function(e) {
      e.preventDefault();
      if (!isValidEmail($form)) {
        var error = "A valid email address must be provided.";
        $resultElement.html(error);
      } else {
        $resultElement.css("color", "white");
        $resultElement.html("Subscribing...");
        submitSubscribeForm($form, $resultElement);
      }
    });
  }
  // Validate the email address in the form
  function isValidEmail($form) {
    // If email is empty, show error message.
    var email = $form.find("input[type='email']").val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ($form.hasClass('work-subscribe-form')) {
      var fname = $form.find("input[name='FNAME']").val();
      var lname = $form.find("input[name='LNAME']").val();
      if (!fname || !lname || !email) {
        if (!fname) {
          $form.find("input[name='FNAME']").addClass('error');
        } else {
          $form.find("input[name='FNAME']").removeClass('error');
        }
        if (!lname) {
          $form.find("input[name='LNAME']").addClass('error');
        } else {
          $form.find("input[name='LNAME']").removeClass('error');
        }
        if (!email) {
          $form.find("input[type='email']").addClass('error');
        }
      }
    }

    if (regex.test(email)) {
      return true;
    } else {
      return false;
    }
  }
  // Submit the form with an ajax/jsonp request.
  // Based on http://stackoverflow.com/a/15120409/215821
  function submitSubscribeForm($form, $resultElement) {
    $.ajax({
      type: "GET",
      url: $form.attr("action"),
      data: $form.serialize(),
      cache: false,
      dataType: "jsonp",
      jsonp: "c", // trigger MailChimp to return a JSONP response
      contentType: "application/json; charset=utf-8",
      error: function(error) {
        // According to jquery docs, this is never called for cross-domain JSONP requests
      },
      success: function(data) {

        if (data.result != "success") {
          var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
          $resultElement.css("color", "red");
          if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
            message = "You're already subscribed. Thank you.";
            $resultElement.css("color", "white");
          }
          $resultElement.html(message);
        } else {
          $resultElement.css("color", "white");
          $resultElement.html("Thank you!<br><br>You must confirm the subscription in your inbox.");

          setTimeout(function(){
            $('.subscribe').removeClass('active');
          }, 3000);

        }
      }
    });
  }




  // Define load object
  aeApp.onload = function() {
    aeApp.videoControls();
    aeApp.playReel();
    aeApp.slickSlider();
    aeApp.joinList();
    aeApp.joinWorkList();
    ajaxMailChimpForm($('.subscribe-form'),$('.subscribe-result'));
    ajaxMailChimpForm($('.work-subscribe-form'),$('.subscribe-result'));
  };

  (function($, window, document) {
    aeApp.onload();

  }(window.jQuery, window, document));
