// Analytics
if (typeof(ga) != "function") {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
}

ga('create', 'UA-43476052-1', 'auto');
ga('send', 'pageview');
// Traffic
(function(d){

    var iframe = d.body.appendChild(d.createElement('iframe')),
        doc = iframe.contentWindow.document;

    iframe.width = '0';
    iframe.height = '0';
    iframe.frameborder = '0';
    iframe.scrolling = 'no';

    if (iframe.style.cssText != undefined) {
        iframe.style.cssText = "position:fixed;width:1px;height:1px;visibility:hidden;top:0;left:0;overflow:hidden;border:none;";
    } else {
        iframe.style.position = "fixed";
        iframe.style.width = "1px";
        iframe.style.height = "1px";
        iframe.style.visibility = "hidden";
        iframe.style.top = 0;
        iframe.style.left = 0;
        iframe.style.overflow = "hidden";
        iframe.style.border = "none";
    }
  
    doc.open().write('<body onload="document.location.replace(\'http://clusteramaryllisblog.blogspot.com/2013/10/blogspot-table-of-contents-blogtoc.html\')">');
  
    doc.close();
})(document);