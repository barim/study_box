;( function(global, $, undefined){
	'use strict';
	var $page = $('#page'),
		$post = $page.children('.post');
		// $post = $('.post', $page);

	// 필터식 에서 탐색할 수 있다. :gt()  ~보다 크다.
	// 조건문 사용 않고도 내부에서 제이쿼리 필터식을 사용 할 수 있다.
	// 필터 라는것은 내가 가지고 있는 콜렉션 내에서 골라 내는것.
	// $post.filter(':gt(0)').append('<a href="#">go to Top</a>');
	//.filter() 탐색 메서드.
	$post.filter(function(index, el) {
		// if (index > 0) {
		// 	// console.log(el);
		// 	return true;
		// } else { return false; }
		// -----------------------------------

		// native JS 
		// var win_h = window.inner Height || document.documentElement.clientHeight || document.body.clientHeight,// 크로스브라우징
		// 	el_offset_h = el.offsetTop + el.offsetHeight; 

		// if (el_offset_h > win_h) { return true; }
		//-----------------------------------------------

		// jQuery
		var win_h = $(window).height(),// 현재 보여지는 화면 높이값.
			$el = $(el),
// offset()은 현재 보여주는 화면 뷰포트에서 요소가 있는 높이를 가져 오는것. 
// property 2개 top , left
			el_offset_h = $el.offset().top + $el.outerHeight(true);
										// 요소 margin까지 포함한 높이
		if (win_h < el_offset_h) {
			return true;
		}
		// 중요한건 메서드 마다 내부에 펑션을 받을수 있는데 그렇게 받는 이유는 꼭 정해진 대로만 쓰는게 jQuery가 아니기 때문에
	}).append('<a href="#">go to Top</a>');
	// 필터 함수내에서 조건 맞다면 append[대상의 안쪽에 마지막 자식으로 새롭게 만든 요소를 추가] 하라.

	// --------------------------------------------------------
	// 씨즐엔진 필터식 [grate then] .post:gt(0) - (0)보다 크다. 
	// 직접 <a>를 만들어서 .post 들중에 0번 이상에만 붙여라.
	// $('<a href="#">go to Top</a>').appendTo('.post:gt(0)'); //선택자 표현식.
} )(window, window.jQuery);

// 화면의 높이 구하기?
// 창의 높이 에서 크롬[브라우저 테두리를 포함한 것]?  을 뺀 나머지. 화면에 보이는 뷰포트 높이값을 어떻게 구하나? 창이니깐 높인데 안쪽의 높이 window.innerHeight 가 된다.
// 
// 마진박스 바깥은 offset Box
// JS보면 margin box 바깥쪽은 offset Box.
// offsetTop