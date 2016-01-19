'use strict';
import MarkdownRenderer from "./MarkdownRenderer.js"
import StyleSet from "./StyleSet.js"
document.addEventListener("DOMContentLoaded",function(){
  var style = new StyleSet();
  var renderer = new MarkdownRenderer(style,document.getElementById("toc"),document.getElementById("content"));
});
