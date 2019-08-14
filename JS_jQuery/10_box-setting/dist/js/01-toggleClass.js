;( function(global, $, undefined){
	'use strict';
	
	// console.log($.fn);// prototype

	var $app = $('#app'),
		$app_child = $('.app-child', $app),
		isHarmony = !false;

	console.log($app, $app_child, isHarmony);
	$app_child
		.toggleClass('beta')
		.toggleClass('harmony', isHarmony)
		.toggleClass('harmony', !isHarmony)
		.toggleClass(function() {
			var toggleclass = '';
			// ------------------
			// JS
			// var parentID = this.parentNode.getAttribute('id');
			// if (parentID === 'app') {
			// 	toggleclass = 'my-parent-is-app';
			// }
			// -----------------
			// jQuery
			if ( $(this).parent().is('#app') ) {
				toggleclass = 'my--parent--is--app';
			}

			return toggleclass;
		});
} )(window, window.jQuery);
