var pop = null;
var restauracion = '';
var elements = Array();

function parseSlide(){
    elem = $(this);
    props = {start: elem.attr("data-from"), 
             end: elem.attr("data-to"),
             html: elem.html(),
             callback: eval("show_" + elem.attr("data-type")),
             title: elem.children('h2').html()};
    elements.push(props);
}    

function generateElements(){
    var slides = $('#slides article').each(parseSlide);
}

function showMaestro(maestro_id){
    var maestros = Array('./carlos.webm');
    var video_url = maestros[maestro_id];
        var video = '<h2>maestro:</h2><video id="video_maestro_' + maestro_id +'" controls style="float:left" autoplay="true"><source src=" ' + video_url + '"></source></video><br><a href="#" onClick="restaurar()">cerrar</a>';
    restauracion = $('#right').html();
    pop.pause()
    $('#right').html(video);

}

function restaurar(){
$('#right').html(restauracion);
pop.play()
}

function gotoAndPlay(start){
pop.currentTime([start]);
}

function add_thumb(pop, title, start) {
    if(title != null) {
        var thumbs = $('#thumbs');
        var id_ = 'video_' + Math.ceil(Math.random() * 100000);
        thumbs.append('<li><a href="#" onclick="gotoAndPlay(' + start + ')">' + title + '</a></span></li>');
    }
}

function loadElement(pop, data){
    add_thumb(pop, data.title, data.start);
}

function show_slide(video, options) {
   	$('#right').html(options.html);
}

function clear_text(video, options) {
   	$('#right').html("");
}

function populate(pop, elements, onload) {
    for(element in elements) {
        data = elements[element];
        pop.interventor(data);
        onload(pop, data);
    }
}

function populate_shortener(pop, elements) {
for(i=0; i<elements.length; i++) { 
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
            } else {
	    clear_text(this, options)
	}
      }
    };
  });
  Popcorn.plugin( "shortener" , function( options ) {
    return {
      start: function( event, options ) {
	  var version_larga = $('#version_larga');
	  if(!version_larga.prop("checked")){
          	gotoAndPlay(options.start);
              }
      },
      end: function( event, options ) {
	  var version_larga = $('#version_larga');
              if(!version_larga.prop("checked")){
	      if(options.next_start) {
                  gotoAndPlay(options.next_start);
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
  console.log(elements);
  populate(pop, elements, loadElement);
  populate_shortener(pop, chunks);
}, false);
/*
elements = [
{
    start: 0,
    end: 5,
    callback: change_text,
    title: "una historia",
    html: "una historia en <strong>HT&Ntilde;L5</strong>"
},
{
    start: 10,
    end: 12,
    callback: change_text,
    title: "amigos",
    html: "amigos"
},
{
    start: 25,
    end: 1000,
    callback: change_text,
    title: "personalizar",
    html: '<iframe src="http://www.elpais.es" style="width:650px;height:350px"></iframe><br><a href="#" onClick="showMaestro(0)">Ver video de maestro</a>'
}
]*/

chunks = [
{
    start: 0,
    end: 5
},
{
    start: 10,
    end: 15
}
]


