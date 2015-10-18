$(document).ready(function(){

	//resizes the background video immediately.
	var videoElement = window.document.getElementsByTagName("video")[0];
	backgroundVideoModule.resize();

	videoElement.onloadstart = function(){
		backgroundVideoModule.resize();
	};
	
	videoElement.onloadedmedadata = function(){
		backgroundVideoModule.resize();
	};

	videoElement.onprogress = function(){
		backgroundVideoModule.resize();
	};

	videoElement.onloadeddata = function(){
		backgroundVideoModule.resize();
	};

	videoElement.onprogress = function(){
		backgroundVideoModule.resize();
	};

	videoElement.oncanplaythrough = function(){
		$(".floating-banner").addClass("float-in").addClass("float-up");	
	};
	//backgroundVideoModule.resize();
	//backgroundVideoModule.debug();

	slideshowModule.initialize();
	slideshowModule.move(0);

	//$("#opening-text").addClass("float-delay-half-second").addClass("float-in").addClass("float-up");
	

	var aboutMeTitleFadedIn = false;
	var slideshowImagesFadedIn = false;
	var projectsTitleFadedIn = false;

	$(window).on("scroll", function(){

		var $body = $("body");

		if($body.scrollTop() > 150 && !aboutMeTitleFadedIn){
			$("#about-me-title").addClass("float-in float-right");
			$("#about-me-image").addClass("float-in float-back");
			aboutMeTitleFadedIn = true;

		}else if($body.scrollTop() > 1300 && !slideshowImagesFadedIn){
			$("img.slideshow-image").addClass("float-in float-back");
			slideshowImagesFadedIn = true;
		}

		if($body.scrollTop() > 850 && !projectsTitleFadedIn){
			$("#projects-title").addClass("float-in float-right");
			projectsTitleFadedIn = true;

		}
	});

	$("#menu").on("click", function(){
		$("#sideMenu").toggleClass("show");
		$(".content").toggleClass("slideLeft");

		/*
			Should place all content in a content div, and place all menu/navigation in a nav element.
			Then when the nav element is being shown, just shift the content left by a smaller amount
			than the navigation is slid in by.
		*/
	});

	$("#closeMenu").on("click", function(){
		$("#sideMenu").toggleClass("show");
		$(".content").toggleClass("slideLeft");
	});

	$(".video-container").on("click", function(){
		//backgroundVideoModule.debug();
	});

	$("#sideMenuList").on("click", "li", function(){

		var $body = $("body");
		var $sideMenu = $("#sideMenu");
		var $content = $(".content");

		switch ($(this).text()){
			case "intro":
				
				$body.animate({scrollTop: $("#about-me-section").offset().top}, 800, function(){
					$sideMenu.toggleClass("show");
					$content.toggleClass("slideLeft");
				});
				break;
			case "programming":
				
				$body.animate({scrollTop: $("#programming-section").offset().top}, 800, function(){
					$sideMenu.removeClass("show");
					$content.removeClass("slideLeft");
				});
				break;
			case "projects":
				$body.animate({scrollTop: $("#projects-section").offset().top}, 800, function(){
					$sideMenu.removeClass("show");
					$content.removeClass("slideLeft");
				});
				break;
			default:
		}

	});
});