$(function() {
  var bg = $('#project-1');
  var backgrounds = new Array(
   'url(images/project-1-splash.jpg)',
   'url(images/project-1-splash2.jpg)',
   'url(images/project-1-splash3.jpg)'
  );

  var current = 0;

  function nextBackground() {
    bg.css(
     'background-image',
      backgrounds[current = ++current % backgrounds.length]
    );

    setTimeout(nextBackground, 5000);
  }
setTimeout(nextBackground, 5000);
});

$(function() {
  var bg = $('#project-2');
  var backgrounds = new Array(
   'url(images/project-2-splash.jpg)',
   'url(images/project-2-splash2.jpg)',
   'url(images/project-2-splash3.jpg)'
  );

  var current = 0;

  function nextBackground() {
    bg.css(
     'background-image',
      backgrounds[current = ++current % backgrounds.length]
    );

    setTimeout(nextBackground, 5000);
  }
setTimeout(nextBackground, 5000);
});