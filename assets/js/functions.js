$( document ).ready(function() {
  smoothScroll(500);
  clickthroughGirl();
  heroParallax();
  adjustViewHero()
  girlSizing()
  focusSelectBtn();
});


$(window).scroll(function(){
  heroParallax()
  floatIn($('.map-img'))
  floatIn($('.bundle-img'))
});


$(window).on('resize', function(){
  girlSizing()
  adjustViewHero()
});

window.setInterval(function(){
  bundleImgChange()
}, 4000);


/**General***************************************/

//smooth scroling
function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}


//Scroll triggered object float-in
function floatIn(img){
    var wScroll = $(window).scrollTop();
    if(img.offset().top - $(window).height()/2 < wScroll +  $(window).height()/2) {
        img.css('transform', 'translateY(0)');
      }
}


/**Hero-section**********************************/

//view port adjust for portrait*landscape
function adjustViewHero(){

  var flexBox = $('header.hero .flex')

  if ( $(window).height() > $(window).width()) {
    flexBox.css('display', 'block');
  } else{
    flexBox.css('display', 'flex');
  }

}

//size girl according to port view
function girlSizing(){
  var wHeight = $(window).height();
  $('.para-girl').css('height',(wHeight * 0.90) + 'px');
  $('.para-girl').css('width',(wHeight * 1.5) + 'px');
}

//para-girl click through for IE
function clickthroughGirl(){

  $('.para-girl').on('mousemove click', function(e) {
    $(this).next().trigger(e);
  });

  $('.para-girl').on('mousemove click', function(e) {
      $('.s').text(e.type + ' '+ e.pageX + ", " + e.pageY);
  });
}

//parallax for the hero section
function heroParallax() {
    var wScroll = $(this).scrollTop();

    $('.title').css({
      'transform' : 'translate(0px, '+ wScroll /5 +'%)'
    });
}

/**Bundle-section********************************/
function bundleImgChange() {
  var $img = $('.bundle-img');

  $img.fadeOut(300, function(){
    $img.toggleClass('job')
    $img.toggleClass('res')
    $img.fadeIn(300);
  });

}




/**Search-section***********************************/

//select Btns active class + selectBoolean change
var selectBoolean;
function focusSelectBtn(){
  $('.home-focus-btn').on('click', function(){

    var $clickedBtn = $(this);
    var $siblings = $clickedBtn.siblings('.home-focus-btn');
    var selfCheck = $clickedBtn.hasClass('f-active');
    var siblingCheck = $siblings.hasClass('f-active');

    if (selfCheck == false){
      $clickedBtn.toggleClass('f-active')
      selectBoolean = $clickedBtn.attr('value')
    }

    if (siblingCheck === true){
      $siblings.toggleClass('f-active')

    }

  });
}
