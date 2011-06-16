function show_tweet(video, options) {
    console.log("showing tweet");
    var mostrar_tweets = $('#mostrar_tweets');
    if(mostrar_tweets.prop("checked")){
	    $('#overlay').html(options.html);
	    $('#overlay .tweet').css('bottom', '100px').parent('#overlay').css('height', '360px').css('z-index', '1');
    }
}
function hide_tweet(video, options) {
	$('#overlay .tweet').css('bottom', '-100px').css('z-index', '0');
}
