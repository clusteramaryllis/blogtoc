# BlogToc

A javascript plugin to make table of contents for blogspot using Blogger Feed API

## Basic Usage ##

Place this code somewhere in the `<head></head>` section.

```html
<script type="text/javascript" src="//clusteramaryllis.github.io/blogtoc/dist/1.6.3/blogtoc.min.js"></script>
```

Then add these codes below in your blog page or post

```html
<div id="YOUR_ID"></div>
 
<script type="text/javascript">
var myDiv = document.getElementById('YOUR_ID');
 
BlogToc( myDiv ).build({
  url: "YOUR_BLOGSPOT_URL.blogspot.com"
});
</script>
```

## Demo ##
http://clusteramaryllis.github.io/blogtoc/

## Compatibility ##
The Javascript Files are being tested in the latest versions of Chrome, Firefox, 
and IE6+ (Partial)

## License ##
[LICENSE](https://github.com/clusteramaryllis/blogtoc/blob/develop/LICENSE)

## External Resources & Acknowledgements ##
BlogToc using some external service to generate image on the fly

* [boxresizer](http://boxresizer.com/)
* [mobify](http://www.mobify.com/mobifyjs/v2/docs/image-resizer/)
* [sencha](http://www.sencha.com/learn/how-to-use-src-sencha-io/)
* [using google image resizer trick](http://carlo.zottmann.org/2013/04/14/google-image-resizer/)

User interface using [Twitter Bootstrap](http://getbootstrap.com/)

And iconic font from [Bootmetro](http://aozora.github.io/bootmetro)