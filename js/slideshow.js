var slideShowSettings = {

	//the color that the buttons will be.
	buttonColor: "rgba(0, 0, 0, 1.0)",

	//the shape of the buttons ('circle' or 'square').
	buttonShape: "circle",

	//the distance between the buttons.
	buttonSpacing: "30px",

	//the width of the photos in the slideshow.
	photoWidth: "400px",

	//the distance between the photos.
	photoSpacing: "5px"

};

var slideshowModule = (function(){

	//the 'strip' that all of the photos are in.
	var $photoContainer = $("div.slideshow-container > div.photo-container");

	var $photoContainerWidth;

	var $window = $(window);

	var $windowWidth = $window.width();

	//the container for the buttons.
	var $buttonContainer = $("div.slideshow-container > div.slideshow-tracker-container")
	// the photos within the slide show.
	var $photos = $("div.slideshow-container > div.photo-container > img.slideshow-image");

	var $photoWidth = $photos.first().outerWidth();

	//the number of photos in the slideshow.
	var $numOfPhotos = $photos.length;
	//the index of the current photo being shown.
	var currentPhotoIndex = 0;

	//SETTINGS
	var buttonColor;
	var buttonSpacing;
	var buttonShape;
	var photoWidth;
	var photoSpacing;

	/*************************************************
	*					Jon Freer
	*
	*	Private function that creates the buttons
	*	used to navigate to a particular slide.
	*
	*	Use fragments.
	/*************************************************/
	var createSlideShowButtons = function(){
		var $button;

		for(var i = 0; i < $numOfPhotos; i++){
			$button = $(document.createElement("span"));
			$button.addClass("slideshow-button");
			$button.data("index", i);
			$buttonContainer.append($button);
		}
	};

	/*************************************************
	*					Jon Freer
	*
	*	Private function that sets up the event
	*	handlers for the slide show buttons.
	*
	/*************************************************/
	var createSlideShowButtonEventHandlers = function(){

		$buttonContainer.on("click", ".slideshow-button", function(){
			slideshowModule.move($(this).data("index"));
			$(".slideshow-button").each(function(){
				$(this).removeClass("active");
			});
			$(this).addClass("active");
		});

		//this shouldn't be here but whatever...
		$window.on("resize", function(){
			$windowWidth = $window.width();
			slide();
		});

		//this shouldn't go here either...
		$photoContainer.on("click", ".slideshow-image", function(){
			currentPhotoIndex = $(this).data("index");
			slide();
		});

	};

	/*************************************************
	*					Jon Freer
	*
	*	Private function that takes care of sliding
	*	the photos to the correct location.
	*
	/*************************************************/
	var slide = function(){

		var distanceToPushRight = ($windowWidth / 2) - ($photoWidth / 2) - (currentPhotoIndex * ($photoWidth + 100));

		$photoContainer.css("left", distanceToPushRight);

	};

	/*************************************************
	*					Jon Freer
	*
	*	Private function that validates the settings
	*	object used to configure the slide show.
	*
	/*************************************************/
	var validateSettings = function(settings){
		if(	settings.buttonColor !== undefined && 
			settings.buttonSpacing !== undefined && 
			settings.buttonShape !== undefined &&
			settings.photoWidth !== undefined &&
			settings.photoSpacing !== undefined){

			return true;
		}

		return false;
	};

	/*************************************************
	*					Jon Freer
	*
	*	Private function that sets the width of the photo
	*	container so that it can fit all of the photos
	*	and the spacing between them.
	*
	/*************************************************/
	var adjustPhotoContainerSize = function(){

		var width = 0;

		$photos.each(function(i){
			width += $(this).outerWidth();
		});
		$photoContainerWidth = width;
		$photoContainer.css("width", $photoContainerWidth + (($numOfPhotos - 1) * (100 * 2)));

		//alert($photoContainerWidth);

	};

	return {

		initialize: function(){

			$photos.each(function(index){
				$(this).data("index", index);
			});

			createSlideShowButtons();
			createSlideShowButtonEventHandlers();
			adjustPhotoContainerSize();
		},

		configure: function(settings){

			try{

				//make sure we have a valid settings objects to work with.
				if(settings !== undefined && settings !== null && validateSettings(settings)){

					buttonColor = settings.buttonColor;
					buttonSpacing = settings.buttonSpacing;
					buttonShape = settings.buttonShape;
					photoWidth = settings.photoWidth;
					photoSpacing = settings.photoSpacing;



				}else{
					throw("The settings provided are invalid.")
				}

			}catch(e){

				window.alert(e);

			}finally{



			}

		},

		move: function(next){

			//if the index specified is invalid...
			if(next > ($numOfPhotos.length - 1) || next < 0){

				//just move to the first one.
				currentPhotoIndex = 0;

				//log...
				console.log("The photo index specified is out of bounds! Choosing the first photo...");

			}else{

				currentPhotoIndex = next;
			}

			slide();

		}

	};

})();