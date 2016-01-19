'use strict';
import marked from "marked";
function StyleSet(opts){
  var renderer = new marked.Renderer();
  opts = opts||{};
  if(opts.renderer && ! opts.renderer instanceof marked.Renderer ){
    Object.keys(opts.renderer).forEach(function(key){
      renderer[key] = opts.renderer[key];
    });
    opts.renderer = renderer;
  }
  this.setOptions(opts);
  this.layout();
}

StyleSet.prototype.setOptions = function(opts){
  marked.setOptions(opts);
}
StyleSet.prototype.layout = function(){
  var container = document.createElement("DIV");
  var footer = document.createElement("DIV");
  this.burger = document.createElement("DIV");
  this.burger.id = "burger";
  this.toc = document.createElement("DIV");
  this.toc.id = "toc";
  this.content = document.createElement("DIV");
  this.content.id = "content";
  container.className = "container";
  container.appendChild(this.burger);
  container.appendChild(this.toc);
  container.appendChild(this.content);
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
