'use strict';
function Engine(styleset,datasrc){
  this.styleset = styleset;

  ((typeof datasrc === "object")?Promise.resolve(datasrc):this.asyncLoad(datasrc).then(JSON.parse))
    .then(this.renderToc.bind(this),function(e){throw e.stack});

  window.onhashchange = this.hashChanged.bind(this);
  this.hashChanged();
}
Engine.prototype.asyncLoad = function (uri) {
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
Engine.prototype.renderToc = function (data) {
  if(!Array.isArray(data))return console.warn("TOC data is not an array : ",data);
  this.styleset.toc.appendChild(data.map((el)=>{
    return this.makeTocElement(el);
  }).reduce(function(ul,li){
    ul.appendChild(li);
    return ul;
  },document.createElement("UL")));
};
Engine.prototype.makeTocElement = function (el) {
  var li = document.createElement("LI")
  li.innerHTML = "<a href=\"#"+encodeURIComponent(el.path)+"\">"+el.name+"</a>";
  return li;
};
Engine.prototype.hashChanged = function () {
  var hash = decodeURIComponent(location.hash.slice(1));
  if(!hash) return;
  this.asyncLoad(hash).then(this.renderMarkup.bind(this)).then((rawhtml)=>{
    this.styleset.content.innerHTML = rawhtml;
    this.renderTitle(hash);
  }).catch(function(e){throw e})
};

Engine.prototype.renderTitle = function(hash){
  document.getElementById("render-date").innerHTML= new Date().toDateString();
  document.getElementsByTagName("TITLE")[0].innerHTML = hash;
}
Engine.prototype.renderMarkup = function(text){
  return this.styleset.render(text);
}
module.exports = Engine
