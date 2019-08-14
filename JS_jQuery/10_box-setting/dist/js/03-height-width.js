;( function(global, $, undefined){
	'use strict';
	
	var $app = $('#app');

	// get
	var app_heihgt = $app.height(),
		app_width = $app.width();

	// console.log(app_heihgt, app_width);

	// set
	$app.height(500)
		.width(function(index, widht) {
			var height = $(this).height() * 1.8;
			return height;
		})
		.css('line-height', function(index, value) {
			return $(this).height() +'px';
		});
} )(window, window.jQuery);
