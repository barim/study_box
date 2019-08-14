;( function(global, $, undefined){
	'use strict';
	
	var $app = $('#app'),
		// $app_child = $app.find('div');
		$app_child = $app.children('.app-child');
	// console.log($app, $app_child);

	var app_padding        = $app.css('padding'),
		app_padding_left   = $app.css('padding-left'),
		app_padding_right  = $app.css('padding-right'),
		app_padding_bottom = $app.css('padding-bottom'),
		app_padding_top    = $app.css('padding-top');

	console.log(app_padding);
	console.log(app_padding_left);

	function px2em(value, base) {
		base = base || 16;
		return parseFloat(value) / base + 'em';
	}

	function em2px(value, base) {
		base = base || 16;
		return parseFloat(value) * base + 'px';
	}

	var app_css_map = {
		'border-radius' : '5px',
		'background-image' : 'linear-gradient(-90deg, #FC4a54 , #841c26)'
	};
	$app.css(app_css_map);

	// get properties
	var app_css_props = $app.css(['position', 'z-index', 'opacity']),
		app_child_css_props = $app_child.css(['float', 'margin-right', 'outline']);

	// console.log(app_css_props, app_child_css_props);
	for( var prop in app_css_props ){
			var value = app_css_props[prop]; 
			console.log('prop: '+prop+','+'value: ',value);
	}
	for( var prop in app_child_css_props ){
			var value = app_child_css_props[prop]; 
			console.log('prop: '+prop+','+'value: ',value);
	}


	$app_child
		.css('font-size', px2em('100px'))
		.css('position', 'absolute')
		.css('top', '10px')
		.css('right', '30px');




	global.px2em = px2em;
	global.em2px = em2px;

} )(window, window.jQuery);
