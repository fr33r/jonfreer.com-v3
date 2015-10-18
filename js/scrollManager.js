/*********************************************
 *				SCROLL MANAGER
 *
 *	Responsible for administering all scrolling
 *	activites on the page.
 *
 *	Implemented using the module javascript
 *	design pattern.
 *
 *	@dependencies
 *		jQuery
 *
 *********************************************/

var scrollManager = (function(){

	var targetElements = [];		//the list of elements that are being managed.
	var $context = $("body");		//the 

	/*********************************************
 	*			*
	*  PRIVATE	*
 	*************	
 	*
 	*	Attempts to retrieve a managed element.
 	*
 	*	@params
 	*		name 	-->	The unique name of the
 	*					managed element.
 	*
 	*	@throws
 	*		ElementNotFoundException
 	*
 	*	@returns
 	*		Object 	-->	The managed element.
 	*
	*********************************************/
	var lookupElement = function(name, onErrorCallback){

		for(var i = 0; i < targetElements.length; i++ ){
			if(targetElements[i].name === name){
				return targetElements[i];
			}
		}

		throw new ElementNotFoundException(name);

		/*try{

		}catch(exception){
			if(onErrorCallback !== undefined && onErrorCallback !== null){
				if(typeof onErrorCallback === "function"){
					onErrorCallback();
				}
			}
		}*/
	}

	return {

		/*********************************************
		 *			*
		 *	PUBLIC	*
		 ************	
		 *
		 *	Scrolls to the jQuery object provided. If
		 * 	the jQuery object consists of more than one
		 *	element, the first element will be scrolled
		 *	to.
		 *
		 *********************************************/
		scrollTo: function(jQueryObj){

		},

		/*********************************************
		 *			*
		 *	PUBLIC	*
		 ************		
		 *
		 *	Gives a free ride to the top of the page.
		 *
		 *********************************************/
		scrollToTop: function(){

		},

		/*********************************************
		 *			*
		 *	PUBLIC	*
		 ************		
		 *	
		 *	Gives a free ride to the bottom of the page.
		 *
		 *********************************************/
		scrollToBottom: function(){

		},

		/*********************************************
		 *			*
		 *	PUBLIC	*
		 ************	
		 *			
		 *	Provides the number of elements that are
		 *	being watched.
		 *
		 *	@returns
		 *		number 		--> The number of elements
		 *						that are managed.
		 *
		 *********************************************/
		numberOfTargetElements: function(){
			return targetElements.length;
		},

		/*********************************************
		 *			*
		 *	PUBLIC	*
		 ************	
		 *			
		 *	Responsible for setting up an element to 
		 *	managed by the scrollManager.
		 *
		 *	@params
		 *		jQueryObj	-->	The jquery object
		 *						that represents the 
		 *						element on the page
		 *						to be managed.
		 *
		 *		name 		--> The unqiue name to be
		 *						assigned to the element
		 *						being managed.
		 *
		 *		delay		-->	The amount of time that
		 *						should elapse prior to
		 *						any CSS being triggered.
		 *
		 *		buffer		-->	The amount of space above
		 *						the target element
		 *						before actions are performed
		 *						on it.
		 *
		 *	@returns
		 *		boolean		-->	True if the registration
		 *						was successful; false
		 *						otherwise.
		 *
		 *********************************************/
		registerTargetElement: function(jQueryObj, name, delay, buffer){

			for( var i = 0; i < targetElements.length; i ++){
				if(targetElements[i].name === name){
					throw new ElementAlreadyExistsException(name);
				}
			}
			
			targetElements.push({
				jQueryObj: jQueryObj,
				name: name,
				delay: delay,
				buffer: buffer
			});
		},

		/*********************************************
		 *			*
		 *	PUBLIC	*
		 ************		
		 *		
		 *	Responsible for forgetting an element that
		 *	is already managed by the scrollManager
		 *	so that it is no longer managed.
		 *
		 *	@params
		 *		name 		-->	The unique name of the 
		 *						target element to forget.
		 *
		 *	@returns
		 *		Object		-->	The element that was removed.
		 *
		 *********************************************/
		removeTargetElement: function(name){
			for(var i = 0; i < targetElements[i]; i++){
				if(targetElements[i].name === name){
					return targetElements.splice(i, 1);
				}
			}
			throw new ElementNotFoundException(name);
		}
	};

})();


function ElementNotFoundException(name){
	this.name = name;
	this.message = "The scrolling manager could not find an element registered with the name " + name + ".";
}

function ElementAlreadyExistsException(name){     
	this.name = name;
	this.message = "The scrolling manager could not register the element with name "
	+ name + "  because there is already an element being managed with that name." 
}
