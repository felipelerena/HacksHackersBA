function show_tweet(video, options) {
	$('#overlay').html(options.html);
	$('#overlay .tweet').css('bottom', '100px');
}
function hide_tweet(video, options) {
	$('#overlay .tweet').css('bottom', '-100px');
}
