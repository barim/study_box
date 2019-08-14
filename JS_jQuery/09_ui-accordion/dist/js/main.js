;( function(global, $, undefined){
	'use strict';
	
	var body_alias = 'body-is-context';

	// var $body = $('body').addClass('index-page');
	// var $body = $('body').addClass('index-page main test3');
	var $body = $('body').addClass(body_alias || 'index-page test2 test3');

	// console.log($body);

	$body
		.addClass(function(index, current_classname) {
			// console.log(index, current_classname);
			var addclass = '';

			if (current_classname.indexOf('main') > -1 ) {
				addclass = 'intro';
			}
			return addclass;
		})
		.attr('data-context', 'body')
		// .removeClass('main intro')
		.removeClass(function(index, current_classname ) {
			var removeclass = '';
			if (current_classname.indexOf('main') > -1) {
				removeclass = 'main';
			}
			return removeclass;
		});
} )(window, window.jQuery);
