// BlogToc language configuration
// language : English (America)
// author : Cluster Amaryllis

(function( window, undefined ){
  
  var loadLang = function( BlogToc ) {
    (function(){

      /*****************************************************************
       * You can change these lines                                    *
       *****************************************************************/
      BlogToc.language( 'en-US', {
        labelAll: 'All',
        newLabel: 'New',
        index: '#',
        thumbnail: 'Thumb',
        title: 'Titles',
        author: 'Authors',
        comment: 'Comments',
        publishDate: 'Published',
        updateDate: 'Updated',
        summary: 'Summaries',
        display: ' records per page',
        search: 'Search :',
        noRecords: 'No matching records found',
        result: 'Showing {begin} to {end} out of {total}',
        firstPage: '&laquo; First',
        lastPage: 'Last &raquo;',
        prevPage: '&lsaquo; Prev',
        nextPage: 'Next &rsaquo;',
        updateMessage: 'Updates were found. Reload.',
        errorMessage: 'This error message is part of BlogToc application & occurred because one of following reasons :' + 
          '\n' +
          '\n • The URL you provide is not valid.' +
          '\n • The URL you provide is not a blogspot service.' +
          '\n • The blog is a private blog.' +
          '\n • The blog has been deleted.' +
          '\n • There is a trouble in your internet connection.'
      });
      /*****************************************************************
       * End changing lines                                            *
       *****************************************************************/

    })();
  };

  if ( typeof window !== 'undefined' && window.BlogToc ) {
    loadLang( window.BlogToc );
  }

})( window );