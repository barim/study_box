( function(global, $, undefined){
	'use strict';
	var $container = $('.container'),
		$bigBox = $('.bigBox', $container),
		$status = $('.status', $container);

	$container.on('click', 'a', function(e) {
		e.preventDefault();
		e.stopPropagation();
		// $.cache()는 만든 함수. jquery.utils.js
		if ($.cache(e.target).is('.clickToFadeIn')){
			$bigBox.fadeIn(2000, function() {
				// 애니메이션이 종료되면... 콜백 함수 실행.
				$status.addClass('green');
			});
		}
		if ($.cache(e.target).is('.clickToFadeOut')){
			$bigBox.fadeOut(2000, function() {
				$status.removeClass('green');
			});
		}
		if ($.cache(e.target).is('.toggleFade')){
			$bigBox.fadeToggle(2000, function() {
				$status.toggleClass('green');
			});
		}

	});
} )(window, window.jQuery);