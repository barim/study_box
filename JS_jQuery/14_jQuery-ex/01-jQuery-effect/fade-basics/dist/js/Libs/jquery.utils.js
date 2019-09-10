;(function(global, $, undefined){
	'use strict';
	/**
	 * --------------------------------
	 * jQuery.data( DOM_el, key, value ) - 유틸리티 메소드 -
	 * 활용 예시: jQuery 인스턴스 객체 캐시
	 * --------------------------------
	 */
	$.cache = function(element) {
		if ( !$.data(element, '$this') ) {
			$.data(element, '$this', $(element));
		}
		return $.data(element, '$this');
	};

	/**
	 * --------------------------------
	 * jQuery 유틸리티 메소드 확장
	 * jQuery.check(data, 'type');
	 * --------------------------------
	 */
	$.check = (function(){
		var toString = Object.prototype.toString;
		return function(data, type) {
			var result;
			switch( toString.call(data) ) {
				case '[object Null]':
					result = 'null';
				break;
				case '[object Undefined]':
					result = 'undefined';
				break;
				case '[object Number]':
					result = 'number';
				break;
				case '[object String]':
					result = 'string';
				break;
				case '[object Boolean]':
					result = 'boolean';
				break;
				case '[object Function]':
					result = 'function';
				break;
				case '[object Array]':
					result = 'array';
				break;
				case '[object Object]':
					result = 'object';
			}
// constructor의 경우는 null 과 undefind를 체크하기 애매했다.
			return result === type;
		}
	})();
})(window, window.jQuery);