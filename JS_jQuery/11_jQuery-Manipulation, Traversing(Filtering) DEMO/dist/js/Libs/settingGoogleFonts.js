(function(global, $, undefined){
	'use strict';

	$.settingGoogleFonts = function(families) {

		if (!window.jQuery) { throw console.error('jQuery를 호출하셔야 합니다.');}

		if(!window.WebFontConfig) {
			window.WebFontConfig = {
				'google': {
					'families': $.isArray(families) ? families : [families]
				}
			};
		} else {
			if( $.isArray(families) ){
				window.WebFontConfig.google.families.push(families);
			} else {
				window.WebFontConfig.google.families = window.WebFontConfig.google.families.concat(families);
			}
		}

		var protocol = document.location.protocol === 'https' ? 'https' : 'http',
			$wf           = $('<script id="Google-Webfont">'),
			$first_script = $('script').eq(0);

		$wf
			.attr({
				'src'   : protocol + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js',
				'async' : true /*비동기로 호출*/
			})
			.insertBefore( $first_script );

	};

})(window, window.jQuery);

// font families 만 구글 웹폰트 가져다 쓰면 재가 자동으로 처리.