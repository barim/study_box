;( function(global, undefined){
	'use strict';

// global.hanwha = {};
Object.defineProperty(global,'hanwha',{	'value': {} });

// global.hanwha.slideGallery = {};
Object.defineProperty(hanwha,'slideGallery',{ 'value': {} });

// global.hanwha.slideGallery.model = new Model;
Object.defineProperty(hanwha.slideGallery,'model',{ 'value': new Model });

hanwha.slideGallery.model.save({
	'href'     : '#',
	'images'   : 'images/photo-02.jpg',
	'headline' : 'hanwha image 02',
	'summary'  : '한화 이미지는 작다.'
});
hanwha.slideGallery.model.save({
	'href'     : '#',
	'images'   : 'images/photo-03.jpg',
	'headline' : 'hanwha image 03',
	'summary'  : '한화 이미지는 크다.'
});

console.log(hanwha.slideGallery.model.database);

// -----------------------------------------------------
	global.milks = new Model();

	milks.save('초고우유');
	milks.save('딸기우유');
	milks.save('망고우유');
	milks.save('멜론우유');

	global.bears = new Model;

	bears.save('카스');
	bears.save('사뽀로');
	bears.save('호가든');
	bears.save('칭따오');

// -----------------------------------------------------

	// cat 데이터 객체 생성
	var sleepingCat = new BioCreature(function() {
		this.type = 'Cat';
		this.current_state = 'sleep';
		this.name = 'tedious';
	});
	var sleepingRaino = new BioCreature(function() {
		this.type = 'Raino';
		this.current_state = 'awake';
		this.name = 'js-raino';
	});

	// console.log(sleepingCat);
	
	// 데이터를 토대로 View 구현
	// 템플릿 설계
	var template = '';
	template += '<div id="bio-'+sleepingCat.type.toLowerCase()+'">';
	template += 	'<h3 class="bio-'+sleepingCat.type.toLowerCase()+'-type">'+sleepingCat.type+'</h3>';
	template += 	'<p class="bio-'+sleepingCat.type.toLowerCase()+'-status-desc">'+sleepingCat.displayStatus()+'</p>';
	template += 	'<figure>';
	template += 		'<img src="http://lorempixel.com/300/300/animals/7/" alt="'+sleepingCat.name+'" width="300px" height="300px"/>';
	template += 		'<figcaption>'+sleepingCat.current_state +' '+sleepingCat.name+'</figcaption>';
	template += 	'</figure>';
	template += '</div>';

	var other_template = [
		'<div id="bio-'+sleepingRaino.type.toLowerCase()+'">',
			'<h3 class="bio-'+sleepingRaino.type.toLowerCase()+'-type">'+sleepingRaino.type+'</h3>',
			'<p class="bio-'+sleepingRaino.type.toLowerCase()+'-status-desc">'+sleepingRaino.displayStatus()+'</p>',
			'<figure>',
				'<img src="http://lorempixel.com/300/300/animals/1/" alt="'+sleepingRaino.name+'" width="300px" height="300px"/>',
				'<figcaption>'+sleepingRaino.current_state +' '+sleepingRaino.name+'</figcaption>',
			'</figure>',
		'</div>'
	].join('');

	document.body.innerHTML = template + other_template;

	// 전역에서 접근 가능하도록 설정.
	global.sleepingCat = sleepingCat;

} )(window);