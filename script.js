$(window).load(function() {

	function checkURL() {
		
		if(location.href !== "https://twitter.com/"){
			$('#buscaultimo').hide();
			$('.savetwlink').hide();
			
		}else{
			$('#buscaultimo').show();
			agregarUltimo();
		}
		
		setTimeout(function() {
			    checkURL();
		}, 1000);
	}

	function agregarUltimo() {

		$('#stream-items-id > div').each(function() {
			if($(this).find('.savetwlink').text()===""){
				$(this).find('.tweet-actions').append('<li class="action-fav-container"><a class="savetwlink" rel="' + $(this).attr("id") + '"> Último</a></li>');//&#8c593;
 			}		
		});
		
	}

	checkURL();
	
	$('#global-actions').append('<li><a class="js-hover js-nav" id="buscaultimo"><img id="down-arrow"/><p id="texto-buscar">Buscar Último</p></a></li>');
	var imgURL = chrome.extension.getURL("images/down-arrow.png");
	document.getElementById("down-arrow").src = imgURL;

	$('#buscaultimo').css("color","#bbb");
	$('#buscaultimo').css("margin","-3px 0 0 -10px");
	$('#texto-buscar').css("margin","-17px 0px 0px 24px");
	$('.bird-topbar-etched').css("margin-left","55px");
	$("#buscaultimo").click(function(event) {
		event.preventDefault();
		if(localStorage["lastSeenTw"] == null){
			alert("No hay último guardado");
		}else{
			var twid = localStorage["lastSeenTw"];
			console.log(1);
			if (!found_tweet(twid)) {
				search_tweet(twid, getLastID());
			}else{
				console.log("here");
				document.getElementById(twid).scrollIntoView();
				
				var y = $(window).scrollTop();
				$(window).scrollTop(y-220);
				$('#' +twid).css("border-top","5px solid red");
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
	
	$(document).on('click', '.savetwlink', function()
	{
		console.log(666);
		if(localStorage["lastSeenTw"] != null){
			$('#' + localStorage["lastSeenTw"]).css("border-top","0px");
		}
		localStorage["lastSeenTw"]=$(this).attr("rel");
		$('#' + localStorage["lastSeenTw"]).css("border-top","5px solid red");
	});

	function found_tweet(twid) {

		if($("#" + twid).length === 0){
			return false;
		}
		return true;
	}

	function search_tweet(twid, lastID) {
		console.log(2);
		if(!found_tweet(twid)){
			if (lastID != getLastID()) {
				$("html, body").animate({ scrollTop: $(document).height() }, 500);
			};
			setTimeout(function() {
			    search_tweet(twid);
			}, 1000);
		}else{
			console.log(3);
			positionTweet(twid);
		}
	}

	function positionTweet(twid){
		console.log(4);
		if ($('#' +twid).offset().top - $(window).scrollTop() != 220) {
		//window.location.hash = '#' + twid;
		document.getElementById(twid).scrollIntoView();
		var y = $(window).scrollTop();
		$(window).scrollTop(y-220);
		$('#' +twid).css("border-top","5px solid red");
		setTimeout(function() {
			    positionTweet(twid);
		}, 400);
		}
	}
		
});
