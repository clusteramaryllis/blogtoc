// store temp data
  var _junk = {
    extendClass: [
      ['blogtoc_id', "div.blogtoc_id"],
      ['blogtoc_loader', "div.blogtoc_loader"],
      ['blogtoc_content', "div.blogtoc_content"],
      ['blogtoc_header', "div.blogtoc_header"],
      ['blogtoc_label', "select|button.blogtoc_label"],
      ['blogtoc_alphabet', "select|button.blogtoc_alphabet"],
      ['blogtoc_button', "button"],
      ['blogtoc_filter', "div.blogtoc_filter"],
      ['blogtoc_display', "div.blogtoc_display"],
      ['blogtoc_search', "div.blogtoc_search"],
      ['blogtoc_query', "input.blogtoc_query"],
      ['blogtoc_table', "table.blogtoc_table"],
      ['blogtoc_footer', "div.blogtoc_footer"],
      ['blogtoc_pagination', "div.blogtoc_pagination"],
      ['blogtoc_pagination-ul', "div.blogtoc_pagination>ul"],
      ['blogtoc_pagination-current', "div.blogtoc_pagination>li:current"],
      ['blogtoc_pagination-disabled', "div.blogtoc_pagination>li:disabled"]
    ],
    customLanguage: [ 
      ['newLabel', 'new-label'],
      ['index', 'index'],
      ['thumbnail', 'thumbnail'],
      ['title', 'title'],
      ['author', 'author'],
      ['comment', 'comment'],
      ['publishDate', 'publish-date'],
      ['updateDate', 'update-date'],
      ['summary', 'summary'],
      ['display', 'display'],
      ['search', 'search'],
      ['noRecords', 'no-records'],
      ['firstPage', 'first-page'],
      ['lastPage', 'last-page'],
      ['nextPage', 'next-page'],
      ['prevPage', 'previous-page'] 
    ],
    binding: [
      ['onAfterDataChange', 'after the data in the table changes' ],
      ['onBeforeDataChange', 'before the data in the table changes'],
      ['onInit', 'when the BlogToc App began initialization (first showing a loading progress)'],
      ['onLiveDataChange', 'everytime the data in the table making a change'],
      ['onLoaded', 'when the BlogToc App finish loaded']
    ],
    pagination: [
      ['showNextPage', 'next page'],
      ['showPrevPage', 'prev page'],
      ['showFirstPage', 'first page'],
      ['showLastPage', 'last page'],
      ['showNumber', 'number']
    ],
    linkTarget: [
      ['author', "The link's target of author's link."],
      ['comment', "The link's target of comment's link."],
      ['thumbnail', "The link's target of thumbnail's link."],
      ['title', "The link's target of title's link."]
    ],
    bindingTest: [],
    label: {
      define: [],
      alphabetAllText: ['#','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    },
    table: {
      idx: [2.5,7,26,12.5,12.5,10.5,11,25]
    },
    other: {
      boot: "if( elem.className.lastIndexOf('progress') === -1 ) { \n\telem.className += ' progress'; \n} \n\nif( ( div = elem.firstChild ) ) { \n\tdiv.style.width = progress + '%'; \n} else { \n\tdiv = document.createElement('div'); \n\tdiv.className = 'bar'; \n\tdiv.style.width = progress + '%'; elem.appendChild(div); \n}",
      img: "var img; \n\nif ( !( img = elem.getElementsByTagName('img')[0] ) ) { \n\telem.innerHTML = '<div style=\"text-align: center\">' + \n\t'<img src=\"http://clusteramaryllis.github.io/img/Triplex.gif\" />' + \n\t'<div>'; \n}"
    }
  },
  // store default data
  _def = {
    blogtocId: '',
    binding: {},
    dataType: 'JSONP',
    date: {
      day: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      month: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      renderDateText: "return option.date.day[ date.getDay() ] + \n\t', ' + option.date.month[ date.getMonth() ] + \n\t' ' + date.getDate() + \n\t' ' + date.FullYear();" 
    },
    display: {
      setup: '10',
      template: ['5','10','25','50','All']
    },
    feed: {
      appendQuery: '',
      chunkRequest: 1,
      limit: 0,
      requestCount: 500,
      type: 'default'
    },
    extendClass: {},
    label: {
      define: [],
      exception: false,
      showLabel: true,
      includeLabelAll: true,
      setup: "All",
      allText: "All",
      cloudLabel: false,
      showAlphabetLabel: false,
      includeAlphabetLabelAll: true,
      setupAlphabet: "All",
      alphabetAllText: "All",
      cloudAlphabetLabel: false,
      renderSymbolicAlphabetFilterText: 'return /^[0-9$-\\/:-?{-~!"^_`\\[\\]]/i;',
      alphabetMember: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    },
    language: {
      setup: 'en-US',
      custom: {
        result: '',
        errorMessage: ''
      }
    },
    linkTarget: {},
    newBadge: {
      setup: 5,
      renderBadgeText: "return '<span class=\"label\">' + language + '</span>';"
    },
    notification: {
      enabled: false,
      interval: 60 * 1 * 1000
    },
    number: {
      renderNumberText: "return idx;"
    },
    pagination: {
      adjacents: 2
    },
    progress: {
      renderProgressText: "var span; \n\nif ( ( span = elem.getElementsByTagName('span')[0] ) ) { \n\tspan.innerHTML = progress; \n} else { \n\telem.innerHTML = 'Loading <span>' + progress + '</span> %'; \n}"
    },
    postLabel: {
      separator: '',
      renderPostLabelText: "return '<span>' + label + '</span>';"
    },
    rightToLeft: false,
    search: {
      renderSearchText: "return '<b>' + match + '</b>';"
    },
    sorting: {
      key: 'title',
      order: 'ascending'
    },
    summary: {
      wordLimit: 200
    },
    table: {
      order: ["index","thumbnail","title","publishDate","updateDate","author","comment"]
    },
    theme: {
      setup: 'bootstrap'
    },
    thumbnail: {
      blank: 'http://3.bp.blogspot.com/-trkoRRazZ7A/UdtEVufkxiI/AAAAAAAABxI/DOJ7jAUv1G4/s1600/blank.gif',
      notFound: 'http://3.bp.blogspot.com/-p7gZDNwTJbw/UdkqBnBb1bI/AAAAAAAAALI/hoCIpF74N80/s1600/image_not_available.jpg',
      sample: 'http://s20.postimg.org/7oz0eeuyx/blank.gif',
      size: 72,
      authorSize: 36,
      authorThumbnail: true
    },
    url: ''
  },
  // store final data
  _final = {}, _language, _theme;

  // populate some default data with temp data
  _junk.table.order = _def.table.order.slice(0);
  _junk.table.order.push('summary');
  _junk.table.order.push('label');
  for(var i=0; i<_junk.binding.length; i++) { 
    _def.binding[_junk.binding[i][0]] = '';
    _junk.bindingTest.push(_junk.binding[i][0]);
  }
  for(var i=0; i<_junk.extendClass.length; i++) { 
    _def.extendClass[_junk.extendClass[i][0]] = '';
  }
  for(var i=0; i<_junk.customLanguage.length; i++) { 
    _def.language.custom[_junk.customLanguage[i][0]] = '';
  }
  for(var i=0; i<_junk.linkTarget.length; i++) { 
    _def.linkTarget[_junk.linkTarget[i][0]] = '_self';
  }
  for(var i=0; i<_junk.pagination.length; i++) { 
    _def.pagination[_junk.pagination[i][0]] = true;
  }
  for(var i=0; i<_junk.table.order.length; i++) {
    _def.table[_junk.table.order[i]+"WidthPoint"] = _junk.table.idx[i];
  }

  // Angular init
  var docApp = angular.module('docApp', ['ui.select2', 'ui.bootstrap', 'ui.ace'/*, 'toggle-switch'*/], function($interpolateProvider) {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
  }).filter('titlelize', function(){
    return function(text) {
      return text.replace('-',' ');
    };
  });

  docApp.controller('DemoCtrl', function ($scope) {

    // properties
    $scope.preModel = {
      blogtocId: _def.blogtocId,
      binding: {},
      dataType: _def.dataType,
      date: {
        day: _def.date.day,
        month: _def.date.month,
        renderDateText: _def.date.renderDateText
      },
      display: {
        setup: _def.display.setup,
        template: _def.display.template
      },
      extendClass: {},
      feed: {
        appendQuery: _def.feed.appendQuery,
        chunkRequest: _def.feed.chunkRequest,
        limit: _def.feed.limit,
        requestCount: _def.feed.requestCount,
        type: _def.feed.type
      },
      label: {
        define: _def.label.define,
        exception: _def.label.exception,
        showLabel: _def.label.showLabel,
        includeLabelAll: _def.label.includeLabelAll,
        setup: _def.label.setup,
        allText: _def.label.allText,
        cloudLabel: _def.label.cloudLabel,
        showAlphabetLabel: _def.label.showAlphabetLabel,
        includeAlphabetLabelAll: _def.label.includeAlphabetLabelAll,
        setupAlphabet: _def.label.setupAlphabet,
        alphabetAllText: _def.label.alphabetAllText,
        cloudAlphabetLabel: _def.label.cloudAlphabetLabel,
        renderSymbolicAlphabetFilterText: _def.label.renderSymbolicAlphabetFilterText,
        alphabetMember: _def.label.alphabetMember
      },
      language: {
        setup: _def.language.setup,
        custom: {}
      },
      linkTarget: {},
      newBadge: {
        setup: _def.newBadge.setup,
        renderBadgeText: _def.newBadge.renderBadgeText
      },
      notification: {
        enabled: _def.notification.enabled,
        interval: _def.notification.interval
      },
      number: {
        renderNumberText: _def.number.renderNumberText
      },
      search: {
        renderSearchText: _def.search.renderSearchText
      },
      sorting: {
        key: _def.sorting.key,
        order: _def.sorting.order
      },
      summary: {
        wordLimit: 200
      },
      pagination: {
        adjacents: _def.pagination.adjacents
      },
      progress: {
        renderProgressText: _def.progress.renderProgressText
      },
      postLabel: {
        separator: _def.postLabel.separator,
        renderPostLabelText: _def.postLabel.renderPostLabelText
      },
      rightToLeft: _def.rightToLeft,
      table: {
        order: _def.table.order
      },
      theme: {
        setup: _def.theme.setup
      },
      thumbnail: {
        blank: _def.thumbnail.blank,
        notFound: _def.thumbnail.notFound,
        sample: _def.thumbnail.sample,
        size: _def.thumbnail.size,
        authorSize: _def.thumbnail.authorSize,
        authorThumbnail: _def.thumbnail.authorThumbnail
      },
      url: _def.url
    };

    $scope.junk = { 
      binding: _junk.binding,
      extendClass: _junk.extendClass,
      customLanguage: _junk.customLanguage,
      linkTarget: _junk.linkTarget,
      pagination: _junk.pagination
    };

    $scope.appVersion = __APP_VERSION__;
    $scope.resultModel = {}; // final result model
    $scope.objModel = {}; // first model

    $scope.renderStr = '';
    $scope.displayTemp = $scope.preModel.display.template;
    $scope.labelState = [];
    $scope.alphabetLabelState = [];
    $scope.sortingKey = removeArray( $scope.preModel.table.order.slice(0), "index", "thumbnail" );
    $scope.sortingOrder = ["ascending","descending"];
    $scope.targetLinks = ["_self", "_blank", "_top", "_parent","_new"];
    $scope.setupLanguage = [
      {"value":"en-US", "text": "English - USA"},
      {"value":"id", "text": "Indonesia"}
    ];
    $scope.setupTheme = ["bootstrap"];
    $scope.exceptionState = false;
    $scope.showLabelState = true;
    $scope.builtInMode = true;
    $scope.useCDN = true;
    $scope.CDN = '';
    $scope.addExternalLanguage = '';
    $scope.addExternalTheme = '';

    $scope.preModel.language.custom.result = _def.language.custom.result;
    $scope.preModel.language.custom.errorMessage = _def.language.custom.errorMessage;
    for(var i=0; i<_junk.binding.length; i++) {
      $scope.preModel.binding[_junk.binding[i][0]] = _def.binding[_junk.binding[i][0]];
    }
    for(var i=0; i<_junk.extendClass.length; i++) {
      $scope.preModel.extendClass[_junk.extendClass[i][0]] = _def.extendClass[_junk.extendClass[i][0]];
    }
    for(var i=0; i<_junk.customLanguage.length; i++) {
      $scope.preModel.language.custom[_junk.customLanguage[i][0]] = _def.language.custom[_junk.customLanguage[i][0]];
    }
    for(var i=0; i<_junk.linkTarget.length; i++) {
      $scope.preModel.linkTarget[_junk.linkTarget[i][0]] = _def.linkTarget[_junk.linkTarget[i][0]];
    }
    for(var i=0; i<_junk.pagination.length; i++) {
      $scope.preModel.pagination[_junk.pagination[i][0]] = _def.pagination[_junk.pagination[i][0]];
    }
    for(var i=0; i<_junk.table.order.length; i++) {
      $scope.preModel.table[_junk.table.order[i]+"WidthPoint"] = _def.table[_junk.table.order[i]+"WidthPoint"];
    }

    // select 2 options
    $scope.select2Options = {
      dateDay: {
        'multiple': true,
        'simple_tags': true,
        'tags': _def.date.day,
        'maximumSelectionSize': 7
      },
      dateMonth: {
        'multiple': true,
        'simple_tags': true,
        'tags': _def.date.month,
        'maximumSelectionSize': 12
      },
      displayTemplate: {
        'multiple': true,
        'simple_tags': true,
        'tags': _def.display.template
      },
      labelDefine: {
        'multiple': true,
        'simple_tags': true,
        tags: function() { return _junk.label.define; }
      },
      labelAlphabetMember: {
        'multiple': true,
        'simple_tags': true,
        'tags': _def.label.alphabetMember
      },
      tableOrder: {
        'multiple': true,
        'simple_tags': true,
        'locked': true,
        'tags': _junk.table.order,
        'maximumSelectionSize': 9
      }
    };

    // method
    $scope.modelOneRender = function() {

      // parse tag for dragging support
      parseTags( $("#bt-date-day") );
      parseTags( $("#bt-date-month") );
      parseTags( $("#bt-display-template") );
      parseTags( $("#bt-label-define") );
      parseTags( $("#bt-label-alphabet-member") );
      parseTags( $("#bt-table-order") );

      // parse the data
      $scope.renderStr = $scope.pushDiff();
      var str = parseTemplate( $scope );

      $scope.displayTemp = $scope.preModel.display.template;
      $scope.sortingKey = removeArray( $scope.preModel.table.order.slice(0), "index", "thumbnail" );

      _final = $scope.objModel; // assign to object model

      // provide language and theme
      if ( $scope.preModel.language.setup !== 'en-US' ) {
        $scope.addExternalLanguage = "<script type=\"text/javascript\" src=\"" + $scope.CDN + "lang/" + $scope.preModel.language.setup + ".js\"><\/script>;\n\n";
      } else {
        $scope.addExternalLanguage = '';
      }

      $("#result-00").text( "<script type=\"text/javascript\" src=\""+ $scope.CDN +"blogtoc.min.js\"><\/script>" );
      $("#result-01").text( "<script type=\"text/javascript\" src=\"//cdn.jsdelivr.net/setimmediate/1.0.2/setImmediate.js\"><\/script>" );
      $("#result-02").text( str );
      prettyPrint();

      _language = $scope.preModel.language.setup;
      _theme = $scope.preModel.theme.setup;

      return str;
    };

    // Methods
    $scope.pushDiff = function () {
      $scope.resultModel = {};
      $scope.objModel = {};

      $scope.resultModel = changeDiffObj($scope.preModel, _def, _junk);
      $scope.objModel = clone($scope.resultModel);
      if ( $scope.objModel.binding ) {
        for ( var prop in $scope.objModel.binding ) {
          if ( $scope.objModel.binding.hasOwnProperty(prop) ) {
            if ( $scope.objModel.binding[prop] ) {
              $scope.objModel.binding[prop] = eval('(' + $scope.objModel.binding[prop] + ')');
            }
          }
        }
      }
      if ( $scope.objModel.date &&  $scope.objModel.date.render ) {
        $scope.objModel.date.render = eval('(' + $scope.objModel.date.render + ')');  
      }
      if ( $scope.objModel.label &&  $scope.objModel.label.symbolicAlphabetFilter ) {
        $scope.objModel.label.symbolicAlphabetFilter = eval('(' + $scope.objModel.label.symbolicAlphabetFilter + ')');  
      }
      if ( $scope.objModel.newBadge &&  $scope.objModel.newBadge.render ) {
        $scope.objModel.newBadge.render = eval('(' + $scope.objModel.newBadge.render + ')');
      }
      if ( $scope.objModel.progress &&  $scope.objModel.progress.render ) {
        $scope.objModel.progress.render = eval('(' + $scope.objModel.progress.render + ')');
      }
      if ( $scope.objModel.search &&  $scope.objModel.search.markerRender ) {
        $scope.objModel.search.markerRender = eval('(' + $scope.objModel.search.markerRender + ')');
      }
      if ( $scope.objModel.postLabel &&  $scope.objModel.postLabel.render ) {
        $scope.objModel.postLabel.render = eval('(' + $scope.objModel.postLabel.render + ')');
      }

      if ( isEmptyObj( $scope.resultModel ) ) {
        return '';
      }

      var result = JSON.stringify( $scope.resultModel, function(key, value){
        return ( typeof value === 'function' ) ? value.toString() : value;
      }, 2 );

      return result.replace(/\}\"/gi,"}")
        .replace(/\:\s*\"function/gi,": function")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029")
        .replace(/\\"/g, "\"")
        .replace(/\\\\/g, "\\")
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r")
        .replace(/\\t/g, "\t");
    };

    $scope.bootstrapExample = function(e) {
      e.preventDefault();
      $scope.preModel.progress.renderProgressText = _junk.other.boot;
    };

    $scope.imgExample = function(e) {
      e.preventDefault();
      $scope.preModel.progress.renderProgressText = _junk.other.img;
    };

    $scope.defaultExample = function(e) {
      e.preventDefault();
      $scope.preModel.progress.renderProgressText = _def.progress.renderProgressText;
    };

    $scope.getAppVersion = function() {
      return $scope.appVersion;
    };

    $scope.renderCDN = function() {
      $scope.CDN = $scope.useCDN ? "//clusteramaryllis.github.io/blogtoc/dist/" + $scope.appVersion + "/" : "";
      return $scope.useCDN ? "Use" : "Don't use";
    };

    $scope.renderIdText = function() {
      return $scope.preModel.blogtocId || '{blogtoc_id}';
    };

    $scope.resetStandalone = function() {
      if ( $scope.builtInMode ) {
        $scope.preModel.theme.standalone = false;
      }
    }

    $scope.disableException = function() {
      if ( !$scope.preModel.label.define.length ) {
        $scope.preModel.label.exception = $scope.exceptionState = false;
      } else {
        $scope.exceptionState = true;
      }
    };

    $scope.disableLabel = function() {
      if ( !$scope.preModel.label.showLabel ) {
        $scope.preModel.label.includeLabelAll = false;
        $scope.preModel.label.cloudLabel = false;
        $scope.showLabelState = false;
      } else {
        $scope.showLabelState = true;
      }
    };

    $scope.disableAlphabetLabel = function() {
      if ( !$scope.preModel.label.showAlphabetLabel ) {
        $scope.preModel.label.includeAlphabetLabelAll = true;
        $scope.preModel.label.cloudAlphabetLabel = false;
        $scope.showAlphabetLabelState = false;
      } else {
        $scope.showAlphabetLabelState = true;
      }
    };

    $scope.fillLabelState = function() {
      $scope.labelState = _junk.label.define.slice(0);
      $scope.labelState.unshift( $scope.preModel.label.allText );
    };

    $scope.fillAlphabetLabelState = function() {
      $scope.alphabetLabelState = _junk.label.alphabetAllText.slice(0);
      $scope.alphabetLabelState.unshift( $scope.preModel.label.alphabetAllText );
    };

    $scope.initBlogUrl = function()
    {
      var tt = setTimeout(function(){
        $scope.fillLabelState(); 
      }, 3000);
    }
  });

  // jQuery
  $(function(){

    // btn timing
    btnTiming();

    // get categories
    $("#bt-url").on('blur',function(){

      if ($(this).val() == '') return;

      var url = $(this).val().replace(/.*?:\/\/|\/$/g, '');

      $.ajax({
        url : '//' + url + '/feeds/posts/summary/?max-results=0&alt=json-in-script',
        dataType: 'jsonp',
        success: function(data) {
          var feed = data.feed;

          if ('category' in feed) {
            _junk.label.define = [];
            for (var i=0,len=feed.category.length; i<len;i++) {
              _junk.label.define.push( feed.category[i].term );
            }
          }
        }
      });
    });

    // colorpicker
    $("#cp3").colorpicker().on('changeColor', function(ev){
      //console.log(ev.color.toRGB());
      $('#blogtoc').css('background',ev.color.toHex());
    });

    // autogrow on text area
    $("textarea").autogrow();

    // filter input
    $('.number').filter_input({regex: '[0-9]'});
    $('.number').spinner();
    $(".bt-point").filter_input({regex: '[0-9\.]'});

    // misc
    $("#reveal-new-label").on('click',function(e){
      e.preventDefault();
      $("#collapseSix").collapse('show');
      $($(this).attr("href")).focus();
    });

    // click event on generate button
    $("#generate").on('click',function(e){
      e.preventDefault();

      if (_language !== 'en-US') {
          $.getScript("lang/" + _language + ".js", function(){
            BlogToc.reset( myDiv, true, _final );
            btnTiming();
          });
      // BlogToc.addJS("lang/" + $("#bt-language-setup").val() + ".js");
      /*if ($("#bt-theme-default").val() !== 'bootstrap') {
        BlogToc.addJS("theme/bt_" + $("#bt-theme-default").val() + ".js");
      }*/
      } else {
        BlogToc.reset( myDiv, true, _final );  
        btnTiming();
      }
    });

  });

  // Functions
  function parseTemplate( scope ) {

    var str = scope.addExternalLanguage +
      "<div id=\"blogtoc\"></div>\n\n" + 
      "<script type=\"text/javascript\">\n" +
      "var myDiv = document.getElementById('blogtoc');\n\n" +
      // scope.addExternalTheme +
      "BlogToc( myDiv ).build(" +
      scope.renderStr + 
      ");\n" +
      "<\/script>";

    return str;
  }

  function parseTags( el ) {
    el.on('change', function(){
        el.html( el.val() );
      })
      .select2('container').find('ul.select2-choices')
      .sortable({
        container: 'parent',
        start: function() {
          el.select2('onSortStart');
        },
        update: function() {
          el.select2('onSortEnd');
        }
      }); 
  }

  function isEmptyObj( obj ) {
    for ( var key in obj ) {
      return false;
    }
    return true;
  }

  function removeArray( arr ) {
    
    var what, a = arguments, L = a.length, ax;
    
    while ( L > 1 && arr.length ) {
      what = a[--L];
      while ( ( ax = arr.indexOf( what ) ) !== -1 ) {
        arr.splice( ax, 1 );
      }
    }
    return arr;
  }

  function clone(obj) {
      // Handle the 3 simple types, and null or undefined
      if (null == obj || "object" != typeof obj) return obj;

      // Handle Date
      if (obj instanceof Date) {
          var copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
      }

      // Handle Array
      if (obj instanceof Array) {
          var copy = [];
          for (var i = 0, len = obj.length; i < len; i++) {
              copy[i] = clone(obj[i]);
          }
          return copy;
      }

      // Handle Object
      if (obj instanceof Object) {
          var copy = {};
          for (var attr in obj) {
              if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
          }
          return copy;
      }

      throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  function changeDiffObj(obj, def) {

    var result = {};

    var bindingTest = new RegExp(_junk.bindingTest.join('|'),'i');

    for (var key in obj ) {

      if ( obj.hasOwnProperty(key) ) {
        if ( !angular.equals( obj[key], def[key] ) ) {
          
          if ( angular.isArray(obj[key]) || !angular.isObject(obj[key]) ) {

            if ( !!~key.indexOf('render') || bindingTest.test(key)) {
              var content = ' { \n\t\t' + obj[key].replace(/\n/g, "\n\t\t") + '\n\t}';
            }

            if ( key === 'renderDateText' ) { 
              result['render'] = 'function(date, option)' + content;
            } else if ( key === 'renderBadgeText' ) { 
              result['render'] = 'function(language)' + content;
            } else if ( key === 'renderSymbolicAlphabetFilterText' ) { 
              result['symbolicAlphabetFilter'] = 'function()' + content;
            } else if ( key === 'renderProgressText' ) { 
              result['render'] = 'function(elem, progress)' + content;
            } else if ( key === 'renderSearchText' ) { 
              result['markerRender'] = 'function(match)' + content;
            } else if ( key === 'renderPostLabelText' ) { 
              result['render'] = 'function(label)' + content;
            } else if ( key === 'renderNumberText' ) { 
              result['render'] = 'function(idx)' + content;
            } else if ( bindingTest.test(key) ) { 
              result[key] = 'function()' + content;
            } else if ( key === 'setup' ) {
              if ( isNaN(obj[key]) ) {
                result[key] = obj[key];
              } else {
                result[key] = +obj[key];
              }
            } else if ( key === 'template') {
              var temp = [];

              for (var i=0; i<obj[key].length; i++) {
                if ( isNaN(obj[key][i]) ) {
                  temp.push(obj[key][i]);
                } else {
                  temp.push(+obj[key][i]);
                }
              }

              result[key] = temp;

            } else if ( angular.isArray(obj[key]) ) {
              result[key] = obj[key].slice(0);
            } else {
              result[key] = obj[key]; 
            }
          } else {
            result[key] = changeDiffObj( obj[key], def[key] );
          }
        }
      }
    }

    return result;
  }

  // generate button timing
  function btnTiming() {
    $("#generate").attr("disabled",true);

    var timing = function() {
      setTimeout(function(){
        if ( !myDiv.BTLoaded ) {
          timing();
        } else {
          $("#generate").attr("disabled",false);
        }
      },100);
    };

    timing();
  }