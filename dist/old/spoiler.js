$(document).ready(function(){
	$("span.spoiler").each(function(i, value){
		var html = '';
		
    html += '<div class="smallfont">';
		if($(this).attr("title") == null || $(this).attr("title") == ''){
			html += '<b>Spoiler</b> ';
		} else {
			html += '<b>Spoiler</b> for <i>'+$(this).attr("title")+'</i>: ';
		}
		html += '<input type="button" value="Show" class="spoiler" />';
    html += '</div>';  
		html += '<div class="spoiler-container"><div class="spoiler-content" style="display:none">';
		html += $(this).html();
		html += '</div></div>';
		$(this).after(html);
	});
	
	$("span.spoiler").remove();
  $(".smallfont").css({'margin-bottom':'2px'});
	$(".spoiler").css({'margin':'0','padding':'0','width':'45px','font-size':'10px'})
	$("div.spoiler-container").css({'margin':'0','padding':'6px','border':'1px inset'});
	
	$(".spoiler").click(function(){
		var index = $(".spoiler").index(this);
		var current = $(".spoiler-content:eq("+index+")");
		
		if($(this).attr("value") == "Show"){
			$(this)	.attr("value","Hide");
		} else {
			$(this)	.attr("value","Show");
		}
		
		if(current.is(":hidden")){
			current.show();	
		} else {
			current.hide();	
		}
	});
});