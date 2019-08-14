( function(global, hw){
	'use strict';
	var view            = hw.view,
		container       = view.container,
		pagenation      = view.pagenation,
		pagenation_btns = pagenation.querySelectorAll('a'),
		container_width = view.container_base_width * 3;

	var random_count = Math.floor(Math.random() * pagenation_btns.length),
		current_index = random_count;

	/**
	 * --------------------------------
	 * 이벤트 핸들링
	 * 이벤트 대상 반복 구문 처리
	 * 이벤트 위임
	 * --------------------------------
	 */
	each(pagenation_btns, function(item, index){
	// [].forEach(pagenation_btns, function(item, index) {
		item.setAttribute('data-index', index);
		item.onclick = slideGallery;
	});

	slide(current_index);


	function slideGallery() {
		if (this.classList.contains('on')) {return false;}

		var index = this.getAttribute('data-index'),
			distance_x = -1 * container_width * index + 'px';

		each(this.parentNode.children, removeOnClass);

		this.classList.add('on');

		current_index = index;

		container.style.transform = 'translateX('+distance_x+')';

		return false;
	}
	
	function slide(slide_index) {
		pagenation_btns[slide_index].onclick();
	}

	function autoSlide(ms) {
		hw.controller.slideId = setInterval(function() {
			slide(++current_index % pagenation_btns.length);
		}, (ms || 3000) );
	}

	function stopSlide() {
		clearInteval(hw.controller.slideId);
	}

	function removeOnClass(item) {
		if (item.classList.contains('on')) {
			item.classList.remove('on');
		}
	}

	function each(nodeList, fn) {
		[].forEach.call(nodeList, fn);
	}

	hw.controller = {
		'slide': slide,
		'autoSlide': autoSlide,
		'stopSlide': stopSlide
	};
} )(window, window.hanwha);