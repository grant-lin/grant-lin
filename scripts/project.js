$(document).ready(function(){
  console.log('working');
  //check if current screen is mobile
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
  /*==========================================================================
     Hamburger Menu
  ==========================================================================*/

  //why does this decrease the clickable area of hamburger-menu?
  $('.hamburger-menu').click( function() {
      console.log('hamburger-menu clicked');
      event.preventDefault();
      $('.bar').toggleClass('animate');
      $('header nav ul').slideToggle();
      //need to add a line to auto scroll browser to the top
      window.scrollTo(0, 0);
    });
  /*==========================================================================
       Individual Project Navigation
  ==========================================================================*/
  $(window).scroll(function(e) {
    var _scrolled = $(window).scrollTop();
    console.log('_scrolled is ' + _scrolled);
    var _projectBodyTop = $('.project-body').offset().top;
    console.log('_projectBodyTop is ' + _projectBodyTop);
    var _navHeight = $('nav.project-nav').height();
    console.log('_navHeight is ' + _navHeight);
    var _projectBodyBottom = $('.project-body').offset().top + $('.project-body').height() - _navHeight - 38;
    console.log('_projectBodyBottom is ' + _projectBodyBottom);

    if (_scrolled >= _projectBodyTop && _scrolled < _projectBodyBottom) {
      $('nav.project-nav').removeClass('is-fixed-end').addClass('is-fixed');
      $('nav.project-nav').fadeIn(500);
      console.log('1');
    } else if (_scrolled >= _projectBodyBottom) {
      $('nav.project-nav').removeClass('is-fixed').addClass('is-fixed-end');
      $('nav.project-nav').fadeOut(500);
      console.log('2');
    } else {
      $('nav.project-nav').removeClass('is-fixed');
      console.log('3');
    }
  });

    //on clicking link, smooth scroll to respective id
  $('a[href^="#"]').click(function() {
    event.preventDefault();
    var _id = $(this).attr('href');
    console.log(_id);
    $('body, html').animate({scrollTop: $(_id).offset().top + 2}, 900, 'swing');
  });

  //adding is-active to active nav link
  //get the array of project nav anchors
  var projectNavAnchors = $('.project-nav').find('a');
  //transform projectNavAnchors array to sectionNavIds Array
  var projectNavIds = projectNavAnchors.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
  });
  var currId;


    //highlight current sec-#
    $(window).scroll(function(e) {
    //if it's not mobile browser
    if(!isMobile) {
      // highlight current tab
      // Get id of current scroll item
      var _scrolled = $(window).scrollTop();
      var cur = projectNavIds.map(function(){
       if ($(this).offset().top < _scrolled)
         return this;
      });
      // Get the id of the current element
       cur = cur[cur.length-1];
       currId = cur && cur.length ? cur[0].id : "";
       console.log ('current id is ' + currId);

       // Set/remove active class
       projectNavAnchors
       //remove the is-active class of all the parents of the anchors (aka li's)
       .parent().removeClass('is-active')
       //filter the current li and add the is-active class
       .end().filter("[href='#"+currId+"']").parent().addClass('is-active');
     } 
  });

  /*==========================================================================
       Project Carousel
  ==========================================================================*/
  $('.project-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.project-carousel-nav'
  });
  $('.project-carousel-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.project-carousel',
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    arrows: true,
    variableWidth: true
  });

});