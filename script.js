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
	$("#buscaultimo").click(function() {
		if(localStorage["lastSeenTw"] == null){
			alert("No hay último guardado");
		}else{
			search_tweet(localStorage["lastSeenTw"]);
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
		if(localStorage["lastSeenTw"] != null){
			$('#' + localStorage["lastSeenTw"]).css("border-top","0px");
		}
		localStorage["lastSeenTw"]=$(this).attr("rel");
		$('#' + localStorage["lastSeenTw"]).css("border-top","5px solid red");
	});

	//$(".savetwlink").click(function() {localStorage["lastSeenTw"]=$(this).attr("rel");});

	function found_tweet(twid) {

		if($("#" + twid).length === 0){
			return false;
		}
		return true;
	}
	

	function search_tweet(twid) {
		if(!found_tweet(twid)){
			$("html, body").animate({ scrollTop: $(document).height() }, 0);
			setTimeout(function() {
			    search_tweet(twid);
			}, 1000);
		}else{
				setTimeout(function(){
					//window.location.hash = '#' + twid;
					document.getElementById(twid).scrollIntoView();
					var y = $(window).scrollTop();
					$(window).scrollTop(y-220);
					$('#' +twid).css("border-top","5px solid red");
  			}, 500);
		}
	}

	
	
	//search_tweet();
	
	
});
