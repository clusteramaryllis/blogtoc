### Basic Usage ###

Place this code somewhere in the `<head></head>` section.

```html
<script type="text/javascript" src="//blogtoc2.googlecode.com/svn/trunk/blogtoc.min.js"></script>
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

## Compatibility ##
The Javascript Files are being tested in the latest versions of Chrome, Firefox, and IE6+

## License ##
http://www.apache.org/licenses/LICENSE-2.0

## External Resources ##
BlogToc using some external service to generate image on the fly

* [boxresizer](http://boxresizer.com/)
* [mobify](http://www.mobify.com/mobifyjs/v2/docs/image-resizer/)
* [sencha](http://www.sencha.com/learn/how-to-use-src-sencha-io/)
* [using google image resizer trick](http://carlo.zottmann.org/2013/04/14/google-image-resizer/)

Some awesome projects for theming purpose

* [Twitter Bootstrap](http://getbootstrap.com/)
* [Bootmetro](http://aozora.github.io/bootmetro/)
* [TODC Bootstrap](http://todc.github.io/todc-bootstrap/index.html)

And iconic font from [Bootmetro](http://aozora.github.io/bootmetro)

## FAQ ##

##### Your grammar sucks #####
English is not my native language so, send me an email if you find any mistakes or contribute yourself on github to fix the mistakes.

##### Your coding/design was bad #####
My programming level are not expert and I'm not a designer guy. Mostly everything I know come from different resource and online tutorial. I'm just happy if this application works for you :). And this is open source project, so you may help me improve the code or design by contributing on github.