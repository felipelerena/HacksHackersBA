var pop = null;
var elements = Array();

function cronica(){
    $('#overlay').css('background', 'red');
    $('#overlay').css('z-index', '1');
    $('#overlay').html('<span style="color:yellow">ULTIMO MOMENTO:</span><h1 style="text-align:center;color:white;margin-top:110px;padding:20px;font-size:30px;text-shadow: 2px 2px 1px black;">MUJER "TROLL" ARROJA LA CONSTITUCION A UN PERIODISTA EXTRANJERO</h1><audio autoplay src="./cronica.ogg" controls="controls" style="display:none"></audio>');
}

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
    	data.next_title = next_element.title;
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
          console.log("event start");
          console.log(options);
	      var version_larga = $('#version_larga');
	      if(!version_larga.prop("checked")){
              gotoAndPlay(this, options.start);
              if(options.pauseonstart){
                  this.pause()
              }
          }
      },
      end: function( event, options ) {
          console.log("ending");
	      var version_larga = $('#version_larga');
              if(!version_larga.prop("checked")){
	              if(!options.pauseonend && options.next_start) {
                      if(options.next_title) {
                          options.html = '<div class="cut"><h2>' + options.next_title +'</h2></div>';
                          show_cut(this, options);
                      } else {
                        gotoAndPlay(this, options.next_start);
                      }
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
        end: 1,
        pauseonend: false
    },
    {
        start: 3,
        end: 28,
        pauseonend: false,
        title: 'El futuro del periodismo'
    },
    {
        start: 466,
        end: 485,
        pauseonend: false,
        title: 'Retos y desafíos'
    },
    {
        start: 486,
        end: 571,
        pauseonend: false
    },
    {
        start: 572,
        end: 573,
        pauseonend: false,
        pauseonstart: true
    },
    {
        start: 1221,
        end: 1304,
        pauseonend: false,
        title: 'Oportunidades'
    },
    {
        start: 1305,
        end: 1327,
        pauseonend: false
    },
    {
        start: 1328,
        end: 1329,
        pauseonend: false,
        pauseonstart: true
    },
    {
        start: 2004,
        end: 2126,
        pauseonend: false,
        title: 'Futuro'
    },
    {
        start: 2127,
        end: 2128,
        pauseonend: false,
        pauseonstart: true,
    }
]

