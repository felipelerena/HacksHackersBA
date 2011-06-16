function show_cut(video, options) {
	console.log('in');
	$('#overlay').html(options.html).css('height', '325px').css('z-index', '1');
	$('#overlay .cut h2').css('color', 'black');
	$('#overlay .cut').fadeIn(); 
    window.setTimeout(function(){hide_cut(video, options)}, 2000);
}
function hide_cut(video, options) {
	console.log('out');
	$('#overlay .cut h2').css('color', 'white');
	$('#overlay .cut').fadeOut(400).delay(400).parent('#overlay').html('').css('height', '360px').css('z-index', '0');
    gotoAndPlay(video, options.next_start);
}
