( function(global, $, undefined){
	'use strict';
	var $container = $('.container'),
		$bigBox = $container.children('.bigBox'),
		$progressBar = $('#progressBar');

	// 이벤트 위임.
	$container.on('click', 'a', function(e) {
		e.preventDefault();
		e.stopPropagation();

		if ($.cache(e.target).is('.clickToFadeIn')) {
			// fadeIn 옵션 사용.
			$bigBox.fadeIn({
				'duration': 800,
				'start': function() {
					console.log('애니메이션 시작');
				},
				'step': function(now, tween) {
					$progressBar.val(now *100);
				},
				'complete': function() {
					console.log('애니메이션 종료');
				}
			});
		} else{
			$bigBox.fadeOut({
				'duration': 1800,
				'step': function(now, tween) {
					$progressBar.val(now *100);
				}
			});
		}
	});

} )(window, window.jQuery);