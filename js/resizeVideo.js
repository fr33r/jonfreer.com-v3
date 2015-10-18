var backgroundVideoModule = (function(){

	//wrap the window object in a jQuery object.
	var $window = $(window);
	//the height of the viewport.
	var $windowHeight;
	//the width of the viewport.
	var $windowWidth;
	//aspect ratio of the viewport.
	var $windowRatio;
	//jQuery object representing the background video element.
	var $video = $("#opening-video");
	//the height of the background video element.
	var $videoHeight;
	//the width of the background video element.
	var $videoWidth;
	//the aspect ratio of the background video element.
	var $videoRatio;
	//the value used to adjust the size of the video element
	//when the windows aspect ratio is less than the videos 
	//aspect ratio.
	var $adjustRatio;
	//event handler for when the viewport is resized.
	$window.on("resize", function(){
		backgroundVideoModule.resize();
	});

	return {
		resize: function(){

			//regather all of the aspect ratios and recalculate
			//the adjustment ratio.
			$windowHeight = $window.height();
			$windowWidth = $window.width();
			$windowRatio = $windowWidth/$windowHeight;
			$videoHeight = $video.height();
			$videoWidth = $video.width();
			$videoRatio = $videoWidth/$videoHeight;
			$adjustRatio = $videoRatio/$windowRatio;

			//if the windows ratio is smaller than the ratio
			//of the background video...
			if($windowRatio < $videoRatio){
				$video.css("width", $windowWidth * $adjustRatio);
			}else{
				$video.css("width", $windowWidth);
			}
		},

		debug: function(){
			alert( 	"VARIABLES\n" + 
					"window height = " + $windowHeight + "\n" +
					"window width = " + $windowWidth + "\n" + 
					"window ratio = " + $windowRatio + "\n" + 
					"video height = " + $videoHeight + "\n" + 
					"video width = " +  $videoWidth + "\n" + 
					"video ratio = " + $videoRatio + "\n" + 
					"adjust ratio = " + $adjustRatio + "\n"	);
		}
	};
})();