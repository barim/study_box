;( function(global, $, undefined){
	'use strict';
	
	jQuery.holdReady(true);
	// $.holdready(true);

	$(init);

	function init() {
		var $body = $('body');
		console.log($body);

		$body.addClass('index-page');
	}

	global.setTimeout(function() {
		$.holdReady(false);
	}, 2000);
	
} )(window, window.jQuery);