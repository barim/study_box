
	var $j = $.noConflict();
	// console.log($j().jquery);

	var y9 = {};
	y9.$ = jQuery.noConflict(true);

	// console.log( y9.$() );

	y9.$(function($){
		// console.log($('body'));
	});

;( function(global, $, undefined){
	'use strict';
	$(function() {
		$('body')
			.hide(2000)
			.show(2000)
			.hide(2000)
			.show(2000);
	});


} )(window, window.y9.$);