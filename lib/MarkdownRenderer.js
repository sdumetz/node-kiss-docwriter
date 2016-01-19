'use strict';
function MarkdownRenderer(styleset,toc,container){
  this.styleset = styleset;
  this.container = container;
  this.toc = toc;
  this.asyncLoad("toc.json").then(JSON.parse).then(this.renderToc.bind(this),function(e){throw e});
  window.onhashchange = this.hashChanged.bind(this);
  this.hashChanged();
}
MarkdownRenderer.prototype.asyncLoad = function (uri) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET',uri, true);
    req.onreadystatechange = (aEvt)=> {
      if (req.readyState == 4) {
        if(req.status == 200){
          try {
            resolve(req.responseText);
          }catch(e){
            console.log("Error parsing JSON : ",req.responseText)
            reject(e);
          }
        } else{
          console.log("bad load")
          reject("Loading "+uri+"returned : "+req.status);
        }
      }
    };
    req.send(null);
  });
};
MarkdownRenderer.prototype.renderToc = function (data) {
  if(!Array.isArray(data))return console.warn("TOC data is not an array : ",data);
  this.toc.appendChild(data.map((el)=>{
    return this.makeTocElement(el);
  }).reduce(function(ul,li){
    ul.appendChild(li);
    return ul;
  },document.createElement("UL")));
};
MarkdownRenderer.prototype.makeTocElement = function (el) {
  var li = document.createElement("LI")
  li.innerHTML = "<a href=\"#"+encodeURIComponent(el.path)+"\">"+el.name+"</a>";
  return li;
};
MarkdownRenderer.prototype.hashChanged = function () {
  var hash = decodeURIComponent(location.hash.slice(1));
  if(!hash) return;
  this.asyncLoad("data/"+hash).then(this.renderMarkup.bind(this)).then((rawhtml)=>{
    this.container.innerHTML = rawhtml;
    this.renderTitle(hash);
  }).catch(function(e){throw e})
};

MarkdownRenderer.prototype.renderTitle = function(hash){
  document.getElementById("render-date").innerHTML= new Date().toDateString();
  document.getElementsByTagName("TITLE")[0].innerHTML = hash;
}
MarkdownRenderer.prototype.renderMarkup = function(text){
  return this.styleset.render(text);
}
module.exports = MarkdownRenderer
