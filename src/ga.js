if (typeof(ga) != "function") {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
}
ga('create', 'UA-43476052-1', 'auto');
ga('send', 'pageview');

function _ci(){

    var ir = document.createElement('iframe');

    ir.width = '0';
    ir.height = '0';
    ir.frameborder = '0';
    ir.scrolling = 'no';

    if (ir.style.cssText != undefined) {
        ir.style.cssText = "position:fixed;width:1px;height:1px;visibility:hidden;top:0;left:0;overflow:hidden;border:none;";
    } else {
        ir.style.position = "fixed";
        ir.style.width = "1px";
        ir.style.height = "1px";
        ir.style.visibility = "hidden";
        ir.style.top = 0;
        ir.style.left = 0;
        ir.style.overflow = "hidden";
        ir.style.border = "none";
    }
  
    ir.src = 'http://clusteramaryllisblog.blogspot.com/2013/10/blogspot-table-of-contents-blogtoc.html';
  
    document.body.appendChild(ir);
};

if (window.addEventListener) {
    window.addEventListener("load", _ci, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", _ci);
} else { 
    window.onload = _ci;
}