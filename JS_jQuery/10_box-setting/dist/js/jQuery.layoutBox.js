;( function(global, $, undefined){
	'use strict';
	
	var box_obj_default = {
		'box'        : '<div>',
		'position'   : 'absolute',
		'left'       : 0,
		'top'        : 0,
		'width'      : 100,
		'height'     : 100,
		'background' : '#0f0f0f',
		'color'      : '#fff',
		'html'       : '<span>Box</span>'
	};

	$.layoutBox = function($container, box_obj) {
		var settings = $.extend(box_obj_default, box_obj);
		console.log(settings);

		var $box = $(settings.box , {
			'class':'box',
			'css': {
				'position'   : settings.position,
				'left'       : settings.left+'px',
				'top'        : settings.top+'px',
				'width'      : settings.width+'px',
				'height'     : settings.height+'px',
				'background' : settings.background,
				'color'      : settings.color
			},
			'html':settings.html
		}).appendTo($container);
	};
} )(window, window.jQuery);
 