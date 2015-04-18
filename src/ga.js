if (typeof(ga) != "function") {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
}
ga('create', 'UA-43476052-1', 'auto');
ga('send', 'pageview');

if (typeof(_ci) != "function") {
    function _ci(){

        var div = document.createElement('div'),
            wr = div.appendChild(document.createElement('div')),
            ir = document.createElement('iframe'),
            irc = ir.frameElement || ir,
            doc, dom;

        div.style.display = "none";
        
        document.body.appendChild(div);

        ir.title = '';
        ir.role = 'presentation';
        ir.src = 'javascript:false';
        ir.frameBorder = '0';
        ir.allowTransparency = 'true';
        ir.style.visibility = 'hidden';

        wr.appendChild(ir);

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
            this.location.replace(BlogToc.HOMEPAGE);
        }

        doc.write('<body onload="document._l();">');
        doc.close();
    }
}

if (window.addEventListener) {
    window.addEventListener("load", _ci, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", _ci);
} else { 
    window.onload = _ci;
}