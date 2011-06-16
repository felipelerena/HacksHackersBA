function show_tweet(video, options) {
    var mostrar_tweets = $('#mostrar_tweets');
    if(mostrar_tweets.prop("checked")){
	    $('#overlay').html(options.html);
	    $('#overlay .tweet').css('bottom', '100px');
    }
}
function hide_tweet(video, options) {
	$('#overlay .tweet').css('bottom', '-100px');
}
