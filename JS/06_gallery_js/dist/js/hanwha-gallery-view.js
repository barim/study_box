( function(global, hw){
	'use strict';
	var model = hw.model;


	function textElipsis(text, slice_count) {
		//초기값 설정.
		slice_count = slice_count || 5;
		
		var convert_text = text.split(' ');//문자를 공백을 통해 구분 해서 배열로 변환.
		if ( convert_text.length <= slice_count ) {
								//배열의 일부분을 잘라서 리턴 slice(시작, 종료)
			convert_text = convert_text.slice(0, slice_count).join(' ');
		} else {	//리턴된 배열을 join( ' ') 띄어쓰기로 조인. 배열을 문자열로 리턴
			convert_text = convert_text.slice(0, slice_count).join(' ') + '...';
		}
		return  convert_text;
	}

	/**
	 * 템플릿코드를 완성하여 리턴.
	 * @param  {Array} model [데이터]
	 * @return {String}       [model을 토대로 완성된 HTML 템플릿 코드 문자열]
	 */
	function makeTemplateCode(model) {
		// 템플릿 코드를 접합할 초기 변수 template_code 선언
		var template_code = '';

		// 모델 데이터 반복 순환 처리하여 템플릿 코드 작성
		model.forEach(function(item, index) {
			template_code += '<li class="hw-gallery-item">';
			template_code += 	'<a href="'+ item.href +'">';
			template_code += 		'<img src="'+item.image+'" alt="">';
			template_code += 		'<h3 class="headline">'+textElipsis(item.headline, 10)+'</h3>';
			template_code += 		'<p class="summary">'+ textElipsis(item.summary, 14) +'</p>';
			template_code += 	'</a>';
			template_code += '</li>';
		});

		// 작성된 템플릿 코드 template_code의 앞/뒤에 <ul>, </ul> 문자열을 추가하여 반환
			return '<ul class="hw-gallery-container">'+template_code+'</ul>';
	}

	function makePagenation(model, display_item_count) {
		// 카운트 초기화
		display_item_count = display_item_count || 3;

		var total = model.length,
			make_count = Math.ceil(total/display_item_count);

		for (var i = 0, page_nation_code=''; i < make_count; i++) {
			page_nation_code += '<a href="#" role="button" aria-lable="'+ (i+1)+'번째 슬라이드"></a>';
		}
		return '<div class="hw-gallery-pagenation">'+page_nation_code+'</div>';
	}

	/**
	 * --------------------------------
	 * gallery
	 * --------------------------------
	 */

	// ul.hw-gallery-container>li.hw-gallery-item>img+h3.headline+p.summary

	var gallery = document.querySelector('#hanwha-gallery');

	gallery.setAttribute('class', 'wrapper hw-gallery');
	gallery.style.overflow = 'hidden';

	gallery.innerHTML = makeTemplateCode(model);
	gallery.innerHTML = makePagenation(model) + gallery.innerHTML;

	/**
	 * --------------------------------
	 * gallery-container <ul>
	 * --------------------------------
	 */
	var container          = gallery.querySelector('.hw-gallery-container'),
		container_li       = container.querySelector('li'),
		container_li_width = parseInt(global.getComputedStyle(container_li).width),
		container_width    = container_li_width * model.length + 'px';

	container.style.width = container_width;
	container.classList.add('anim');

	/**
	 * --------------------------------
	 * gallery-pagenation
	 * --------------------------------
	 */
	var pagenation = gallery.querySelector('.hw-gallery-pagenation');

	hw.view = {
		'gallery': gallery,
		'container': container,
		'container_base_width': container_li_width,
		'pagenation': pagenation
	};

} )(window, window.hanwha);