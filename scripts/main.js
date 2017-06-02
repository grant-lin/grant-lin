
$(document).ready(function(){
  //check if current screen is mobile
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
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
    //if it's not mobile browser
    if(!isMobile) {
      var _cursorParentOffset = $('#hero-img-container').offset(); 
      $('#handCursor').css(
        'transform', 'translate(' + [e.clientX - _cursorParentOffset.left] +'px,' + [e.clientY - _cursorParentOffset.top - 25] + 'px)'
      );
      $('#handCursorHold').css(
        'transform', 'translate(' + [e.clientX - _cursorParentOffset.left] +'px,' + [e.clientY - _cursorParentOffset.top - 25] + 'px)'
      );
    }

  });

  //when cursor is over the container, show the svg. 
  $('#hero-img-container').mouseover(function() {
    //if it's not mobile browser
    if(!isMobile) {
      $('#handCursor').show();
    }
  });

  //when cursor leaves the container, hide svg.
  $('#hero-img-container').mouseout(function() {
    //if it's not mobile browser
    if(!isMobile) {
      $('#handCursor').hide();
    }
  });

  //on mouse down, switch svg and clone heart.
  $('#hero-img-container').mousedown(function(e) {
    //if it's not mobile browser
    if(!isMobile) {
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
    }
  });

  //on mouse up, switch svg.
  $('#hero-img-container').mouseup(function() {
    //if it's not mobile browser
    if(!isMobile) {
      $('#handCursorHold').hide();
      $('#handCursor').show();
    }
  });

  //if user resizes the window, get rid of the hearts except for the first one (template)
  $(window).resize(function() {
    //if it's not mobile browser
    if(!isMobile) {
      $('.heart').not(':first').remove(); 
    }
  }); 

  /*==========================================================================
     Section Navigation -- Dot Nav + Project Blurb
  ==========================================================================*/

  //get the array of section nav anchor
  var sectionNavAnchors = $('.section-nav').find('a');
  //transform sectionNavAnchors array to sectionNavIds Array
  var sectionNavIds = sectionNavAnchors.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
  });
  var sectionBlurbs = $('#projects-container').find('.project-blurb');
  console.log('sectionBlurbs is ' + sectionBlurbs);
  $('.section-nav li').click(function(){
    //using $ here to denote a variable that is jQuery-wrapped
    $this = $(this),
    $siblings = $this.siblings();
    
    $this.addClass('is-active');
    // $siblings.removeClass('is-active');
  })

    var activate = $('#projects-container section').first().offset().top - $('#projects-container section').first().height()/3;
    //breakpoint for showing section nav
    var end = $('#projects-container section').last().offset().top + $('#projects-container section').last().height()/2;
    //current scrolled to section id
    var currId;

  //fade in or fade out section nav
  $(window).scroll(function(e) {
    //if it's not mobile browser
    if(!isMobile) {
      //the following variable are nested to ensure correct scroll position for hiding
      //breakpoint for showing section nav
      var _scrolled = $(window).scrollTop();
      if (_scrolled >= activate && _scrolled <= end) {
        $('.section-nav').fadeIn();
      } else if (_scrolled > end) {
        console.log('need to fadeOut');
        $('.section-nav').fadeOut();
      } else if (_scrolled < activate) {
        $('.section-nav').fadeOut();
      }

      // highlight current tab
      // Get id of current scroll item
      var cur = sectionNavIds.map(function(){
       if ($(this).offset().top < _scrolled + 200)
         return this;
      });
      // Get the id of the current element
       cur = cur[cur.length-1];
       currId = cur && cur.length ? cur[0].id : "";
       console.log ('current id is ' + currId);

       // Set/remove active class
       sectionNavAnchors
       //remove the is-active class of all the parents of the anchors (aka li's)
       .parent().removeClass('is-active')
       //filter the current li and add the is-active class
       .end().filter("[href='#"+currId+"']").parent().addClass('is-active');

       sectionBlurbs.removeClass('is-active');
       //exact syntax is important in the following line
       sectionBlurbs.parent().filter("div [id='" + currId + "']").children().addClass('is-active');
     } 
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
    var scrolled = $(window).scrollTop();
    var moveCandy = function(idString, defaultTop, speed) {
    $(idString).css('top', defaultTop + scrolled*speed + "px");
    };
    //for each wiggle svg, change the css to this calculation
    console.log('moving candies');
    moveCandy('#wiggle-1', defaultWiggle1Top, 0.5);
    moveCandy('#wiggle-2', defaultWiggle2Top, 0.5);
    moveCandy('#donut-1', defaultDonut1Top, 0.3);
    moveCandy('#donut-2', defaultDonut2Top, 0.3);
    moveCandy('#pill-1', defaultPill1Top, 0.1);
    moveCandy('#pill-2', defaultPill2Top, 0.1);

  });

/*==========================================================================
     Project Blurb Parallax Scroll
  ==========================================================================*/
  // var firstProjectOffsetTop = $('#projects-container section').first().offset().top;
  // console.log ('first project is' + firstProjectOffsetTop);
  // var blurbBottom = Math.floor($('.project-blurb').css('bottom').replace(/[^-\d\.]/g, ''));
  // $(window).scroll(function(e) {
  //   //if the scrolled position is greater than the first project position
  //   var scrolled = $(window).scrollTop();
  //   console.log('scrolling');
  //   console.log ('scrolled is ' + scrolled);
  //   if (scrolled > firstProjectOffsetTop) {
  //     console.log('SCROLL PASSSED');
  //     console.log('blurbBottom is ' + blurbBottom);
  //     var moveBlurb = function(idString, defaultBottom, speed) {
  //       //this need to be fixes
  //       console.log('scrolled*speed is ' + scrolled*speed);
  //       var newBottom = defaultBottom + scrolled*speed;
  //     $(idString).css('bottom', newBottom + "px");
  //     console.log('new bottom is ' + newBottom + "px");
  //     };
  //     //for each wiggle svg, change the css to this calculation
  //     var blurbToMoveId = '#' + id + ' .project-blurb';
  //     console.log('moving ' + id);
  //     moveBlurb( blurbToMoveId, blurbBottom, 0.1);
  //   }
  // });

});

