//PEP THINGS
$(document).ready(function(){
	$('.pep').pep({
		droppable: ".droppable",
		overlapFunction: false,
		useCSSTranslation: false,
		constrainTo: 'window',
		start: function(ev, obj){
			// obj.noCenter = false;
		},
		drag: function(ev, obj){
			var vel = obj.velocity();
			var rot = (vel.x)/5;
			rotate(obj.$el, rot)         
		},
		stop: function(ev, obj){
			handleCentering(ev, obj);
			rotate(obj.$el, 0)         
		},
		rest: handleCentering
	});

	function handleCentering(ev, obj){
		if ( obj.activeDropRegions.length > 0 ) { 
			centerWithin(obj);
		}   
	}

	function centerWithin(obj){
		var $parent = obj.activeDropRegions[0];
		var pTop    = $parent.offset().top;
		var pLeft   = $parent.offset().left;
		var pHeight = $parent.outerHeight();
		var pWidth  = $parent.outerWidth();

		var oTop    = obj.$el.offset().top;
		var oLeft   = obj.$el.offset().left;
		var oHeight = obj.$el.outerHeight();
		var oWidth  = obj.$el.outerWidth();

		var cTop    = pTop + (pHeight/2);
		var cLeft   = pLeft + (pWidth/2);

		if ( !obj.noCenter ) {
			if ( !obj.shouldUseCSSTranslation() ) {
				var moveTop = cTop - (oHeight/2);
				var moveLeft = cLeft - (oWidth/2);
				obj.$el.animate({ top: moveTop, left: moveLeft }, 50);
			} else{
				var moveTop   = (cTop - oTop) - oHeight/2;
				var moveLeft  = (cLeft - oLeft) - oWidth/2;

				console.log(oTop, oLeft)
				obj.moveToUsingTransforms( moveTop, moveLeft );
			}

			obj.noCenter = true;
			return;
		}

		obj.noCenter = false;
	}

	function rotate($obj, deg){
		$obj.css({ 
				"-webkit-transform": "rotate("+ deg +"deg)",
					 "-moz-transform": "rotate("+ deg +"deg)",
						"-ms-transform": "rotate("+ deg +"deg)",
						 "-o-transform": "rotate("+ deg +"deg)",
								"transform": "rotate("+ deg +"deg)" 
			}); 
	}
});