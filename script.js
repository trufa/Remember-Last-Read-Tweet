$(window).load(function() {

	var userId = $('style').attr('id').split("-")[2] + "-last-twid";
	function checkURL() {
		if(location.href !== "https://twitter.com/"){
			$('#searchLast').hide();
			$('.saveTweetLink').hide();
		}else{
			$('#searchLast').show();
			addMarkAsLast();
		}
		setTimeout(function() {
			    checkURL();
		}, 1000);
	}

	function addMarkAsLast() {
		$('#stream-items-id > li').each(function() {
			if($(this).find('.saveTweetLink').text()===""){
				$(this).find('.tweet-actions').append('<li class="action-fav-container"><a class="saveTweetLink" rel="' + $(this).attr("id") + '"> ' + chrome.i18n.getMessage("save_link_text") + '</a></li>');
 			}		
		});
	}

	checkURL();
	
	$('#global-actions').append('<li><a class="js-hover js-nav" id="searchLast"><img id="down-arrow"/><p id="SearchLinkText" style="cursor: hand; cursor: pointer;">' + chrome.i18n.getMessage("search_tweet") + '</p></a></li>');
	var imgURL = chrome.extension.getURL("images/down-arrow.png");
	document.getElementById("down-arrow").src = imgURL;

	$('#searchLast').css("margin","-3px 0 0 -10px");
	$('#SearchLinkText').css("margin","-17px 0px 0px 24px");
	$('.bird-topbar-etched').css("margin-left","55px");
	$("#searchLast").click(function(event) {
		event.preventDefault();
		if(localStorage[userId] == null){
			alert(chrome.i18n.getMessage("no_saved_tweet") + " " + userId.split("-")[0]) + ".";
		}else{
			var twid = localStorage[userId];
			if (!found_tweet(twid)) {
				search_tweet(twid, getLastID());
			}else{
				document.getElementById(twid).scrollIntoView();
				var y = $(window).scrollTop();
				$(window).scrollTop(y-220);
				$('#' +twid).css("border-top","5px dashed #0084B4");
			}
		}
	});
	
	function getLastID(){
		var last = "";
		$('#stream-items-id > div').each(function() {
				last = $(this).attr("id");
		});
		return last;
	}
	
	$(document).on('click', '.saveTweetLink', function() {
		if(localStorage[userId] != null){
			$('#' + localStorage[userId]).css("border-top","0px");
		}
		localStorage[userId]= $(this).attr("rel");
		$('#' + localStorage[userId]).css("border-top","5px dashed #0084B4");
	});

	function found_tweet(twid) {
		if($("#" + twid).length === 0){
			return false;
		}
		return true;
	}

	function search_tweet(twid, lastID) {
		if(!found_tweet(twid)){
			if (lastID != getLastID()) {
				$("html, body").animate({ scrollTop: $(document).height() }, 500);
			};
			setTimeout(function() {
			    search_tweet(twid);
			}, 1000);
		}else{
			positionTweet(twid);
		}
	}

	function positionTweet(twid){
		if ($('#' +twid).offset().top - $(window).scrollTop() != 220) {
			document.getElementById(twid).scrollIntoView();
			var y = $(window).scrollTop();
			$(window).scrollTop(y-220);
			$('#' +twid).css("border-top","5px dashed #0084B4");
			setTimeout(function() {
				positionTweet(twid);
			}, 400);
		}
	}
});
