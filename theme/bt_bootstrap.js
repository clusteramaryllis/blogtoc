// BlogToc theme configuration
// theme : bootstrap v3, @link http://getbootstrap.com/
// author : Cluster Amaryllis

(function( window, undefined ){
  
  var loadTheme = function( BlogToc ) {
    (function(){

      /*****************************************************************
       * You can change these lines                                    *
       *****************************************************************/
      BlogToc.theme( 'bootstrap', 'css/bootstrap/bt_bootstrap.css', {
        "id": "bootstrap",
        /*"loader": "",*/
        /*"header": "",*/
        /*"label": "",*/
        /*"alphabet": "",*/
        "button": "btn btn-default",
        "filter": "clearfix",
        "display": "bt-form-inline",
        "search": "bt-form-inline",
        "query": "form-control",
        "table": "table",
        "footer": "clearfix",
        /*"result": "",
        "pagination": "",*/
        "pagination ul": "pagination",
        "pagination current": "active",
        "pagination disabled": "disabled",
        // "copyright": "",
        "copyright button": "btn btn-default btn-xs"
      });
      /*****************************************************************
       * End changing lines                                            *
       *****************************************************************/

    })();
  };

  if ( typeof window !== 'undefined' && window.BlogToc ) {
    loadTheme( window.BlogToc );
  }

})( window );