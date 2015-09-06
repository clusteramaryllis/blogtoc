$(document).ready(function(){
	$("span.quote").each(function(i, value){
		var html = '';
		
		html += '<div class="quote-init">';
		html += '<div class="quote">';
		html += '<div class="quote-container">';
		html += '<div class="quote-arrow"></div>';
		
		if($(this).attr("name") != null && $(this).attr("name") != ''){
			html += '<div class="quote-posted">';
			html += '<img src="http://4.bp.blogspot.com/-KfoOEKCY1OU/T0r6M57iBRI/AAAAAAAABnA/Ovkw4gcqchI/s1600/quote_icon.png" alt="Quote" title="Quote" />';
			html += ' Originally posted by '+ $(this).attr("name");
			if($(this).attr("src") != null && $(this).attr("src") != ''){
				html += ' <a href="' + $(this).attr("src") + '">';
				html += '<img class="quote-source" src="http://3.bp.blogspot.com/-W6HEWtrYhlI/T0r6NqgHYSI/AAAAAAAABnI/dN6d3UxlqJo/s1600/viewpost-right.png" alt="View Source" title="View Source" />';
				html += '</a>';
			}
			html += '</div>';
			html += '<div class="quote-content">';
		}
		html += $(this).html();
		if($(this).attr("name") != null && $(this).attr("name") != ''){
			html += '</div>';
		}
		html += '</div></div></div>';
		$(this).after(html);
	});
	
	$("span.quote").remove();
	$("div.quote-init").css({'margin':'5px 20px 20px','display':'block'});
	$("div.quote").css({'margin':'0 10px 10px','border-radius':'5px','-webkit-border-radius':'5px','-moz-border-radius':'5px','-khtml-border-radius':'5px','background':'#F2F6F8 none','border':'1px solid #417394','font':'italic normal 13px Tahoma,Calibri,Verdana,Geneva,sans-serif','position':'relative','top':'0'});
	$("div.quote-container").css({'border-radius':'5px','-webkit-border-radius':'5px','-moz-border-radius':'5px','-khtml-border-radius':'5px','padding':'5px 10px'});
	$("div.quote-arrow").css({'background':'transparent url(http://4.bp.blogspot.com/-ntB11MvdqRM/T0r6MLJkpzI/AAAAAAAABm8/HoHFdWlP-Fc/s1600/quote-left.png) no-repeat left','display':'block','width':'9px','height':'13px','position':'absolute','top':'5px','left':'-9px'});
	if($("div.quote-posted").length > 0){
		$("div.quote-posted").css({'font':'normal 12px Tahoma,Calibri,Verdana,Geneva,sans-serif'});
		$("div.quote-content").css({'padding':'8px 0'});
		if($(".quote-source").length){
        $(".quote-source").css({'position':'relative','top':'1px','border':'none'});
		}
	}
});