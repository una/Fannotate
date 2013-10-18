$(function(){
	// Turning things on
	$(".all-thumbs").sortable().sortable('disable');
	$('.sortToggle').on('click', allowSorting );
	$('.artist-link').on('click', getArtist );
	$('.toggle').on('click', toggleList);
	// $('.accordion-btn').on('click', slideList);
	$('.red-check').click(function() {
	  $( this ).toggleClass('checked');
	});

	$('.playpause').on('click', playPause );

	getArtistThumbs();
	var onSort = false;
	var toggled = false;
	var playing = false;
	var x=1;
	var firstPlay1 = true;
	var firstPlay2 = true;
	var firstPlay3 = true;

	function allowSorting() {
		if (onSort) {
			$(".all-thumbs").sortable('disable');
			$( ".all-thumbs li" ).removeClass('shaking');
			$('.sortToggle>.ui-btn-inner>.ui-btn-text').html('Arrange');
			 onSort = false;
		}
		else {
		$(".all-thumbs").sortable('enable');
		$( ".all-thumbs" ).disableSelection();
		$(".all-thumbs li").addClass('shaking');
		$('.sortToggle>.ui-btn-inner>.ui-btn-text').html('Done');
		onSort = true;
		}
	};

	function getArtist(e) {
		var currentArtist = (e.currentTarget.children[1].innerHTML)
		$('.current-artist').html(currentArtist);
	}

	function toggleList(){
		if (toggled) {
			toggled = false;
			$('.fade-block').show();
		}
		else {
			toggled = true;
			$('.fade-block').hide();
		}
	}

	function getArtistThumbs() {
		for (var i=0;i<$('.artist-link').length;i++) {
			var band = $('.artist-name')[i].innerHTML.toLowerCase().replace( /\s/g, "_");
			// console.log(band);
			$($('.artist-name')[i]).prev('figure').addClass(band);
		}
	}

	function slideList() {
		$('#entry-nav ul').toggle("slow");
	}

	function playPause(e) {
		console.log('clicked audio controls');

		if (playing) {
			pauseSong();
			//Timer.stop(); doesnt exist
			$(this).removeClass('playing');
			playing = false;
		}

		else if (playing == false) {
			playing = true;
			playSong();
			$(this).addClass('playing');
				if (x==1 && firstPlay1) {
					Timer1 = new radialTimer();
					Timer1.init("timer1", 10);
					firstPlay = false;
				}
				else if
					(x==2 && firstPlay2) {
					Timer2 = new radialTimer();
					Timer2.init("timer2", 10);
					firstPlay = false;
				}
				else if
					(x==3 && firstPlay3) {
					Timer3 = new radialTimer();
					Timer3.init("timer3", 10);
					firstPlay = false;
				}
		}

		

	}
	var Song=document.getElementById("song-1"); 
	function playSong(num)
	  { 
		
		Song.play(); 
	  } 
	function pauseSong(num)
	  { 
		Song.pause(); 
	  }

	
	function sampleNumber() {
		
		$('.larr').on('click', function(){
			if (x > 1){
				x-=1;
			}
			changeSample();
		});
		$('.rarr').on('click', function(){
			if (x < $('.sample-options').children.length+1){
				x+=1;
			}
			changeSample();
		});

	}

	sampleNumber();

	function changeSample() {
		switch (x)
		{
		case 1:
			$('.audio-1, .droppable.one').css('margin-left','0px');
			$('.audio-2, .droppable.two').css('margin-left','300px');
			$('.audio-3, .droppable.three').css('margin-left','600px');
			Song=document.getElementById("song-1");
			if (thisisFirst) {
				console.log('first has first place and on first');
				$('.ribbon-1').css({'left':'0px'});
			}

		  break;
		case 2:
			$('.audio-1, .droppable.one').css('margin-left','-300px');
			$('.audio-2, .droppable.two').css('margin-left','0px');
			$('.audio-3, .droppable.three').css('margin-left','300px');
			Song=document.getElementById("song-2"); 
			if (thisisFirst) {
				console.log('first has first place and on second');
				$('.ribbon-1').css({'left': '-300px'});
			}
		  break;
		case 3:
			$('.audio-1, .droppable.one').css('margin-left','-600px');
			$('.audio-2, .droppable.two').css('margin-left','-300px');
			$('.audio-3, .droppable.three').css('margin-left','0px');
			Song=document.getElementById("song-3");
			if (thisisFirst) {
				console.log('first has first place and on third');
				$('.ribbon-1').css('left', '-600px');
			}
		  break;
		}
	}

	function whatDropped() {
		if ($('.droppable').hasClass('first')){

		}
	}

	var lastRibbonMoved = "";

  $('#ribbon-1, #ribbon-2, #ribbon-3').draggable({
	// get the initial X and Y position when dragging starts
		start: function(event, ui) {
		  xpos = ui.position.left;
		  ypos = ui.position.top;
		},
		// when dragging stops
		stop: function(event, ui) {
		  // calculate the dragged distance, with the current X and Y position and the "xpos" and "ypos"
		  var xmove = ui.position.left - xpos;
		  var ymove = ui.position.top - ypos;

		  // define the moved direction: right, bottom (when positive), left, up (when negative)
		  var xd = xmove >= 0 ? ' To right: ' : ' To left: ';
		  var yd = ymove >= 0 ? ' Bottom: ' : ' Up: ';

		  lastRibbonMoved = event.target.id;
		  console.log(lastRibbonMoved  +' was moved,\n\n'+ xd+ xmove+ ' pixels \n'+ yd+ ymove+ ' pixels');
		  registerVote();
		}
	  });

  var thisisFirst = thisisSecond = thisisThird = false;
  function registerVote() {
  	if ($('.droppable').hasClass('pep-dpa')){
  		console.log('something on the medal stand');
  		if (lastRibbonMoved == "ribbon-1"){
  			console.log('first place!');
  			thisisFirst = true;
  		}
  		else if (lastRibbonMoved == "ribbon-2"){
  			console.log('second place!');
  			thisisSecond = true;
  		}
  		if (lastRibbonMoved == "ribbon-3"){
  			console.log('third place!');
  			thisisThird = true;
  		}
  	}
  }

}); // end of SIAF



