// BlogToc theme configuration
// theme : bootstrap v3, @link http://getbootstrap.com/
// author : Cluster Amaryllis

(function(){
  
  var loadTheme = function( BlogToc ) {
    (function(){

      /*****************************************************************
       * You can change these lines                                    *
       *****************************************************************/
      BlogToc.theme( 'bootstrap-3', 'css/bootstrap-3/bt_bootstrap-3.css', {
        "id": "bootstrap-3",
        /*"loader": "",*/
        /*"header": "",*/
        /*"label": "",*/
        /*"alphabet": "",*/
        "button": "btn",
        "filter": "clearfix",
        "display": "b3_form_inline pull-left",
        "search": "b3_form_inline pull-right",
        "query": "form-control",
        "table": "table",
        "footer": "clearfix",
        "result": "pull-left",
        "pagination": "pull-right",
        "pagination ul": "pagination",
        "pagination current": "active",
        "pagination disabled": "disabled"
      });
      /*****************************************************************
       * End changing lines                                            *
       *****************************************************************/

    })();
  };

  if ( typeof window !== 'undefined' && window.BlogToc ) {
    loadTheme( window.BlogToc );
  }

})();