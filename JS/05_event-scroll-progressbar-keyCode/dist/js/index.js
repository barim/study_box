( function(global, $){
	'use strict';

	global.onload = uiInit;

	function uiInit() {
		global.body = $.$('body');

		dynamicAddContents();

		this.onscroll = checkEventScroll;
		
		this.onkeydown = keyDownFn;
		this.onkeypress = keyDownFn;
		this.onkeyup = keyUpFn;
	}

	function keyDownFn(event) {
		console.log('[['+event.type+']]', event.keyCode, '- [[shiftKey]]', event.shiftKey, '- [[altKey]]', event.altKey);
	};
	function keyUpFn(event) {
			console.log('[['+event.type+']]', event.keyCode, '- [[shiftKey]]', event.shiftKey, '- [[altKey]]', event.altKey);
		};

	function checkEventScroll() {
		// console.log(this === global);// true
		// console.log(this === window);// true

		// 스크롤된 높이 값 출력
		// window.pageYOffset(scrollY) , IE: document.scrollTop | d4표 참조.
					// 크로스 브라우징 위해 설정
		var scrollY = this.scrollY || global.body.scrollTop;
		// console.log(scrollY);
		var scroll_info = $.$('.show-scroll-info');
		$.text( scroll_info, scrollY );

		actionProgressBar.call(global, scrollY);
		//call 을 통해서 this 는 global로 전달하고 scrollY 를 전달하면 매번 가져오는게 아니라 한번 가져온 값을 재사용
	}

	function actionProgressBar(currentScrollY) {
		var availableScrollHeight = global.body.offsetHeight - global.innerHeight,
			percent = Math.round(currentScrollY / availableScrollHeight * 100 )+'%';

		$.css($.$('#scrolled-progress-bar'), 'width', percent);

	}
	function dynamicAddContents() {
		var app = $.createEl('div');
		$.attr(app, 'id', 'app');
		$.prepend(global.body, app);

		var header = $.createEl('header');
		$.prepend(app, header);

		var header_h1 = $.createEl('h1'),
			header_h1_txt = $.createText('hi everyone!! :) JS Events : scroll, progressbar, keyCode');
		$.prepend(header_h1, header_h1_txt);
		$.append(header, header_h1);

		var scroll_info = $.createEl('span');
		$.addClass(scroll_info, 'show-scroll-info');
		$.append(global.body, scroll_info);

		var scrolled_progress = $.createEl('span');
		$.attr(scrolled_progress, 'id', 'scrolled-progress-bar');
		$.prepend(global.body, scrolled_progress);

	}

} )(window, window.y9);