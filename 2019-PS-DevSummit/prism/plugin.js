window.revealPrismPlugin = {
  initPrism: function highlight() {
    var codes = document.querySelectorAll('code');
    for (var i = codes.length - 1; i >= 0; i--) {
        var code = codes[i];
        // every code block will have line numbers
        code.className += " line-numbers";
        // if no lang is specified, java is presumed
        if (code.className.indexOf("language") === -1) {
            code.className += " language-java";
        }
        Prism.highlightElement(code);
    }
  }
};
