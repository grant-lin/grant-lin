
$(document).ready(function(){

  /*==========================================================================
     Hamburger Menu
  ==========================================================================*/

  //why does this decrease the clickable area of hamburger-menu?
  $('.hamburger-menu').click( function() {
      event.preventDefault();
      $('.bar').toggleClass('animate');
      $('header nav ul').slideToggle();
      //need to add a line to auto scroll browser to the top
      window.scrollTo(0, 0);
    });

  /*==========================================================================
     Heart Drop Interaction
  ==========================================================================*/

  //when cursor moves on the container, have the svg follow the cursor
  $('#hero-img-container').mousemove(function(e) {
    var _cursorParentOffset = $('#hero-img-container').offset(); 
    $('#handCursor').css(
      'transform', 'translate(' + [e.clientX - _cursorParentOffset.left] +'px,' + [e.clientY - _cursorParentOffset.top - 25] + 'px)'
    );
    $('#handCursorHold').css(
      'transform', 'translate(' + [e.clientX - _cursorParentOffset.left] +'px,' + [e.clientY - _cursorParentOffset.top - 25] + 'px)'
    );
  });

  //when cursor is over the container, show the svg. 
  $('#hero-img-container').mouseover(function() {
    $('#handCursor').show();
  });

  //when cursor leaves the container, hide svg.
  $('#hero-img-container').mouseout(function() {
    $('#handCursor').hide();
  });

  //on mouse down, switch svg and clone heart.
  $('#hero-img-container').mousedown(function(e) {
    $('#handCursor').hide();
    $('#handCursorHold').show();
    var makeHeart = $('#heart').clone().removeAttr('id').show();
    //get where the current hero img container is relative to the screen
    var _cursorParentOffset = $('#hero-img-container').offset(); 
    makeHeart.appendTo('#hero-img-container').show().css({
      //add the amount of scroll from the top of the document if user isn't clicking at the top scroll position
      'top': [e.clientY - _cursorParentOffset.top + $(document).scrollTop()] + 'px',
      'left': [e.clientX - _cursorParentOffset.left - 10] + 'px'
    });
  });

  //on mouse up, switch svg.
  $('#hero-img-container').mouseup(function() {
    $('#handCursorHold').hide();
    $('#handCursor').show();
  });

  //if user resizes the window, get rid of the hearts except for the first one (template)
  $(window).resize(function() {
    $('.heart').not(':first').remove();
  }); 

  /*==========================================================================
     Section Navigation -- Dot Nav
  ==========================================================================*/

  //get the array of section nav anchor
  var sectionNavAnchors = $('.section-nav').find('a');
  //transform sectionNavAnchors array to sectionNavIds Array
  var sectionNavIds = sectionNavAnchors.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
  });
  $('.section-nav li').click(function(){
    //using $ here to denote a variable that is jQuery-wrapped
    $this = $(this),
    $siblings = $this.siblings();
    
    $this.addClass('is-active');
    // $siblings.removeClass('is-active');
  })

  //fade in or fade out section nav
  $(window).scroll(function(e) {
    //the following variable are nested to ensure correct scroll position for hiding
    //breakpoint for showing section nav
    var activate = $('#projects-container section').first().offset().top - $('#projects-container section').first().height()/3;
    //breakpoint for showing section nav
    var end = $('#projects-container section').last().offset().top + $('#projects-container section').last().height()/2;
    var _scrolled = $(window).scrollTop();
    if (_scrolled >= activate && _scrolled <= end) {
      $('.section-nav').fadeIn();
    } else if (_scrolled > end) {
      console.log('need to fadeOut');
      $('.section-nav').fadeOut();
    } else if (_scrolled < activate) {
      $('.section-nav').hide();
    }

    // highlight current tab
    // Get id of current scroll item
    var cur = sectionNavIds.map(function(){
     if ($(this).offset().top < _scrolled + 200)
       return this;
    });
    // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";
     // Set/remove active class
     sectionNavAnchors
     .parent().removeClass('is-active')
     .end().filter("[href='#"+id+"']").parent().addClass('is-active');

  });

  //need to fix
  //on mouseover, show tag
  $('.section-nav li').mouseover(function() {
    $(this).find('a').css({
    'visibility': 'visible',
    'opacity': 1,
    'transform': 'translate(15%, -50%)'
    });
    $(this).addClass('is-active');
  });

  //need to fix
  //on mouseout, hide tag
  $('.section-nav li').mouseout(function() {
    $(this).find('a').css({
    'visibility': 'hidden',
    'opacity': 0,
    'transform': 'translate(10%, -50%)'
    });
    var _curr = $(window).scrollTop();
    //#project-no.
    var _targetSectionId = $(this).find('a').attr('href');
    var _targetSectionTop = $(_targetSectionId).offset().top;
    var _targetSectionHeight = $(_targetSectionId).height();
    if (_curr >= _targetSectionTop && _curr < _targetSectionTop + _targetSectionHeight) {
      return;
    } else {
      $(this).removeClass('is-active');
    }
  });

  //on clicking link, smooth scroll to respective id
  $('a[href^="#"]').click(function() {
    event.preventDefault();
    var _id = $(this).attr('href');
    console.log(_id);
    $('body, html').animate({scrollTop: $(_id).offset().top + 1}, 900, 'swing');
    $(this).closest('li').addClass('is-active');
  });

  $('.section-nav li').click(function() {
    console.log('going somewhere');
    event.preventDefault();
    var _id = $(this).find('a').attr('href');
    console.log(_id);
    $('body, html').animate({scrollTop: $(_id).offset().top + 1}, 900, 'swing');
    $(this).addClass('is-active');
  });
  /*==========================================================================
     Candy Basket Parallax Scroll
  ==========================================================================*/

  //set the orignal top value of each candy
  var defaultWiggle1Top = parseFloat($('#wiggle-1').css('top'));
  var defaultWiggle2Top = parseFloat($('#wiggle-2').css('top'));
  var defaultDonut1Top = parseFloat($('#donut-1').css('top'));
  var defaultDonut2Top = parseFloat($('#donut-2').css('top'));
  var defaultPill1Top = parseFloat($('#pill-1').css('top'));
  var defaultPill2Top = parseFloat($('#pill-2').css('top'));


  $(window).scroll(function(e) {
    var _scrolled = $(window).scrollTop();
    
    var moveCandy = function(idString, defaultTop, speed) {
    $(idString).css('top', defaultTop + _scrolled*speed + "px");
    };
    //for each wiggle svg, change the css to this calculation
    moveCandy('#wiggle-1', defaultWiggle1Top, 0.5);
    moveCandy('#wiggle-2', defaultWiggle2Top, 0.5);
    moveCandy('#donut-1', defaultDonut1Top, 0.3);
    moveCandy('#donut-2', defaultDonut2Top, 0.3);
    moveCandy('#pill-1', defaultPill1Top, 0.1);
    moveCandy('#pill-2', defaultPill2Top, 0.1);

  });


});

