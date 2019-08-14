( function(global, $, undefined){
	'use strict';
	var $page_headline = $('#page h1');

	$page_headline.addClass('on');
	global.intervalID = setInterval(function() {
		$page_headline.toggleClass('on');
	},500);

	global.setTimeout(function() {
		clearInterval(global.intervalID);
	},3000);

} )(window, window.jQuery);