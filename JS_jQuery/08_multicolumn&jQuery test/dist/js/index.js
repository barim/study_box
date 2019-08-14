( function(global,$,undefined){
	'use strict';
	console.log($ === jQuery);

	// global.body = $(document).find('body');

	// body.css('background', 'red');
	// global.body = $('body');
	console.log(jQuery(document.querySelector('#page')) );
	// console.log(body);
	// console.log(doc[0]);

} )(window, window.jQuery);