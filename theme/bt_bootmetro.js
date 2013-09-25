// BlogToc theme configuration
// theme : bootmetro, @link http://aozora.github.io/bootmetro/
// author : Cluster Amaryllis

(function(){
  
  var loadTheme = function( BlogToc ) {
    (function(){

      /*****************************************************************
       * You can change these lines                                    *
       *****************************************************************/
      BlogToc.theme( 'bootmetro', 'css/bootmetro/bt_bootmetro.css', {
        "id": "bootmetro",
        /*"loader": "",*/
        /*"header": "",*/
        /*"label": "",*/
        /*"alphabet": "",*/
        "button": "btn",
        "filter": "clearfix",
        "display": "pull-left",
        "search": "pull-right",
        /*"query": "",*/
        "table": "table",
        "footer": "clearfix",
        "result": "pull-left",
        "pagination": "pull-right pagination",
        /*"pagination ul": "",*/
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