# node-kiss-docwriter
Keep It Simple, Stupid : Document Writer helper module

Getting started :

```shell
    npm install --save kiss-docwriter
```

Then :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My kiss documents</title>
    <link href="node_modules/kiss-docwriter/style.css" rel="stylesheet" />
    <link href="node_modules/kiss-docwriter/print.css" rel="stylesheet" media="print" />
    <script src="node_modules/kiss-docwriter/bundle.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded",function(){
        var docwriter = new Kiss([{"name":"My Content Name","path":"README.md"}]);
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

*Tadam*, you're all set.

## Options

Enable syntax highlighting (with prismjs):
```js
var opts = {
  renderer:{
    codespan: function(code){
      return "<blockquote>"+code+"</blockquote>";
    }
  },
  gfm:true,
  highlight:function(code,lang){
  if (!lang||!prism.languages[lang]) {
    lang = 'markup';
  }
  return prism.highlight(code, prism.languages[lang]);
  }
}
var docwriter = new Kiss([{"name":"My Content Name","path":"README.md"}],opts);
```
Don't forget to include prismjs' JS and CSS files.
