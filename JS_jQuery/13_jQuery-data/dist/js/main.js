;( function(global, $, undefined){
	'use strict';

	var $uniqueId = $('.UniqueID'),
		detective_class = {
			'cursor' : 'default',
			'color' : '#9F9F9F',
			'background' : '#D4D4D4'
		};
	$uniqueId
		.data({
			'id': new Date().getTime().toString(),
			'origin_class': $uniqueId.attr('class'),
			'one': true
		})
		.on('click', function(e) {
			e.preventDefault();
			var $this = $.cache(this);
			if ( $this.data('one') ) {
				$('<div>', {
					'class': 'UniqueID-result'
				}).text($this.data('id')).insertAfter($uniqueId);
			}
			$this.data('one', false);
		});

	/**
	 * --------------------------------
	 * jQuery.data(Dom_el, key, value) - 유틸리티메소드
	 * 활용 예시 : jQuery 인스턴스 객체 캐시
	 * --------------------------------
	 */
	// $.data(document.body, 'name', '바디');
	// console.log( $.data(document.body) );// {name: "바디"}

	$.cache = function(element) {
		if (!$.data(element, '$this')) {
			$.data(element, '$this', $(element));
		}
		return $.data(element, '$this');
	};

	var $body = $('body');

	$.check = function() {
		var toString = Object.prototype.toString;

		return function(data, type) {
			var result;
			switch(toString.call(data)) {
				case '[Object Null]':
					result = 'null';
					break;
				case '[Object Undefined]':
					result = 'undefined';
					break;
				case '[Object Null]':
					result = 'null';
					break;
				case '[Object String]':
					result = 'string';
					break;
				case '[Object Boolean]':
					result = 'boolean';
					break;
				case '[Object Function]':
					result = 'function';
					break;
				case '[Object Function]':
					result = 'function';
					break;
				case '[Object Object]':
					result = 'object';
					break;
			}
		};
	};

} )(window, window.jQuery);




