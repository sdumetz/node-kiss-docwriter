'use strict';
import marked from "marked";
import prism from "prismjs"
function StyleSet(opts){
  var renderer = new marked.Renderer();
  renderer.codespan = function(code){
    if(/^FIXME/.test(code)){
      return '<span class="fixme">'+code.replace(/^FIXME\s?:?\s*/,"")+'</span>';
    }else{
      return "<blockquote>"+code+"</blockquote>";
    }
  }
  marked.setOptions({
    renderer:renderer,
    gfm:true,
    highlight:function(code,lang){
      if (!lang||!prism.languages[lang]) {
        lang = 'markup';
      }
      return prism.highlight(code, prism.languages[lang]);
    }
  });
  this.layout();
}

StyleSet.prototype.layout = function(){
  var container = document.createElement("DIV");
  var footer = document.createElement("DIV");
  container.className = "container";;
  container.innerHTML =  '<div id="burger"></div>\
                          <div id="toc"></div>\
                          <div id="content" >Use links to load a document</div>'
  document.body.appendChild(container);

  footer.id = "footer";
  footer.innerHTML = 'Holusion &#169; - <span id="render-date">2016</span>';
  document.body.appendChild(footer);

  document.getElementById("burger").onclick = this.toggle;
  document.getElementById("burger").style.backgroundImage = 'url(\'data:image/svg+xml;base64,'
    +window.btoa('<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\
                        <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"/>\
                        <path d="M0 0h24v24H0z" fill="none"/></svg>')+'\')'
}

StyleSet.prototype.toggle = function (){
  var toc = document.getElementById('toc');
  if(!toc.style.display || toc.style.display=="none"){
    toc.style.display="block";
  }else{
    toc.style.display="none";
  }
}

StyleSet.prototype.render = function(text){
  return marked(text);
}

module.exports = StyleSet;
