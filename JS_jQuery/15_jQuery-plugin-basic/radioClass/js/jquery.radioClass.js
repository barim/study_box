// jQuery.radioClass.js
// jQuery를 의존하기 때문에 앞에 jquery 식별자를 붙임.
;( function(global, $, undefined){
	'use strict';
	// jQuery 인스턴스 메소드인 radioClass가 정의 되어 있는지 확인 후, 없다면 정의.
	if (!$.fn.radioClass) {
		$.fn.radioClass = function(user_argument) {
			// 사용자 전달인자 유형 체크를 위한 변수 설정
			// $.type() 유틸리티 메소드 활용
			var _type = $.type(user_argument);

			// 전달인자 유효성 검사.
			if (_type !== 'string' && _type !== 'function') {
				throw console.error('radioClass를 적용할 class 속성 문자열 이거나, 함수를 전달 해야 한다.');
			}
			// this는 jQuery인스턴스 객체. this.jquery 하면 버전 나옴.
			// 이것은 jQuery의 prototype 안의 radioClass함수 이기 때문에 
			// this는 jQuery 객체를 가리킨다.
			
			if (_type === 'string') {
				//플러그인 코드 안에서 this는 jQuery 인스턴스 객체이다.
				this.addClass(user_argument).siblings('.'+user_argument).removeClass(user_argument);
				return this;
			} else {
				// _type값이 함수일때.
				return $.each(this, function(index, dom_el) {
							var result_className = user_argument.call(dom_el, index, dom_el.getAttribute('class'));

							//radioClass 본연의 일
							//this는 DOM
							$(this).addClass(result_className)
								.siblings('.'+result_className)
								.removeClass(result_className);
							return this;
						});
			}
		};
	}
} )(window, window.jQuery);
