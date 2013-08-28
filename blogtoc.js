/**!
* BlogToc v1.1.0
* Copyright 2013 Cluster Amaryllis
* Licensed under the Apache License v2.0
* http://www.apache.org/licenses/LICENSE-2.0
* 
* A javascript plugin to make table of contents for blogspot using Blogger Feed API.
*/

!(function() {

  'use strict';

  var loadApp = function() {
    
    (function() {

      var VERSION = '1.1.0';

      var BASE_URL = '//googledrive.com/host/0B-ME4OmVndQzMFNaMWpqVzVYUFE/' + VERSION + '/';

      var alphabet = '#|A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z'.split('|'),
        days = 'Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday'.split('|'),
        months = 'January|February|March|April|May|June|July|August|September|October|November|December'.split('|');

      var authorThumb = 'https://lh4.googleusercontent.com/-QhzzNTYkzbE/AAAAAAAAAAI/AAAAAAAAAAA/voMJT6RfB_o/s1600/photo.jpg',
        blankThumb = 'http://3.bp.blogspot.com/-trkoRRazZ7A/UdtEVufkxiI/AAAAAAAABxI/DOJ7jAUv1G4/s1600/blank.gif',
        notFoundThumb = 'http://3.bp.blogspot.com/-p7gZDNwTJbw/UdkqBnBb1bI/AAAAAAAAALI/hoCIpF74N80/s1600/image_not_available.jpg',
        sampleThumb = 'http://s20.postimg.org/7oz0eeuyx/blank.gif';

      var httpRegex = /.*?:\/\/|\/$/g, // remove http:// or trailing slash
        thumbRegex = /s\d+\-?\w?/gi, // thumbnail regex
        whitespaceRegex = /(^\s+|\s{2,}|\s+$)/g, // remove whitespace
        stripHtmlRegex = /(<([^>]+)>)/ig, // strip html tags
        noSortRegex = /^(index|thumbnail)$/i, // don't sorting
        noGenerateRegex = /^(actualImage|authorThumbnail|badge|category|commentURL|fullSummary|publishDateFormat|titleURL|thumbConfig|updateDateFormat)$/i; // don't generate

      var themes = {},
        languages = {};

      var defaultLanguage = 'en-US',
        defaultTheme = 'bootstrap';

      var bootmetroCSS = '//cdn.jsdelivr.net/bootmetro/1.0.0a1/css/bootmetro-icons.min.css';
      
      var BlogTocApps = function ( element, option ) {
      
        var _parent = element,
          opts, config, feed,
          root, loader, header, filter, tabler, footer, resulter, paging;

        var _alpha = alphabet.slice(0);
        
        _parent.BTAPP = {
      
          /* Run Apps
           * @param : <object> options
           ****************************************************************/
          run: function( options ) {
            
            var _self = this;
            
            // Default Options
            var defaults = {
              blogtocId: '',
              date: {
                day: days,
                month: months,
                render: function( date, option ) {
                  return option.date.day[date.getDay()] + 
                    ', ' + option.date.month[date.getMonth()] + 
                    ' ' + date.getDate() + 
                    ' ' + date.getFullYear();
                }
              },
              display: {
                setup: 10,
                template: [ 5, 10, 25, 50, 'All' ]
              },
              extendClass: {},
              feedType: 'default',
              label: { 
                setup: 'All',
                setupAlphabet: 'All',
                define: [], 
                exception: false,
                showLabel: true,
                cloudLabel: false,
                showAlphabetLabel: true,
                cloudAlphabetLabel: true,
                includeLabelAll: true,
                includeAlphabetLabelAll: true
              },
              language: {
                setup: defaultLanguage,
                custom: {}
              },
              newBadge: {
                setup: 5,
                render: function( language ) {
                  return '<span class="label">' + language + '</span>';
                }
              },
              pagination: {
                adjacents: 2
              },
              progress: {
                render : function( elem, progress ) {
                  
                  var span;
                  
                  // check the span container for proggress time
                  // if it's already there, update the container
                  // if it's not, create new html wrapper
                  if ( span = elem.getElementsByTagName('span')[0] ) {
                    span.innerHTML = progress;
                  } else { 
                    elem.innerHTML = 'Loading <span>' + progress + '</span> %';
                  }
                }
              },
              search: {
                markerRender: function( match ) {
                  return '<b>' + match + '</b>';
                }
              },
              sorting: { 
                key: 'title', 
                order: 'ascending'
              },
              summary: {
                wordLimit: 200
              },
              theme: {
                setup: defaultTheme
              },
              table: {
                order: 'index;thumbnail;title;publishDate;updateDate;author;comment',
                initDataLoad: 10,
                showHeader: true,
                indexWidthPoint : 2.5,
                authorWidthPoint : 10.5,
                commentWidthPoint : 9,
                publishDateWidthPoint : 12.5,
                summaryWidthPoint : 25,
                thumbnailWidthPoint : 7,
                titleWidthPoint : 28,
                updateDateWidthPoint : 12.5
              },
              thumbnail: {
                blank: blankThumb,
                notFound: notFoundThumb,
                sample: sampleThumb,
                size: 72,
                authorSize: 36,
                authorThumbnail: true
              },
              url: 'googleblog.blogspot.com'
            };

            // extend user options
            opts = _parent.BTOptions = _extends( defaults, options );
            // setting up feed
            feed = _parent.BTFeed = {
              data: [],
              label: [],
              count: 0
            };
            // setting up config
            config = _parent.BTConfig = {
              cache: {},
              iotf: {},
              iterate: 0,
              order: {},
              registeredEvent: {},
              searchRegex: null,
              searchState: false
            };

            // Build language starter
            _BTBuildLang( opts.language.setup, languages, opts.language.custom );
            // Build theme starter
            _BTBuildTheme( opts.theme.setup, themes, opts.extendClass );
            // add bootmetro icon stylesheet
            // @link http://aozora.github.io/bootmetro
            _addCSSOnce( bootmetroCSS );
            
            // save necessary element
            root = _parent.BTID;
            loader = root.firstChild;
            header = _nextElement( loader );
            filter = _nextElement( header );
            tabler = _nextElement( filter );
            footer = _nextElement( tabler );
            
            // apply classes
            _extendClass( root, opts.extendClass.blogtoc_id );
            _extendClass( loader, opts.extendClass.blogtoc_loader );
            _extendClass( header, opts.extendClass.blogtoc_header );
            _extendClass( filter, opts.extendClass.blogtoc_filter );
            _extendClass( tabler, opts.extendClass.blogtoc_table );
            _extendClass( footer, opts.extendClass.blogtoc_footer );
            
            // init progressbar / loader
            opts.progress.render( loader, 0 );
            // set id
            if ( opts.blogtocId ) { 
              root.id = opts.blogtocId; 
            }

            // cache the request
            config.cache.req = new Array();
            // prepare cache for table header
            config.cache.thead = {};

            //set not available thumbnail for author
            config.nat = authorThumb.replace( thumbRegex, 's' + opts.thumbnail.authorSize + '-c' );
            // get resize image on the fly server, take a sample
            config.iotf = _testCDN( opts.thumbnail.sample );
            // map the table header data
            config.mapper = opts.table.order.split(';');
            // setup for table header width
            config.mapperWidth = new Array();
            // setup for thumbnail anchor inline-css
            config.tbwrapper = 'display:block;width:' + opts.thumbnail.size + 'px;height:'+ opts.thumbnail.size + 'px;';
            // setup for thumbnail image inline-css
            config.tbimg = 'width:' + opts.thumbnail.size + 'px;height:'+ opts.thumbnail.size + 'px;';
            // setup for display
            config.records = opts.display.setup || opts.display.template[0];
            // setup for page
            config.page = 1;
            // setup for page state history
            config.pageState = 1;
            
            // json callback
            window[ 'BTJSONCallback_' + root.id ] = function ( json ) {
              _self.initFeed( json );
            };

            var url = opts.url.replace( httpRegex, '' ),
              scriptID = url + '_' + _uniqueNumber();

            url = '//' + url + 
              '/feeds/posts/summary/?' + 
              'max-results=0&' + 
              'alt=json-in-script&' + 
              'callback=BTJSONCallback_' + root.id;

            // setup the script id
            config.cache.req[0] = scriptID;
            
            // requesting which image on the fly service will be using
            // do recurren with 1s delay until its found one
            var _waiting = function() { 
              setTimeout( function() {
                config.iotf.server ?
                  _addJS( url, scriptID, function() {
                    // trouble loading feed, show error message
                    alert( opts.language.custom.errorMessage );
                    // remove blogtoc
                    _removeElement( root );
                  }) :
                  _waiting();
              }, 1000 );
            }; 

            _waiting();
          },
          
          /* Initialization json callback
           * @param  : <json>json
           ****************************************************************/
          initFeed: function( json ) {
          
            var _self = this;
            
            // object and array => value by reference
            var jfeed = json.feed;
            
            // get total blog posts
            if ( 'openSearch$totalResults' in jfeed ) {
              feed.count = jfeed.openSearch$totalResults.$t;
            }

            // get total label
            if ( 'category' in jfeed ) {

              var define = opts.label.define, dLen = define.length,
                exception = opts.label.exception,
                i = 0, len = jfeed.category.length;

              for (; i < len; i++) {
                
                var category = jfeed.category[i].term;

                // check if options has specific label
                if ( dLen ) {
                  if ( ( exception && _inArray( category, define ) ) || 
                       ( !exception && !_inArray( category, define ) ) ) {
                    continue;
                  }
                }

                feed.label.push( jfeed.category[i].term );
              }
            }

            // sorting the label by ascending
            feed.label.sort(function ( a, b ) {
              return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
            });
            
            // add label all
            if ( opts.label.includeLabelAll ) { 
              feed.label.unshift( opts.language.custom.labelAll ); 
            }
            // add alphabet label all
            if ( opts.label.includeAlphabetLabelAll ) {
              _alpha.unshift( opts.language.custom.labelAll );
            }

            // json callback
            window[ 'BTLDJSONCallback_' + root.id ] = function (json) {
              _self.loadFeed( json );
            };

            var i = 0, startIdx = 0,
              request = Math.ceil( feed.count / 500 ),
              url = opts.url.replace( httpRegex, '' ),
              scriptID;

            url = '//' + url + 
              '/feeds/posts/'+ opts.feedType +
              '/?' + 
              'max-results=500&' + 
              'alt=json-in-script&' + 
              'callback=BTLDJSONCallback_' + root.id;

            for ( ; i < request; i++ ) {

              startIdx = ( i * 500 ) + 1;
              scriptID = url + '_' + _uniqueNumber();
              config.cache.req[ i + 1 ] = scriptID;

              _addJS( url + '&start-index=' + startIdx, scriptID );
            }
          },
          
          /* Load the main feed from JSON callback
           * @param : <json>json
           ****************************************************************/
          loadFeed : function( json ) {
            
            var _self = this;
            
            var jfeed = json.feed,
              temp = [],
              obj = {};
              
            var data = feed.data,
              count = feed.count,
              size = opts.thumbnail.size,
              asize = opts.thumbnail.authorSize,
              notfound = opts.thumbnail.notFound,
              description = opts.summary.wordLimit,
              render = opts.date.render,
              server = config.iotf.server,
              progress = opts.progress.render;

            // check entry feed
            if ( 'entry' in jfeed ) {
            
              var i = 0, len = jfeed.entry.length;
              
              var saveFeed = function() {
              
                setTimeout( function(){

                  var entry = jfeed.entry[i];

                  // post title section, removing white space
                  obj.title = entry.title.$t.replace( whitespaceRegex, '' );

                  // published and updated date section
                  var pbDate = entry.published.$t.substring( 0, 10 ).split('-'),
                    pbTime = entry.published.$t.substring( 11, 19 ).split(':'),
                    upDate = entry.updated.$t.substring( 0, 10 ).split('-'),
                    upTime = entry.updated.$t.substring( 11, 19 ).split(':');

                  obj.publishDateFormat = _makeDate( pbDate,pbTime );
                  obj.updateDateFormat  = _makeDate( upDate,upTime );
                  obj.publishDate = render( obj.publishDateFormat, opts );
                  obj.updateDate  = render( obj.updateDateFormat, opts );

                  // summary section
                  var fullSummary = ( 'summary' in  entry ) ? 
                    entry.summary.$t : 
                    ( ('content' in entry) ? 
                      entry.content.$t : ''
                    ), summary;

                  // remove whitespace and strip html tags
                  summary = fullSummary.replace( stripHtmlRegex, '' )
                                       .replace( whitespaceRegex, '' );
                  
                  // add word limiter
                  if ( summary.length > description ) {

                    summary = summary.substring( 0, description );
                    summary = summary.substring( 0, summary.lastIndexOf(' ') ) + '....';
                  }

                  obj.fullSummary = fullSummary;
                  obj.summary = summary;
                  
                  // thumbnails section
                  var imgSrc;
                  
                  obj.thumbConfig = {};

                  // check for default blog thumbnail entry
                  // if it's not found find <img> tag in summary
                  if ( 'media$thumbnail' in entry ) { 
                    
                    obj.thumbnail = entry.media$thumbnail.url;
                    obj.actualImage = obj.thumbnail.replace( thumbRegex, 's0' );
                    obj.thumbnail = obj.thumbnail.replace( '/s72-c/', '/s' + size + '-c/');

                  } else if ( imgSrc = /<img [^>]*src=["|\']([^"|\']+)/gi.exec( fullSummary ) ) {
                    
                    obj.actualImage = imgSrc[1];
                    obj.thumbnail = _BTMakeThumbnail( obj.actualImage, size, server );

                  } else { 
                    
                    obj.actualImage = notfound;

                    // google service?
                    if ( thumbRegex.test( obj.actualImage ) ) { 
                      obj.thumbnail = obj.actualImage.replace( thumbRegex, 's' + size + '-c' );
                    } else {
                      obj.thumbnail = _BTMakeThumbnail( obj.actualImage, size, server );
                    }
                  }
                  
                  // title & replies URL section
                  for ( var k = 0; k < entry.link.length; k++ ) {

                    if ( entry.link[ k ].rel === 'replies' ) {
                      obj.commentURL = entry.link[ k ].href;
                    } else if (entry.link[ k ].rel === 'alternate' ) {
                      obj.titleURL = entry.link[ k ].href;
                    }
                  }

                  // set hashtag, if there is no comment
                  if ( !obj.commentURL ) {
                    obj.commentURL = "#";
                  }

                  // comments count section
                  obj.comment = ( 'thr$total' in entry ) ? +entry.thr$total.$t : 0;
                  
                  // author information section
                  obj.author = entry.author[0].name.$t;
                  obj.authorThumbnail = entry.author[0].gd$image.src.replace( thumbRegex, 's' + size + '-c' );

                  // posts categories section
                  if ( 'category' in entry ) {
                    for ( var k = 0; k < entry.category.length; k++ ) {
                      temp.push( entry.category[ k ].term );
                    }
                  }

                  obj.category = temp.slice(0);

                  // populate data
                  data.push( obj ); 
                  
                  // reset
                  obj = {};
                  temp.length = 0;

                  // increment
                  config.iterate++;
                  i++;
                  
                  // increase progress
                  var percentage = Math.round(config.iterate * 100 / count);

                  progress( loader, percentage );
                  
                  // recurren if still not reach the limit
                  if ( i < len ) {
                    saveFeed();
                  }

                  // the end of total blog post, 
                  // build user interface & hide loader
                  if ( config.iterate >=  count ) {
                    
                    setTimeout( function() {
                      loader.style.display = 'none';
                      _self.buildUI();
                    }, 800 );
                  }
                
                }, 1 );
              }; 
              
              saveFeed();
            }

          }, 
          
          /* Build the starter user interface
           ****************************************************************/
          buildUI: function() {
          
            var _self = this;
            
            var klass = opts.extendClass,
              size = opts.thumbnail.size,
              sortingOrder = opts.sorting.order,
              sortingKey = opts.sorting.key;
            
            var labelFn = "BlogToc.label(this, this.value, document.getElementById('"+ root.id +"')); return false;",
              alphaFn = "BlogToc.alphabet(this, this.value, document.getElementById('"+ root.id +"')); return false;",
              displayFn = "BlogToc.display(this.value, document.getElementById('"+ root.id +"')); return false;",
              searchFn = "BlogToc.search(this.value, document.getElementById('"+ root.id +"')); return false;",
              sortFn;

            // label section
            _self.makeLabel( feed.label, 'showLabel', 'cloudLabel', 'setup', 'blogtoc_label', labelFn );
            _self.makeLabel( _alpha, 'showAlphabetLabel', 'cloudAlphabetLabel', 'setupAlphabet', 'blogtoc_alphabet', alphaFn );
            
            var display = _arrayInsertSort( opts.display.setup, opts.display.template ),
              j = 0, dLen = display.length, dVal,
              div, select, input, option, label, txt;
            
            // display section
            div = _createElement( 'div', null, null, 'blogtoc_display' );
            _extendClass( div, klass.blogtoc_display );

            label = _createElement('label');
            select = _createElement( 'select', { onchange: displayFn });
            txt = document.createTextNode( ' ' + opts.language.custom.display );
            
            for ( ; j < dLen; j++ ) {

              // if value string means all post
              dVal = ( typeof display[ j ] === 'string' ) ? feed.count : display[ j ];
              
              option  = _createElement( 'option', { value: dVal }, display[ j ] );
              
              // arrange to the default setup selected
              if ( display[ j ] === opts.display.setup ) {
                option.selected = true;
              }
              
              select.appendChild( option );
            }

            label.appendChild( select );
            label.appendChild( txt );
            div.appendChild( label );
            filter.appendChild( div );
            
            // search section
            div = _createElement( 'div', null, null, 'blogtoc_search' );
            _extendClass( div, klass.blogtoc_search );

            label = _createElement('label');
            txt = document.createTextNode( opts.language.custom.search + ' ' );

            input = _createElement( 'input', { type: 'text', onkeyup: searchFn }, null, 'blogtoc_query' );
            _extendClass( input, klass.blogtoc_query );
            
            label.appendChild( txt );
            label.appendChild( input );
            div.appendChild( label );
            filter.appendChild( div );
            
            var j = 0, mLen = config.mapper.length, mData,
              tableChild, thead, tr, th, node, span;
            
            // thead section
            
            // trying calculate the <th> width
            _self.calculate();

            thead = _createElement('thead');
            tr = _createElement('tr');
                
            for ( ; j < mLen; j++ ) {

              mData = config.mapper[ j ];
              sortFn = "BlogToc.sort('"+ mData +"', document.getElementById('"+ root.id +"')); return false;";
              
              th = _createElement( 'th', { width: config.mapperWidth[ j ] });
              
              if ( noGenerateRegex.test( mData ) ) {
                continue;
              } else if ( noSortRegex.test( mData ) ) {
                node = document.createTextNode( opts.language.custom[ mData ] );
              } else {
                span = _createElement( 'span', null, null, 'icon-menu' );
                node = _createElement( 'a', { href: "javascript:void(0)", onclick: sortFn }, opts.language.custom[ mData ] );
                
                node.appendChild( span );
                
                // populate config thead data
                config.cache.thead[ mData ] = span;
              }
              
              // populate sorting order cache
              config.order[mData] = null;
              
              th.appendChild( node );
              tr.appendChild( th );
            }
            
            thead.appendChild( tr );

            // IE strangely add tbody on its own, so position the thead correctly
            tableChild = tabler.firstChild;
            try {
              tabler.style.display = 'table'; 
            } catch ( e ) {
              tabler.style.display = 'block';
            }
            tabler.insertBefore( thead, tableChild );

            // don't show header if option showHeader is false
            if ( !opts.table.showHeader ) { 
              _removeElement( thead )
            }
            
            // footer section
            resulter = _createElement( 'div', null, null,'blogtoc_result' );
            _extendClass( resulter, klass.blogtoc_result );
            footer.appendChild( resulter );

            paging = _createElement( 'div', null, null, 'blogtoc_pagination' );
            _extendClass( paging, klass.blogtoc_pagination );
            footer.appendChild( paging );
            
            // setting up new badge
            _self.addBadge();

            // init thead sorting direction icon
            config.cache.thead[ sortingKey ].className = ( sortingOrder === 'ascending' ) ?
              'icon-arrow-up-4' : 
              'icon-arrow-down-5';
            // init sorting by
            config.order[ sortingKey ] = sortingOrder;
            // Do Sorting
            _self.doSorting( sortingKey, sortingOrder );

            // Set Label or Alphabet or Compile data
            if ( !opts.label.showLabel && !opts.label.showAlphabetLabel ) {
              _self.compile();
            } else {
              config.currentLabel = opts.label.showLabel ? opts.label.setup : null;
              config.currentAlphabet = opts.label.showAlphabetLabel ? opts.label.setupAlphabet : null;

              if ( opts.label.showLabel ) {
                _self.displayLabel( config.currentLabel, null, null, true );
              } else {
                _self.displayAlphabet( config.currentAlphabet, null, null, true );
              }
            }

            // Clear any references
            window[ 'BTJSONCallback_' + root.id ] = null;
            window[ 'BTLDJSONCallback_' + root.id ] = null;

            for ( var k = 0, rLen = config.cache.req.length; k < rLen; k++ ) {
              _removeElement( _getId( config.cache.req[ k ] ) );
            }
          },
          
          /* Build pagination using modified digg style pagination 
           * http://www.strangerstudios.com/sandbox/pagination/diggstyle.php
           ****************************************************************/
          buildPagination: function() {

            var klass = opts.extendClass,
              uClass = klass['blogtoc_pagination ul'],
              cClass = klass['blogtoc_pagination current'],
              dClass = klass['blogtoc_pagination disabled'];

            var i, limit = Math.ceil( feed.data.length / config.records ),
              page = config.page, next_page = page + 1, prev_page = page - 1,
              snpl = page + 6, lnpl = page + 46, sppl = page - 6, lppl = page - 46,
              adj = opts.pagination.adjacents, adjJump = adj * 2,
              rID = root.id,
              ul, ulRecent, li; 

            // limit more than one
            if ( limit > 1 ) {
              ul = _createElement( 'ul', null, null, uClass );
              // current page not at first one
              if ( page > 1 ) {
                // first page
                li = _BTMakePageList( 1, opts.language.custom.firstPage, 'a', rID );
                ul.appendChild( li );
                // prev page
                li = _BTMakePageList( prev_page,opts.language.custom.prevPage, 'a', rID );
              } else {
                li = _BTMakePageList( null, opts.language.custom.prevPage, 'span', rID, dClass );
              }
              ul.appendChild( li );
              
              // the pages are not that big
              if ( limit < 7 + adjJump ) {
                for ( i = 1; i <= limit; i++ ) {
                  if ( i === page ) {
                    li = _BTMakePageList( null, i, 'span', rID,cClass );
                  } else {
                    li = _BTMakePageList( i, i, 'a', rID );
                  }
                  ul.appendChild( li );
                }
              } else if ( limit > 5 + adjJump ) {
                // left pages lapping
                if ( lppl - adjJump > 1 ) {
                  i = lppl - adjJump;
                  li = _BTMakePageList( i, i, 'a', rID );
                  ul.appendChild( li );
                }
                if ( sppl - adjJump > 1 ) {
                  i = sppl - adjJump; 
                  li = _BTMakePageList( i, i, 'a', rID );
                  ul.appendChild( li );
                }
                
                // beginning, middle, ending
                if (page < 2 + adjJump) {
                  for ( i = 1; i < 4 + adjJump; i++ ) {
                    if ( i === page ) {
                      li = _BTMakePageList( null, i, 'span', rID, cClass );
                    } else {
                      li = _BTMakePageList( i, i, 'a', rID );
                    }               
                    ul.appendChild( li );
                  }

                  li = _BTMakePageList(null,'...','span',rID);
                  ul.appendChild(li);

                } else if ( limit - adjJump > page && page > 1 + adjJump ) { 
                  li = _BTMakePageList( null, '...', 'span', rID );
                  ul.appendChild( li );

                  for ( i = page - adj; i <= page + adj; i++ ) {
                    if ( i === page ) {
                      li = _BTMakePageList( null, i, 'span', rID, cClass );
                    } else {
                      li = _BTMakePageList( i, i, 'a', rID );
                    }               
                    ul.appendChild( li );
                  }

                  li = _BTMakePageList( null, '...', 'span', rID );
                  ul.appendChild( li );

                } else { 

                  li = _BTMakePageList( null, '...', 'span', rID );
                  ul.appendChild( li );

                  for ( i=limit - (2 + adjJump); i <= limit; i++ ) {
                    if ( i === page ) {
                      li = _BTMakePageList( null, i, 'span', rID, cClass );
                    } else {
                      li = _BTMakePageList( i, i, 'a', rID );
                    }               
                    ul.appendChild( li );
                  }
                }
                
                // right pages lapping
                if ( snpl + adjJump < limit ) {
                  i = snpl + adjJump;
                  li = _BTMakePageList( i, i, 'a', rID );
                  ul.appendChild( li );
                }
                if ( lnpl + adjJump < limit ) {
                  i = lnpl + adjJump;
                  li = _BTMakePageList( i, i, 'a', rID );
                  ul.appendChild( li );
                }
              }
              
              // current page not at last one
              if ( page < limit ) {
                // next page
                li = _BTMakePageList( next_page, opts.language.custom.nextPage, 'a', rID );
                ul.appendChild( li );
                // last page
                li = _BTMakePageList( limit, opts.language.custom.lastPage, 'a', rID );
              } else {
                li = _BTMakePageList( null, opts.language.custom.nextPage, 'span', rID, dClass );
              }
              ul.appendChild( li );
            }
            
            if ( ulRecent = paging.getElementsByTagName('ul')[0] ) {
              ul ?  
                paging.replaceChild( ul, ulRecent ) :
                paging.removeChild( ulRecent );

            } else {
              ul ?
                paging.appendChild( ul ) :
                null;
            }
          },
          
          /* Make Label
           * @param  : <array>data
           * @param  : <string>optShow
           * @param  : <string>optCloud
           * @param  : <string>optName
           * @param  : <string>className
           * @param  : <string>fn
           ****************************************************************/
          makeLabel: function( data, optShow, optCloud, optName, className, fn ) {
          
            var i = 0, len = data.length,
              selection = false, val,
              labelNode, contentNode;
            
            if ( opts.label[ optShow ] ) {
              if ( opts.label[ optCloud ] ) {
                labelNode = _createElement('div', null, null, className );
                
                for ( ; i < len; i++ ) {
                  val = ( data[ i ] === opts.language.custom.labelAll ) ? 
                    'All' : data[ i ];
                  
                  contentNode = _createElement( 'button', { type: 'button', value: val, onclick: fn }, data[ i ] );
                  _extendClass( contentNode, opts.extendClass.blogtoc_button );
                  
                  // disabled the setup selection
                  if ( val === opts.label[ optName ] ) {
                    contentNode.disabled = true;
                    selection = true;
                  }

                  labelNode.appendChild( contentNode );
                }

                // No default selection, force to using the first one
                if ( !selection ) {
                  opts.label[ optName ] = labelNode.firstChild.getAttribute('value');
                  labelNode.firstChild.disabled = true;
                }
                
              } else {
                labelNode = _createElement( 'select', { onchange: fn }, null, className );
                
                for ( ; i < len; i++ ) {
                  val = ( data[i] === opts.language.custom.labelAll ) ? 
                    'All' : data[ i ];
                  
                  contentNode = _createElement( 'option', { value: val }, data[ i ] );
                  
                  // set to the selected setup
                  if ( val === opts.label[ optName ] ) {
                    contentNode.selected = true;
                    selection = true;
                  }

                  labelNode.appendChild( contentNode );
                }

                // No default selection, force to using the first one
                if ( !selection ) {
                  opts.label[ optName ] = labelNode.firstChild.value;
                  labelNode.firstChild.selected = true;
                }
              }
            
              header.appendChild( labelNode );
            }
          },
          
          /* Build total result
           ****************************************************************/
          buildResult: function() {
            
            var len = feed.data.length,
              max = config.page * config.records;
              
            var lookup = {
              begin: len ? ( ( config.page - 1 ) * config.records ) + 1 : 0,
              end: max < len ? max : len,
              total: len
            }, 
              output = opts.language.custom.result.replace( /\{(.*?)\}/gi, function ( match, p1 ) {
                return "<b>" + lookup[ p1 ] + "</b>"
            });
            
            resulter.innerHTML = output;
          },
          
          /* Display Label
           * @param : <string>val
           * @param : <HTMLElement>el
           * @param : <boolean>prevent
           * @param : <boolean>grab
           ****************************************************************/
          displayLabel: function( val, el, prevent, grab ) {
            
            var _self = this;
            
            // option grab original data from cache
            if ( grab ) {
              feed.data = config.cache.original.slice(0);
            }
            
            // synchronize data with current alphabet label
            if ( grab && config.currentAlphabet != null ) {
              _self.displayAlphabet( config.currentAlphabet, null, true );
            }

            // don't proccess if there is no current label exists
            if ( config.currentLabel == null ) {
              return;
            }
            
            // IE<=8 doesn't recognize button value
            if ( val === '' ) {
              val = el.getAttribute('value');
            }

            // change current label from value
            config.currentLabel = val;
            
            if ( val !== 'All' ) {
              var temp = new Array();
              // filter data that only match with certain category
              for ( var i = 0, len = feed.data.length; i < len; i++ ) {
                if ( _inArray( val, feed.data[ i ].category ) ) {
                  temp.push( feed.data[ i ] );
                }
              }
              feed.data = temp.slice(0);
            }
            
            // cache the data
            config.cache.tempData = feed.data.slice(0);
            
            // prevent process?
            if ( !prevent ) {
              // disabled current selection, and enabled the rest
              if ( el && el.tagName.toLowerCase() === 'button' ) {
                var nodes = el.parentNode.childNodes,
                  i = nodes.length;
                
                while ( i-- ) {
                  nodes[ i ].disabled = false;
                }
                el.disabled = true;
              }
              
              // reset to page one
              config.page = 1;
              // reset page state also
              config.pageState = 1;
              
              var value;

              if ( value = filter.getElementsByTagName('input')[0].value ) { 
                _self.query( value );
              } else { 
                _self.compile();
              }
            }
            
          },
          
          /* Display Alphabet Label
           * @param : <string>val
           * @param : <HTMLElement>el
           * @param : <boolean>prevent
           * @param : <boolean>grab
           ****************************************************************/
          displayAlphabet: function( val, el, prevent, grab ) {
            
            var _self = this;
            
            // option grab original data from cache
            if ( grab ) {
              feed.data = config.cache.original.slice(0);
            }
            
            // synchronize data with current label
            if ( grab && config.currentLabel != null ) {
              _self.displayLabel( config.currentLabel, null, true );
            }

            // don't proccess if there is no current alphabet label exists
            if ( config.currentAlphabet == null ) {
              return;
            }
            
            // IE<=8 doesn't recognize button value
            if ( val === '' ) {
              val = el.getAttribute('value');
            }

            // change current alphabet label from value
            config.currentAlphabet = val;
            
            // don't filter the data if value is All
            if ( val !== 'All' ) {
              var temp = new Array(),
                alphaRegex;
                
              if ( val === '#' ) { // symbolic
                alphaRegex = new RegExp( '^[^A-Z]{1,}.*', 'i' );
              } else { // alphabetic
                alphaRegex = new RegExp( '^' + val + '{1,}.*', 'i' );
              }
              
              // filter data that only match with first alphabet
              for ( var i = 0, len = feed.data.length; i < len; i++ ) {
                if ( !!~feed.data[i].title.search( alphaRegex ) ) {
                  temp.push( feed.data[ i ] );
                }
              }
              feed.data = temp.slice(0);
            }
            
            // cache the data
            config.cache.tempData = feed.data.slice(0);
            
            // prevent process?
            if ( !prevent ) {
            
              // disabled current selection, and enabled the rest
              if ( el && el.tagName.toLowerCase() === 'button' ) {
                var nodes = el.parentNode.childNodes,
                  i = nodes.length;
                
                while ( i-- ) {
                  nodes[ i ].disabled = false;
                }
                el.disabled = true;
              }
              
              // reset to page one
              config.page = 1;
              // reset page state also
              config.pageState = 1;
              
              var value;
              
              if ( value = filter.getElementsByTagName('input')[0].value ) {
                _self.query( value );
              } else {
                _self.compile();
              }
            }
          },
          
          /* Make preparation for sorting
           * @param : <string>key
           ****************************************************************/
          sorting: function( key ) {
            
            var _self = this;
            
            var order = config.order,
              thead = config.cache.thead;
            
            // no data, just return the data
            if ( !feed.data.length ) { 
              return; 
            }
            
            // set to "key" sorting state, others reset to default state
            for ( var prop in thead ) {
              if ( key !== prop ) {
                thead[ prop ].className = 'icon-menu';
                order[ prop ] = 'descending';
              } else {
                thead[ prop ].className = ( order[ prop ] === 'ascending' ) ? 
                  'icon-arrow-down-5' : 
                  'icon-arrow-up-4';
                order[ prop ] = ( order[ prop ] === 'ascending' ) ? 
                  'descending' : 
                  'ascending';        
              }
            }

            // do sorting
            _self.doSorting( key, order[ key ] );
            // compile data
            _self.compile();
          },
          
          /* Sorting the feed based on key & order
           * @param : <string>key
           * @param : <string>order
           ****************************************************************/
          doSorting: function( key, order ) {
        
            var data = feed.data,
              day = opts.date.day,
              cache = config.cache;
            
            cache[ key ] = cache[ key ] || {};
                
            // generate new data feed
            feed.data = ( order === 'ascending' ) ? 
              _BTSort( data, key, day ).slice(0) :
              _BTSort( data, key, day ).slice(0).reverse();
            
            // cache original data
            if ( cache.original ) {
              cache.original = ( order === 'ascending' ) ? 
                _BTSort( cache.original, key, day ).slice(0) :
                _BTSort( cache.original, key, day ).slice(0).reverse(); 

            } else {
              cache.original = feed.data.slice(0);
            }
          },
          
          /* Change the display based on value
           * @param : <number>val
           ****************************************************************/
          changeDisplay: function( val ) {
            
            var _self = this;
            
            config.records = +val;
            
            // no data in current page, reset to first page
            if ( !feed.data[ ( config.page - 1 ) * config.records ] ) {
              config.page = 1;
            }
            // compile data
            _self.compile();
          },
          
          /* Do searching data
           * @param : <string>val
           ****************************************************************/
          query: function( val ) {
            
            var _self = this;
            
            // string escape
            // @link http://stackoverflow.com/a/3561711
            val = val.replace( /[-\/\\^$*+?.()|[\]{}]/g, '\\$&' );

            // grab the original data
            feed.data = ( !config.cache.tempData ) ?
              config.cache.original.slice(0) :
              config.cache.tempData.slice(0);
            
            if ( !val ) {
              var limit = Math.ceil( feed.data.length / config.records );

              config.searchRegex = null;
              config.page = ( config.pageState <= limit ) ?
                config.pageState : 
                1;

            } else {
              config.searchRegex = new RegExp( val, 'igm' );
              config.searchState = true;
              config.page = 1; // reset to page one
              
              var temp = new Array(),
                i = 0, len = feed.data.length;
              
              // filter data that only match with query
              for ( ; i < len; i++ ) {
                if ( !!~feed.data[ i ].title.search( config.searchRegex ) ) {
                  temp.push( feed.data[ i ] );
                }
              }
              feed.data = temp.slice(0);
            }

            // compile data
            if ( config.searchState ) { 
              _self.compile(); 
            }
          },
          
          /* Change page
           * @param : <int>val
           ****************************************************************/
          changePage: function(val) {
            
            var _self = this;
            
            config.page = +val;
            config.pageState = config.page;
            
            // scroll to blogtoc position
            window.scroll( root.offsetLeft, root.offsetTop );

            // compile data
            _self.compile();
          },
          
          /* Adding badge
           * @param : <int>val
           ****************************************************************/
          addBadge: function() {
            
            var _self = this;
            
            // first sorting by publish date descending
            _self.doSorting( 'publishDate', 'descending' );
            
            var data = feed.data,
              i = 0, len = data.length,
              badge = opts.newBadge.setup,
              badgeRender = opts.newBadge.render( opts.language.custom.newLabel );
            
            for ( ; i < len; i++ ) {
              if ( !badge ) {
                data[ i ].badge = '<span class="blogtoc_badge" style="display:none;"></span>';
              } else {
                data[ i ].badge = '<span class="blogtoc_badge">' + badgeRender + '</span>';
                badge--;
              }
            }
          },

          /* Calculate table header data width from option
           ****************************************************************/
          calculate: function() {

            var i = 0, len = config.mapper.length,
              data = config.mapper, opt = opts.table,
              count = 0, range;
              
            for ( ; i < len; i++ ) {
              count += opt[ data[ i ] + 'WidthPoint' ];
            }

            for ( i = 0; i < len; i++ ) {
              range = Math.round( opt[ data[ i ] + 'WidthPoint' ] / count * 100 );
              config.mapperWidth.push( range + '%' );
            }       
          },
          
          /* Mostly the main function that get called alot, change how the data is displayed
           ****************************************************************/
          compile: function() {

            var _self = this;
            
            var tbody, tbodyRecent, node;
            
            // Initialize
            config.cache.img = new Array();
            config.cache.aimg = new Array();
            config.cache.feedLeft = 0;

            if ( !config.searchRegex ) { 
              config.searchState = false; 
            }
            
            // Build table
            tbody = _createElement('tbody');
          
            var appendData = function( bID, el ) {

              if ( !el ) { 
                return; 
              }
              
              var id = bID.parentNode;
              
              var bConfig = id.BTConfig,
                bOpts = id.BTOptions,
                bFeed = id.BTFeed;
                
              var start = new Number( ( ( config.page - 1 ) * config.records ) + bConfig.cache.feedLeft ),
                end = start + bOpts.table.initDataLoad,
                records = config.page * bConfig.records,
                count = bFeed.data.length,
                size = bOpts.thumbnail.authorSize,
                j = start, idx = start, len = bConfig.mapper.length,
                dataType, data,
                tr, td;
              
              // if no data found, show empty result message
              if ( !count ) {               
                // don't show again, if the message already shown
                if ( !( el.getElementsByTagName('tr')[0] ) ) {
                  tr = _createElement('tr');
                  td = _createElement('td',{ colSpan: len }, bOpts.language.custom.noRecords, 'blogtoc_norecords' );
                  
                  tr.appendChild( td );
                  el.appendChild( tr );
                }
              }
              
              for ( ; j < end; j++ ) {
                
                if ( j >= records || j >= count ) { 
                  return; 
                }
                
                data = bFeed.data[ j ];

                // increment the feed left
                bConfig.cache.feedLeft++;
                // increment index
                idx++;
                
                tr = _createElement('tr');
                
                for ( var k = 0; k < len; k++ ) {
                
                  dataType = bConfig.mapper[ k ];
                  
                  td = _createElement('td');
                  
                  td.appendChild( _BTRenderContent( dataType, idx, data, bOpts, bConfig, td ) );
                  tr.appendChild( td );
                }
                el.appendChild( tr );
              }
            }; 

            appendData( root, tbody );
            
            // build result
            _self.buildResult();
            // build Pagination
            _self.buildPagination();
            
            // begin flexible scroll
            var flexScroll = function( bID ) {
              var rootHeight = bID.clientHeight,
                pageHeight = window.innerHeight || document.documentElement.clientHeight,
                scrollPosition = window.pageYOffset || document.documentElement.scrollTop,
                id = bID.getElementsByTagName('tbody')[0];
              
              if ( rootHeight - pageHeight - scrollPosition < 100 ) { 
                appendData( bID, id ); 
              }
            }
            
            // Make event handler
            var evtHandler = function() {
              _BTQueueImage( _parent.BTConfig.cache.img, _parent.BTOptions.thumbnail.notFound );
              _BTQueueImage( _parent.BTConfig.cache.aimg, _parent.BTConfig.nat );
              flexScroll( _parent.BTID );
            }; 

            evtHandler();
            
            // register event
            _registerEvent( config.registeredEvent, window, 'scroll', evtHandler );
            _registerEvent( config.registeredEvent, window, 'resize', evtHandler );
          
            // if tbody already has content, replace with new one
            if ( tbodyRecent = tabler.getElementsByTagName('tbody')[0] ) {
              tabler.replaceChild( tbody, tbodyRecent );
            } else { // otherwise create new one
              tabler.appendChild( tbody );
            }
          }
        }

        // Run
        var loadPlugin = function() {
          setTimeout( function() {
            // run apps after the language & theme setting is fully loaded
            if ( ( ( languages[ defaultLanguage ] && !_isEmptyObj( languages[ defaultLanguage ] ) ) || 
                 ( !_isEmptyObj( option.language ) && languages[ option.language.setup ] ) ) && 
                 ( ( themes[ defaultTheme ] && !_isEmptyObj( themes[ defaultTheme ] ) ) ||
                 ( !_isEmptyObj( option.theme ) && themes[ option.theme.setup ] ) ) ) {
              _parent.BTID.style.display = "block";
              _parent.BTAPP.run( option );
            } else {
              loadPlugin();
            }
          }, 100 );
        }; 

        loadPlugin();

        return;
      };
      
      /********************************************************************
       * HACKY FUNCTIONS MOSTLY FOR IE                  *
       ********************************************************************/
      // taken from MSDN Mozilla
      // @link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
      if ( !Array.prototype.indexOf ) {
        Array.prototype.indexOf = function ( searchElement /*, fromIndex */ ) {
        
          "use strict";
          
          if ( this == null ) {
            throw new TypeError();
          }
          var t = Object( this );
          var len = t.length >>> 0;

          if ( len === 0 ) {
            return -1;
          }
          
          var n = 0;
          
          if ( arguments.length > 1 ) {
            n = Number( arguments[1] );
            if ( n != n ) { // shortcut for verifying if it's NaN
              n = 0;
            } else if ( n != 0 && n != Infinity && n != -Infinity ) {
              n = ( n > 0 || -1 ) * Math.floor( Math.abs( n ) );
            }
          }
          
          if ( n >= len ) {
            return -1;
          }
          
          var k = n >= 0 ? n : Math.max( len - Math.abs( n ), 0 );
          
          for ( ; k < len; k++ ) {
            if ( k in t && t[ k ] === searchElement ) {
              return k;
            }
          }
          return -1;
        };
        
        // @link http://stackoverflow.com/a/498995
        if ( !String.prototype.trim ) {
          String.prototype.trim = function() { 
            return this.replace(/^\s+|\s+$/g, '');
          };
        }
      }

      /********************************************************************
       * EVENT HELPER FUNCTIONS                                           *
       ********************************************************************/
      /* Cross browser add event listener
       * @param  : <HTMLelement>el
       * @param  : <string>evt
       * @param  : <function>fn
       ********************************************************************/
      var _addEventListener = function( el, evt, fn ) {
        ( el.addEventListener ) ? 
          el.addEventListener( evt, fn, false ) :
          ( el.attachEvent ) ? 
            el.attachEvent( 'on' + evt, fn ) :
            el[ 'on' + evt ] = fn;
          
      };

      /* Register Event listener
       * @param  : <JSObject>db
       * @param  : <HTMLelement>el
       * @param  : <string>evt
       * @param  : <function>fn
       ********************************************************************/
      var _registerEvent = function( db, el, evt, fn ) {
        
        db[ el ] = db[ el ] || {};
        
        if ( !db[ el ][ evt ] ) {   
          db[ el ][ evt ] = fn;
          _addEventListener( el, evt, fn );
        }
      };

      /********************************************************************
       * DOM HELPER FUNCTIONS                                             *
       ********************************************************************/
      /* add class to element
       * @param  : <HTMLElement>el
       * @param  : <string>val
       * taken from https://github.com/jquery/jquery/blob/1.7.2/src/attributes.js
       ********************************************************************/    
      var _extendClass = function( el, val ) {
        
        if ( val ) {
        
          var classNames, setClass,
            i = 0;
          
          if ( !val && typeof val !== 'string' ) { 
            return; 
          }
          
          classNames = val.split(/\s+/);
          
          if ( el.nodeType === 1 ) {
            if ( !el.className && classNames.length === 1 ) {
              el.className = val;
            } else {
              setClass = ' ' + el.className + ' ';
              
              for ( ; i < classNames.length; i++ ) {
                if ( setClass.indexOf(' ' + classNames[i] + ' ') === -1) {
                  setClass += classNames[ i ] + ' ';
                }
              }
              el.className = setClass.trim();
            }
          }
        }
      };

      /* create HTML Element
       * @param  : <string>tagName
       * @param  : <JSobject>attr
       * @param  : <string>text
       * @param  : <string>className
       ********************************************************************/    
      var _createElement = function( tagName, attr, text, className ) {
        
        var p = document.createElement( tagName );
        
        if ( typeof attr === 'object' ) {
          
          for ( var key in attr ) {
            if ( key == 'style' ) { // Attribute Style
              p.style.cssText = attr[ key ];
            } else if ( /^on/i.test( key ) ) { // Event Listener
              p[ key ] = new Function( attr[ key ] ); // @link http://stackoverflow.com/a/748972
            } else {
              if ( p.setAttribute ) {
                p.setAttribute( key, attr[ key ] );
              } else {
                p[ key ] = attr[ key ];
              }
            }
          }
        }
        
        // Set text
        if ( text ) { 
          p.innerHTML = text; 
        }
        // Set class name
        if ( className ) { 
          p.className = className; 
        }
        
        return p;
      };

      /* Check if element in viewport or not
       * @param  : <HTMLElement>el
       ********************************************************************/ 
      var _elementInViewport = function( el ) {

        var rect = el.getBoundingClientRect();

        return (
          rect.top >= 0
          && rect.left >= 0
          && rect.top <= ( window.innerHeight || document.documentElement.clientHeight )
        );
      };

      /* Get element by id
       * @param  : <string>id
       ********************************************************************/
      var _getId = function( id ) {
        return document.getElementById( id );
      };

      /* Check whether element has certain class name
       * @param  : <HTMLElement>el
       * @param  : <string>className
       * @link taken from https://github.com/jquery/jquery/blob/1.7.2/src/attributes.js
       ********************************************************************/ 
      var _hasClass = function( el, className ) {
        
        className = ' ' + className + ' ';
        
        return (
          el.nodeType === 1 
          && !!~(' ' + el.className + ' ').replace( /[\n\t\r]/g, ' ' ).indexOf( className )
        );
      };

      /* Check whether el is HTMLElement
       * @param  : <object>el
       * @link http://stackoverflow.com/a/384380
       ********************************************************************/ 
      var _isHTMLElement = function( el ) {
        
        return (
          typeof HTMLElement === "object" ? 
            el instanceof HTMLElement : //DOM2
            el && typeof el === "object" 
            && el !== null 
            && el.nodeType === 1 
            && typeof el.nodeName === "string"
        );
      };

      /* Check whether el is NodeList
       * @param  : <NodeList>nodes
       * @link modified form http://stackoverflow.com/q/7238177
       ********************************************************************/ 
      var _isNodeList = function( nodes, result ) {
        
        result = Object.prototype.toString.call( nodes );

        return (
          typeof nodes === 'object'
          && /^\[object (HTMLCollection|NodeList|Object)\]$/.test( result )
          && typeof nodes.length === 'number'
          && typeof nodes.item !== 'undefined'
          && ( nodes.length === 0 || ( typeof nodes[0] === 'object' && nodes[0].nodeType > 0 ) )
        );
      };

      /* Get next element
       * @param  : <HTMLELement>el
       ********************************************************************/ 
      var _nextElement = function( el, next ) {
        next = el.nextSibling;
        
        while ( next ) {
          if ( next.nodeType === 1 ) { 
            break; 
          }
          next = next.nextSibling;
        }
        
        return next;
      };

      /* Remove element
       * @param  : <HTMLELement>el
       ********************************************************************/ 
      var _removeElement = function( el ){
          el.parentNode.removeChild( el );
      };

      /* Convert string to Node
       * @param  : <string>str
       ********************************************************************/ 
      var _strToNode = function( str, div ) {
        div = _createElement('div');
        div.innerHTML = str;
        
        return div.firstChild;
      };

      /********************************************************************
       * ARRAY HELPER FUNCTIONS                                           *
       ********************************************************************/
      /* Check if array contain needle
       * @param  : <array>arr
       * @param  : <string>needle
       * @param  : <regexp>regex
       ********************************************************************/
      var _arrayContain = function( arr, needle, regex ) {
        var i = 0, len = arr.length;
        
        for ( ; i < len; i++ ) {
          regex = new RegExp( arr[ i ], 'gi' );
          
          if ( regex.test( needle ) ) {
            return i;
          }
        }
        return -1;
      };

      /* Insert data to array if not exist, then sorting the data
       * @param  : <object>needle
       * @param  : <array>arr
       ********************************************************************/
      var _arrayInsertSort = function( needle, arr ) {
        if ( !_inArray( needle, arr ) ) {
          array.push( needle );
        }
        
        arr.sort = function(){ return a - b; };
        
        return arr;
      }

      /* Check if an item is a member of certain array
       * @param  : <object>needle
       * @param  : <array>arr
       ********************************************************************/ 
      var _inArray = function( needle, arr ) {
        return !!~arr.indexOf( needle );
      };

      /* Remove item from array by value
       * @param  : <array>arr
       ********************************************************************/ 
      var _removeArray = function( arr ) {
        
        var what, a = arguments, L = a.length, ax;
        
        while ( L > 1 && arr.length ) {
          what = a[--L];
          while ( ( ax = arr.indexOf( what ) ) !== -1 ) {
            arr.splice( ax, 1 );
          }
        }
        return arr;
      };

      /********************************************************************
       * UTILITY HELPER FUNCTIONS                                         *
       ********************************************************************/
      /* Insert Stylesheet to Head Section
       * @param  : <string>src
       * @param  : <boolean>top
       ********************************************************************/ 
      var _addCSS = function( src, top ) {
        if ( document.createStyleSheet ) {
          document.createStyleSheet( _sanitizeURL( src ), 0 );
        } else {
          var stylesheet = document.createElement('link');
          stylesheet.type = 'text/css';
          stylesheet.rel = 'stylesheet';
          stylesheet.href = _sanitizeURL( src );

          var head = document.getElementsByTagName('head')[0];
          if ( !top ) {
            head.appendChild( stylesheet );
          } else {
            head.insertBefore( stylesheet, head.childNodes[ head.childNodes.length - 1 ] );
          }
        }
      };

      /* Insert Stylesheet to Head Section only one time
       * @param  : <string>src
       * @param  : <boolean>top
       ********************************************************************/ 
      var _addCSSOnce = function( src, top ) {
        var head = document.getElementsByTagName('head')[0],
          link = head.getElementsByTagName('link'),
          len = link.length,
          base = src.substr( src.lastIndexOf('/') );

        // don't add css if already exists
        while ( len-- ) {
          if ( link[ len ].href && !!~link[ len ].href.lastIndexOf( base ) ) {
            return;
          }
        }

        _addCSS( src, top );
      };

      /* Insert Javascript to Head Section
       * @param  : <string>src
       * @param  : <string>id
       * @param  : <function>errorCallback
       * @param  : <boolean>sync
       ********************************************************************/
      var _addJS = function( src, id, errorCallback, sync ) {
        var script = document.createElement('script'); 
        script.type = 'text/javascript'; 
        script.src = _sanitizeURL( src ); 
        if ( id ) { 
          script.id = id; 
        }
        if ( errorCallback ) {
          if ( "onreadystatechange" in script ) {
            script.onreadystatechange = function () {
              if ( this.readyState == 'loaded' || this.readyState == 'complete' ) {
                if ( this.status != 200 && this.status != 304 ) {
                  errorCallback();
                }

                script.onreadystatechange = null;
              }
            }
          } else {
            script.onerror = errorCallback;
          }
        }
        if ( !sync ) {
          script.async = true;
        }
        
        document.getElementsByTagName('head')[0].appendChild( script );
      };

      /* Insert Javascript to Head Section only one time
       * @param  : <string>src
       * @param  : <string>id
       * @param  : <function>errorCallback
       * @param  : <boolean>sync
       ********************************************************************/
      var _addJSOnce = function( src, id, errorCallback, sync ) {
        var script = document.getElementsByTagName('script'),
          len = script.length,
          base = src.substr( src.lastIndexOf('/') );

        while ( len-- ) {
          if ( script[ len ].src && !!~script[ len ].src.lastIndexOf( base ) ) {
            return;
          }
        }

        _addJS( src, id, sync );
      };

      /* very simple append string
       * @param  : <string>def
       * @param  : <string>option
       ********************************************************************/ 
      var _appendStr = function( def, option ) {
        return def ? 
          ( option ? def + ' ' + option : def ) :
          ( option ? option : '' );
      };

      /* Appends existing default options with user's options
       * @param  : <object>def (Default options)
       * @param  : <object>config (User's options)
       ********************************************************************/
      var _appends = function( def, config ) {
        for ( var key in config ) {
          if ( config.hasOwnProperty( key ) ) {
            if ( typeof config[ key ] === 'object' ) { 
              def[ key ] = _appends( def[ key ], config[ key ] );
            } else {
              def[ key ] = _appendStr( config[ key ], def[ key ] );
            }
          }    
        }
        return def;
      };

      /* Extends default options with user's options
       * @param  : <object>def (Default options)
       * @param  : <object>config (User's options)
       ********************************************************************/
      var _extends = function( def, config ) {
        for (var key in config) {
          if ( config.hasOwnProperty( key ) ) {
            if ( typeof config[ key ] === 'object' ) { 
              def[ key ] = _extends( def[ key ], config[ key ] );
            } else {
              def[ key ] = config[ key ];
            }
          }
        }
        return def;
      };

      /* Opposite of extends, lol don't know the appropiate name to call this
       * @param  : <object>def (Default options)
       * @param  : <object>config (User's options)
       ********************************************************************/
      var _pretends = function( def, config ) {
        for (var key in config) {
          if ( config.hasOwnProperty( key ) ) {
            if ( typeof config[ key ] === 'object' ) { 
              def[ key ] = _pretends( def[ key ], config[ key ] );
            } else {
              // boolean & number aren't count
              if( typeof def[ key ] !== 'boolean' 
                  && typeof def[ key ] !== 'number' 
                  && !def[ key ] ) {
                def[ key ] = config[ key ];
              }
            }
          }
        }
        return def;
      };

      /* Check whether object is empty
       * @param  : <JSObject>obj
       ********************************************************************/    
      var _isEmptyObj = function( obj ) {
        for ( var key in obj ) {
          return false;
        }
        return true;
      };

      /* Return new Date Object
       * @param  : <string>date (Day/Month/Year)
       * @param  : <string>time (Hour:Minute)
       ********************************************************************/
      var _makeDate = function( date, time ) {
        return new Date(
          parseInt( date[0], 10 ),   /* year */
          parseInt( date[1]-1, 10 ), /* month */
          parseInt( date[2], 10 ),   /* day */
          parseInt( time[0], 10 ),   /* hours */
          parseInt( time[1], 10 ),   /* minutes */
          parseInt( time[2], 10 )    /* seconds */
        );
      };
      
      /* Generate a random number between interval x until y
       * @param  : <number>x
       * @param  : <number>y
       ********************************************************************/
      var _randomBetween = function( x, y ) {
        return Math.floor( Math.random() * ( y - x + 1 ) + x );
      };

      /* Return the base url of url
       * @param  : <string>url
       ********************************************************************/
      var _sanitizeURL = function( url ) {

        var urlRegex = new RegExp(
          '^((ftp|https?)?:?\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i'
        );

        if ( !urlRegex.test( url ) ) {
          if ( url.indexOf('/') === 0 ) {
            url = url.substring(1);
          }
          return BASE_URL + url;
        }
        return url;
      };
      
      /* Generate an unique number
       ********************************************************************/
      var _uniqueNumber = function() {
        return new Date().getTime() + _randomBetween( 1, 1000 );
      };
      
      /********************************************************************
       * APP-BASED HELPER FUNCTIONS                                       *
       *********************************************************************/
      /* Make Thumbnail based on image on the fly service
       * @param  : <string>img
       * @param  : <number>size
       * @param  : <string>server
       ********************************************************************/ 
      var _BTMakeThumbnail = function( img, size, server ) {
        var prop = parseInt( size * 1.5, 10 );
        
        // @google-link http://carlo.zottmann.org/2013/04/14/google-image-resizer/ :)
        var request = {
          boxsizer: "http://proxy.boxresizer.com/convert?" + 
            "resize=" + prop + "x" + prop + "&" +
            "source=" + img,
          sencha: "http://src.sencha.io" + 
            "/" + prop + "/" + prop + 
            "/" + img,
          google: "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?" +
            "resize_w=" + prop + "&resize_h=" + prop + "&" +
            "url=" + img + "&" +
            "container=focus"
        }
        
        return request[ server ];
      };
      
      /* Generate list <li> for pagination
       * @param  : <number>page
       * @param  : <string>size
       * @param  : <string>tag
       * @param  : <string>id
       * @param  : <string>className
       ********************************************************************/ 
      var _BTMakePageList = function( page, text, tag, id, className ) {
        var map = {
          a: { 
            href: "javascript:void(0)",
            onclick: "BlogToc.page(" + page + ", document.getElementById('" + id + "')); return false;" 
          },
          span: null
        },
          li = _createElement( 'li', null, null, className ),
          node = _createElement( tag, map[ tag ], text );
        
        li.appendChild( node );
        
        return li;
      };

      /* Render the table content
       * @param  : <string>type
       * @param  : <number>idx
       * @param  : <JSObject>data
       * @param  : <JSObject>option
       * @param  : <JSObject>config
       * @param  : <node>container
       ********************************************************************/ 
      var _BTRenderContent = function( type, idx, data, option, config, container, obj ) {

        obj = {
          author: function() {
            var span = _createElement( 'span', null, data.author ),
              node = _createElement( 'div', null, null, 'blogtoc_authorthumbnail' );

            if ( option.thumbnail.authorThumbnail ) {

              var size = option.thumbnail.authorSize;

              var img = _createElement( 'img', {
                src: option.thumbnail.blank,
                style: 'width:' + size + 'px;height:' + size + 'px;',
                'data-src': data.authorThumbnail,
                'data-loaded': 'no'
              }, null, 'bt-thumb' );

              node.appendChild( img );
              config.cache.aimg.push( img );
            }
            node.appendChild( span );

            return node;
          },
          comment: function() {
            return _createElement( 'a', {
              href: data.commentURL
            }, '<span class="icon icon-comment-2"></span> ' + data.comment.toString() );
          },
          index: function() {
            return document.createTextNode( idx );
          },
          thumbnail: function() {
            var img = _createElement( 'img', {
              src: option.thumbnail.blank,
              style: config.tbimg,
              'data-src': data.thumbnail,
              'data-loaded': 'no'
            }, null, 'bt-thumb' );

            var node = _createElement( 'a', {
              href: data.actualImage,
              style: config.tbwrapper
            }, null, 'blogtoc_thumbnail' );

            node.appendChild( img );
            config.cache.img.push( img );

            return node;
          },
          title: function() {
            var title, anchor;

            if ( config.searchRegex ) {
              title = data.title.replace( config.searchRegex, function ( match ) {
                return option.search.markerRender( match );
              });
            } else {
              title = data.title;
            }

            anchor = _createElement( 'a', {
              href: data.titleURL,
              title: data.summary
            }, title );

            container.appendChild( anchor );

            return _strToNode( data.badge );
          },
          def: function() {
            return document.createTextNode( data[ type ] );
          }
        };

        return ( ( type in obj ) && obj[ type ]() ) || obj['def']();
      };

      /* Build Language Starter
       * @param  : <string>def
       * @param  : <JSObject>lang
       * @param  : <JSObject>option
       ********************************************************************/ 
      var _BTBuildLang = function( def, lang, option ) {
        _pretends( option,lang[ def ].options );
      };

      /* Build Theme Starter
       * @param  : <string>def
       * @param  : <JSObject>theme
       * @param  : <JSObject>option
       ********************************************************************/ 
      var _BTBuildTheme = function( def, theme, option ) {
        // no theme found just return
        if ( !theme || !theme[ def ] ) {
          return;
        }

        var templateFn = function( opt ) {
          var obj = {};

          for ( var key in opt ) {
            if ( opt.hasOwnProperty( key ) ) {
              obj[ 'blogtoc_' + key ] = opt[ key ];
            }
          }

          return obj;
        };

        _appends( option, templateFn( theme[ def ].options ) );
        _addCSSOnce( theme[ def ].url );
      };
      
      /* Queue & Lazy Load image for BlogToc
       * @param  : <nodeList>img
       * @param  : <string>na (not available image)
       ********************************************************************/ 
      var _BTQueueImage = function( img, na ) {
      
        if ( !img.length ) { 
          return; 
        }
        
        var i = 0, 
          len = img.length;
        
        // continue where left off
        for ( ; i < len; i++ ) {
          // if image already loaded or not in viewport, ignore them
          if ( img[ i ].getAttribute('data-loaded') === 'yes' || 
               !_elementInViewport( img[ i ] ) ) {
            continue;
          }
          break;
        }
        
        if ( img[ i ] ) {
          var _queueImage = function() {
            // no image, stop
            if ( !img[ i ] ) { 
              return; 
            }
            
            // Lovely IE
            img[ i ].removeAttribute('width'); 
            img[ i ].removeAttribute('height'); 
            
            // image success
            img[ i ].onload = function() {
              // change attribute
              this.setAttribute( 'data-loaded', 'yes' );
              // remove from array
              _removeArray( img, this );
              // continue load next image
              if ( i < len && _elementInViewport( this ) ) {
                _queueImage();
              }
            };
            
            // image error
            img[i].onerror = function() {
              // change attribute
              this.setAttribute( 'data-loaded', 'yes' );
              // change to Not Available image
              this.src = na;
              // remove from array
              _removeArray( img, this );
              // continue load next image
              if ( i < len && _elementInViewport( this ) ) {
                _queueImage();
              }
            };
            
            // change Image
            img[ i ].src = img[ i ].getAttribute('data-src');
          };

          _queueImage(); 
        }
      };
      
      /* Special Sorting for BlogToc
       * @param  : <array>data
       * @param  : <string>key
       * @param  : <array>option
       * @param  : <function>fn
       ********************************************************************/    
      var _BTSort = function( data, key, option, fn ) {
        
        if ( !data.length ) { 
          return data;
        }

        // use sample index 0 of an array
        if ( !!~_arrayContain( option, data[0][ key ] ) ) { // sorting by date
          fn = function( a , b ) {
            return a[ key + 'Format' ] - b[ key + 'Format' ];
          };
        } else if ( typeof data[0][ key ] === 'string' ) { // sorting by string
          fn = function( a, b ) {
            return a[ key ].toLowerCase() > b[ key ].toLowerCase() ? 1 : -1;
          };
        } else { // assume sorting by number
          fn = function( a, b ) {
            return a[ key ] - b[ key ];
          };
        }
        
        return data.sort( fn );
      };
      
      /* Generate First HTML for apps
       * @param  : <HTMLElement>element
       ********************************************************************/    
      var _prepareHtml = function( el, prevId ) {
        var blogTocId = prevId ? prevId : 'blogtoc_' + _uniqueNumber();

        // IE7 workaround
        // style = zoom : 1;
        // @link http://stackoverflow.com/a/15092773
        var text = [
            '<div id="' + blogTocId + '" style="zoom: 1; display: none;">',
            '<div class="blogtoc_loader"></div>',
            '<div class="blogtoc_header"></div>',
            '<div class="blogtoc_filter"></div>',
            '<table class="blogtoc_table" style="display: none;"></table>',
            '<div class="blogtoc_footer"></div>',
            '</div>'
          ].join('');
        
        // place in element
        if ( el ) {
          el.innerHTML = text;
        } else {
          document.write( text );
        }       
        return _getId( blogTocId );
      };
      
      /* Test the connection image on the fly service
       * @param  : <string>imgTest
       ********************************************************************/ 
      var _testCDN = function( imgTest ) {
        var result = {}, 
          i = 0, len, 
          img = new Image();
        
        var cdn = [
          [ "boxsizer", "http://proxy.boxresizer.com/convert?resize=1x1&source=" + imgTest ],
          [ "google", "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?url=" + imgTest + "&container=focus&resize_w=1&resize_h=1" ],
          [ "sencha", "http://src.sencha.io/1/1/" + imgTest ],
        ];
        
        len  = cdn.length;
        
        // make test case request
        var getCDN = function() {
          img.src = cdn[ i ][1];
          img.onload = function() {
            result.server = cdn[ i ][0];
          };
          img.onerror = function() {
            i++;
            getCDN();
          }
        };

        getCDN();
        
        return result;
      };
      
      /********************************************************************
       * HERE COMES THE MAIN APPS                                         *
       ********************************************************************/
      /* Builder Function
       ********************************************************************/    
      var __BlogTocBuilder = function( options, element ) {
      
        if ( _isNodeList( element ) ) { // NodeList
          // id is only for one
          options.blogtocId = null;

          var i = 0, 
            len = element.length;

          for ( ; i < len; i++ ) {
            this.__BlogTocBuilder( options, element[ i ] );
          }

        } else if ( _isHTMLElement( element ) ) { // Node
          element.BTID = _prepareHtml( element );
          BlogTocApps( element, options );

        } else {
          var p = _prepareHtml();
          
          element = p.parentNode;
          element.BTID = p;
          
          BlogTocApps( element, options );
        }
      };

      /* BlogToc Constructor && Prototype
       ********************************************************************/
      var __BlogToc = function( element ) {
        this.element = element;
      };

      __BlogToc.prototype.build = function( options ) {
        __BlogTocBuilder( options, this.element );

        return this;
      };

      /* Build
       ********************************************************************/
      var BlogToc = function( element ) {
        return new __BlogToc( element );
      };

      BlogToc.build = function( options, element ) {
        __BlogTocBuilder( options, element );

        return this;
      };

      /* Reset
       ********************************************************************/
      BlogToc.reset = function( element ) {
        _prepareHtml( element, element.BTID.id );
        element.BTAPP.run( element.BTOptions );

        return this;
      };

      /* Display
       ********************************************************************/    
      BlogToc.display = function( val, element ) {
        element.parentNode.BTAPP.changeDisplay( val );

        return this;
      };
      
      /* Label
       ********************************************************************/    
      BlogToc.label = function( el, val, element ) {
        element.parentNode.BTAPP.displayLabel( val, el, null, true );

        return this;
      };
      
      /* Alphabet
       ********************************************************************/    
      BlogToc.alphabet = function( el, val, element ) {
        element.parentNode.BTAPP.displayAlphabet( val, el, null, true );

        return this;
      };
      
      /* Page
       ********************************************************************/    
      BlogToc.page = function( val, element ) {
        element.parentNode.BTAPP.changePage( val );

        return this;
      };
      
      /* Search
       ********************************************************************/    
      BlogToc.search = function( val, element ) {
        element.parentNode.BTAPP.query( val );

        return this;
      };
      
      /* Sorting
       ********************************************************************/    
      BlogToc.sort = function( key, element ) {
        element.parentNode.BTAPP.sorting( key );

        return this;
      };

      /* Language
       ********************************************************************/    
      BlogToc.language = function( name, options ) {
        languages[ name ] = {};
        languages[ name ].options = options;

        return this;
      };

      /* Theme
       ********************************************************************/  
      BlogToc.theme = function( name, url, options ) {
        themes[ name ] = {};
        themes[ name ].url = url;
        themes[ name ].options = options;

        return this;
      };

      /* Utilities
       ********************************************************************/  
      BlogToc.addCSS = function( src, top ) {
        _addCSSOnce( src, top );

        return this;
      };

      BlogToc.addJS = function( src, id, errorCallback, sync ) { 
        _addJSOnce( src, id, errorCallback, sync );

        return this;
      };

      BlogToc.baseURL = function( url ) {
        BASE_URL = url;

        return this;
      };

      /* Make Public
       ********************************************************************/  
       window.BlogToc = BlogToc;

    })();
   
  }

  if ( typeof window !== 'undefined' ) {
    
    loadApp();

    /********************************************************************
     * SET DEFAULT LANGUAGE                                             *
     ********************************************************************/
    BlogToc.addJS('lang/en-US.js');

    /********************************************************************
     * SET DEFAULT THEME                                                *
     ********************************************************************/
    BlogToc.addJS('theme/bt_bootstrap.js');
  }

})();