var pop = null;
var elements = Array();

function parseSlide(index, element){
    elem = $(element);
    props = {start: elem.attr("data-from"), 
             end: elem.attr("data-to"),
             html: elem.html(),
             callback: eval("show_" + elem.attr("data-type")),
             endcallback: eval("hide_" + elem.attr("data-type")),
             title: elem.children('h2').html()};
    elements.push(props);
}    

function generateElements(){
    $('#slides article').each(parseSlide);
}

function showMaestro(maestro_id){
    var video_url = 'especialistas.webm';
        var video = $('maestros').html();
    pop.pause()
    
    $('#right').html(video);
}

function restaurar(){
    $('#right').html(restauracion);
    pop.play()
}

function gotoAndPlay(video, start){
    video.currentTime([start]);
    video.play()
}

function add_thumb(pop, title, start) {
    if(title != null) {
        var thumbs = $('#thumbs');
        var id_ = 'video_' + Math.ceil(Math.random() * 100000);
        thumbs.append('<li><a href="#" onclick="gotoAndPlay(pop, ' + start + ')">' + title + '</a></span></li>');
    }
}

function loadElement(pop, data){
    add_thumb(pop, data.title, data.start);
}

function show_slide(video, options) {
   	$('#right').html(options.html);
}

function hide_slide(video, options) {
   	$('#right').html("");
}

function populate(pop, elements, onload) {
    for(var i=0; i<elements.length; i++) {
        data = elements[i];
        console.log(data);
        pop.interventor(data);
        onload(pop, data);
    }
}

function populate_shortener(pop, elements) {
for(var i=0; i<elements.length; i++) { 
    data = elements[i];
    next_element = elements[i + 1];
    if(next_element){
    	data.next_start = next_element.start;
    }
    pop.shortener(data);
}
}

(function(Popcorn) {
  Popcorn.plugin( "interventor" , function( options ) {
    return {
      start: function( event, options ) {
	    if(options.callback) {
	        options.callback(this, options);
	    } 
      },
      end: function( event, options ) {
	    if (options.endcallback) {
	        options.endcallback(this, options);
        }
      }
    };
  });
  Popcorn.plugin( "shortener" , function( options ) {
    return {
      start: function( event, options ) {
	      var version_larga = $('#version_larga');
	      if(!version_larga.prop("checked")){
              gotoAndPlay(this, options.start);
          }
      },
      end: function( event, options ) {
	      var version_larga = $('#version_larga');
              if(!version_larga.prop("checked")){
                  console.log(options)
	              if(!options.pauseonend && options.next_start) {
                      gotoAndPlay(this, options.next_start);
	              } else {
	                  this.pause();
	              }
             }
          }
      };
  });
    
})(Popcorn);

// ensure the DOM has loaded
document.addEventListener("DOMContentLoaded", function () {

  // Create a popcporn instance by calling Popcorn("#id-of-my-video")
  pop = Popcorn("#video");    
  generateElements();
  populate(pop, elements, loadElement);
  populate_shortener(pop, chunks);
}, false);

chunks = [
    {
        start: 0,
        end: 10,
        pauseonend: true
    },
    {
        start: 11,
        end: 300,
        pauseonend: false
    }
]

