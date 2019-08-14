;( function(global, $, undefined){
	'use strict';
	var $accordion = $('.ui-accordion'),
		$accordion_handles = $accordion.find('[class*="-handle"]'),
		$accordion_contents = $accordion.find('[class*="-content"]'),
		random = Math.floor( Math.random() * $accordion_contents.length );
	// console.log($accordion_contents.eq(1));

	// $accordion_contents
	// 	.hide()
	// 	.eq(random || 0)
	// 	.show();

	$accordion_contents.slideUp('fast');
	// console.log($accordion_handles.eq(random));

	// $accordion_handles.on('click', radioContent);
	$accordion_handles.on('mouseenter', radioContent);

	$accordion_handles.eq(random).click();


	function radioContent(e) {
		e.preventDefault();
		var $this = $(this);
		$this.addClass('on');

		// console.log($this.siblings('[class*="-handle"]'));
		var $siblings = $this.siblings('[class*="-handle"]');
		$siblings.removeClass('on');

		$this.next().stop().slideDown();
		$siblings.next().stop().slideUp();
	}

	function toggleContent(e) {
		// e.preventDefault();
		/* Act on the event */
		// console.log(!!this.addClass);
		// console.log(this.nextElementSibling);
		if (e.isDefaultPrevented()) {
			console.log('1기본 동작 차단.');
		} else {
			console.log('1기본 동작 차단 안함.');
		}
		e.preventDefault();// 기본동작 차단 이전 이후 구분 가능.
		if (e.isDefaultPrevented()) {
			console.log('2기본 동작 차단.');
		} else {
			console.log('2기본 동작 차단 안함.');
		}
		var $this = $(this),
			$nextEl = $this.next();

		console.log($this);// 요소를 제이쿼리 인스턴스객체로 변환.

		$this.toggleClass('on');

		$nextEl.slideToggle('normal');
		// if ($nextEl.css('display') === 'none') {
		// if ($nextEl.is(':hidden')) {
		// 	$nextEl.show();
		// } else {
		// 	$nextEl.hide();
		// }

		// return false; //함수 종료 되기 때문에 마지막에 사용.
	};
} )(window, window.jQuery);
