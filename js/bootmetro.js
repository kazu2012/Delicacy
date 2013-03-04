(function ($) {
   $.fn.metro = function () {
	   $("body").css("overflow-y","hidden");
      // arrange the section container
      var totalWidth = 0;
      var viewportWidth = $(".metro-sections").parent().width();
//	  alert(viewportWidth);
      $(".metro-sections .metro-section").each(function(index, el){
         totalWidth += $(el).outerWidth(true);
      });
//	  alert(totalWidth);
      $(".metro-sections").width(totalWidth);
	  $(".metro-sections").height($(window).height() - 85 - 80);
   // var lastSectionWidth = $(".metro-sections .metro-section").last().outerWidth(true);
    //  var max = lastSectionWidth - totalWidth;
	var max = $(document).width() - $(window).width();
//	  alert(lastSectionWidth);
//	  alert(max);
      // reset the left value
      $(".metro-sections").css('left', 55);

      // setup the horizontal scroll
      $(document).mousewheel(function(e, delta) {
         e.preventDefault();

     //    var $s = $(this);
         var actualLeft = $(document).scrollLeft();
         var newLeft = actualLeft - (delta * 100);
         //console.log('delta: ' + delta + ' - actualLeft: ' + actualLeft + ' - newLeft: ' + newLeft);      

         if (newLeft > -100 && newLeft < max + 100) { 
		 	if(newLeft < 0)
				$(document).scrollLeft(0);
			else if(newLeft > max)
				$(document).scrollLeft(max);
			else
          		$(document).scrollLeft(newLeft);
		 }
		 
      });
	  
	 //document resize
		 $(window).resize(function(e) {
         	$(".metro-sections").height($(window).height() - 85 - 80);
			max = $(document).width() - $(window).width();
			var maxlen = Math.floor(($(".metro-sections").height() + 10 - 34 - 5) / 160);
			$(".metro-section").each(function(index, element) {
                var len = $(this).children("a:not(.more):visible").length;
				if(len > maxlen) {
					$(this).children("a:not(.more):visible").last().hide("fast");
				} else if(len < maxlen) {
					var hiddenlen = $(this).children("a:not(.more):hidden").length;
					if(hiddenlen > 0) {
						$(this).children("a:not(.more):hidden").first().show("fast");
					}
				}
            });
     	 }); 
		 var maxlen = Math.floor(($(".metro-sections").height() + 10 - 34 - 5) / 160);
		 $(".metro-section").each(function(index, element) {
            var len = $(this).children("a:not(.more):visible").length;
			if(len > maxlen) {
				for(var i = len - 1; i >= maxlen; i--) {
					$(this).children("a:not(.more):visible").eq(i).hide();
				}
			}
         });

      // if the tiles viewport is wider than the screen than shows the arrow buttons
      //if ( $(".metro").width() < totalWidth ){
      //   $("#tiles-scroll-prev").show();
      //   $("#tiles-scroll-next").show();
      //}


      // Selectable
      var selectables = $(".selectable");
      $.each(selectables, function (i, e) {
         var el = $(this);
         var items = el.children(".metro-image, .metro-image-overlay, .metro-icon-text, .metro-image-text");
         items.bind("click", function () {
            if ($(this).hasClass("disabled")) return;
            $(this).toggleClass("selected");
         })
      })

      // Metro-Switchers
      /*var switchers = $(".metro-switch");
      switchers.bind("click", function () {
         var el = $(this);
         if (el.hasClass('disabled') || el.hasClass('static')) return false;
         el.toggleClass("state-on");
      })*/
   }
})(jQuery)