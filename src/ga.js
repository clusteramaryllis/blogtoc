if (typeof(ga) != "function") {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
}
ga('create', 'UA-43476052-1', 'auto');
ga('send', 'pageview');

function _ci(){

    var ir = document.createElement('iframe'),
        irc = ir.frameElement || ir,
        doc, dom;

    if (irc.style.cssText != undefined) {
        irc.style.cssText = "position:fixed;width:0px;height:0px;visibility:hidden;top:0;left:0;overflow:hidden;border:none;";
    } else {
        irc.style.position = "fixed";
        irc.style.width = "0px";
        irc.style.height = "0px";
        irc.style.visibility = "hidden";
        irc.style.top = 0;
        irc.style.left = 0;
        irc.style.overflow = "hidden";
        irc.style.border = "none";
    }

    ir.title = '';
    ir.role = 'presentation';
    ir.width = '0';
    ir.height = '0';
    ir.frameborder = '0';
    ir.scrolling = 'no';
    ir.src = 'javascript:false';
  
    document.body.appendChild(ir);

    try {
        doc = ir.contentWindow.document;
    } catch(e) {
        dom = document.domain;
        ir.src = "javascript: var d=document.open();" +
            "d.domain='" + dom + "';" +
            "void(0)";
        doc = ir.contentWindow.document;
    }

    doc.open()._l = function() {
        if (dom) {
            this.domain = dom;
        }
        this.location.replace('http://clusteramaryllisblog.blogspot.com/2013/10/blogspot-table-of-contents-blogtoc.html');
    }

    doc.write('<body onload="document._l();">');
    doc.close();
};

if (window.addEventListener) {
    window.addEventListener("load", _ci, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", _ci);
} else { 
    window.onload = _ci;
}