;( function(global, $, undefined){
	'use strict';
	var $skip_navigation = $('#skip-navigation');
	// console.log($skip_navigation);
	
	var $skip_links = $skip_navigation
						.addClass('skip-cotent')
						.find('a').addClass('a11y-hidden focusable');
	// console.log($skip_links);

	$skip_links.on('click', function(e) {
		e.preventDefault(); // 기본 동작 차단.
		// console.log( e.target ); // <a>
		var $target = $(e.target.getAttribute('href'));
		// var $target = $(e.target).prop('href');
		// var $target = $(e.target).attr('href');
		// console.log($target);
		$target.attr('tabindex', -1).focus();;
	});

} )(window, window.jQuery);


