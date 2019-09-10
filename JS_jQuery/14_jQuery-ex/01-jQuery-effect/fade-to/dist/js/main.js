( function(global, $, undefined){
	'use strict';
	var $container = $('.container');

	$container
		.on('mouseenter', 'a.fadeBox', function(e) {
			e.preventDefault();
			e.stopPropagation();

			var $this = $.cache(e.target).is('a') ? 
							$.cache(e.target) : 
							$.cache(e.target).parent();
			$this.stop().fadeTo(400, 1);
		})
		.on('mouseleave', 'a.fadeBox', function(e) {
			e.preventDefault();
			e.stopPropagation();

			var $this = $.cache(e.target.nodeName === 'A' ?
									e.target :
									e.target.parentNode
								);
			$this.stop().fadeTo(400, 0.2);
		});

} )(window, window.jQuery);