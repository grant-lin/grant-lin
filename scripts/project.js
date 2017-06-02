$(document).ready(function(){
  console.log('working');
  /*==========================================================================
       Individual Project Navigation
    ==========================================================================*/
  $(window).scroll(function(e) {
    var _scrolled = $(window).scrollTop();
    console.log('_scrolled is ' + _scrolled);
    var _projectBodyTop = $('.project-body').offset().top;
    console.log('_projectBodyTop is ' + _projectBodyTop);
    var _navHeight = $('aside.project-nav').height();
    console.log('_navHeight is ' + _navHeight);
    var _projectBodyBottom = $('.project-body').offset().top + $('.project-body').height() - _navHeight - 38;
    console.log('_projectBodyBottom is ' + _projectBodyBottom);

    if (_scrolled >= _projectBodyTop && _scrolled < _projectBodyBottom) {
      $('aside.project-nav').removeClass('is-fixed-end').addClass('is-fixed');
      $('aside.project-nav').fadeIn(500);
      console.log('1');
    } else if (_scrolled >= _projectBodyBottom) {
      $('aside.project-nav').removeClass('is-fixed').addClass('is-fixed-end');
      $('aside.project-nav').fadeOut(500);
      console.log('2');
    } else {
      $('aside.project-nav').removeClass('is-fixed');
      console.log('3');
    }
  });

});