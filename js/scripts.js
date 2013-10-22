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

	$(document).ready(function() {
		$('#ribbon-1.tshirt').css({'margin-top':'418px', 'margin-left':  '155px'});
		$('#ribbon-2.tshirt').css({'margin-top':'418px', 'margin-left':  '205px'});
		$('#ribbon-3.tshirt').css({'margin-top':'418px', 'margin-left':  '255px'});
	});

	$('#ribbon-1.tshirt, #ribbon-2.tshirt, #ribbon-3.tshirt').on('mousedown', function(){
		$(this).css({'margin-top':'0', 'margin-left':  '0'});
	});

	getArtistThumbs();
	sampleNumber();

	var onSort = false;
	var toggled = false;
	var playing = false;
	var x=1;
	var firstPlay1 = true;
	var firstPlay2 = true;
	var firstPlay3 = true;
	var lastRibbonMoved = "";

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
			$($('.artist-name')[i]).prev('figure').addClass(band);
		}
	}

	function slideList() {
		$('#entry-nav ul').toggle("slow");
	}

	function playPause(e) {
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
				else if (x==2 && firstPlay2) {
					Timer2 = new radialTimer();
					Timer2.init("timer2", 10);
					firstPlay = false;
				}
				else if (x==3 && firstPlay3) {
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

	//tells you WHICH sample you're looking at 
	//(on arrow click it changes)
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

	$('.droppable.two .magnet-area').css('display','none'); // fixes sidebar bug
	//what physically happens when you move the arrows
	function changeSample() {
		switch (x)
		{
		case 1:
			$('.audio-1, .droppable.one, .onfirst').css('margin-left','0px');
			$('.audio-2, .droppable.two, .onsecond').css('margin-left','300px');
			$('.audio-3, .droppable.three, .onthird').css('margin-left','600px');
			$('.droppable.two .magnet-area').css('display','none');
			$('.nav-show:nth-child(2)').removeClass('on');
			$('.nav-show:nth-child(1)').addClass('on');
			Song=document.getElementById("song-1");
		  break;
		case 2:
			$('.audio-1, .droppable.one, .onfirst').css('margin-left','-300px');
			$('.audio-2, .droppable.two, .onsecond').css('margin-left','0px');
			$('.audio-3, .droppable.three, .onthird').css('margin-left','300px');
			$('.droppable.two .magnet-area').css('display','block');
			$('.droppable.three .magnet-area').css('display','none');
			$('.nav-show:nth-child(1)').removeClass('on');
			$('.nav-show:nth-child(3)').removeClass('on');
			$('.nav-show:nth-child(2)').addClass('on');
			Song=document.getElementById("song-2"); 
		  break;
		case 3:
			$('.audio-1, .droppable.one, .onfirst').css('margin-left','-600px');
			$('.audio-2, .droppable.two, .onsecond').css('margin-left','-300px');
			$('.audio-3, .droppable.three, .onthird').css('margin-left','0px');
			$('.droppable.three .magnet-area').css('display','block');
			$('.nav-show:nth-child(2)').removeClass('on');
			$('.nav-show:nth-child(3)').addClass('on');
			Song=document.getElementById("song-3");
		  break;
		}
	}
	
	// happens on drag of these ribbons
  $('#ribbon-1, #ribbon-2, #ribbon-3').draggable({
		start: function(event, ui) {
			console.log ('on the ' + x + 'sample')
		},
		// when dragging stops
		stop: function(event, ui) {
		  lastRibbonMoved = event.target.id;
		  console.log(lastRibbonMoved  +' was moved');
		  registerVote(); 
		}
	  });

  var firstMoved = secondMoved = thirdMoved = false;
  function registerVote() {
  	if ($('.droppable').hasClass('pep-dpa')){
  		console.log(lastRibbonMoved + ' is on the medal stand');
		if (x == 1) {
			$('#'+lastRibbonMoved).addClass('onfirst').removeClass('draggable');
			$('.playpause.1').addClass(lastRibbonMoved);
		}
		if (x == 2) {
			$('#'+lastRibbonMoved).addClass('onsecond').removeClass('draggable');
			$('.playpause.2').addClass(lastRibbonMoved);
		}
  		if (x == 3) {
  			$('#'+lastRibbonMoved).addClass('onthird').removeClass('draggable');
  			$('.playpause.3').addClass(lastRibbonMoved);
  		}
  		if (lastRibbonMoved == "ribbon-1") {
  			firstMoved = true;
  		}
  		if (lastRibbonMoved == "ribbon-2") {
  			secondMoved = true;
  		}
  		if (lastRibbonMoved == "ribbon-3") {
  			thirdMoved = true;
  		}
  		
  	}
  	// if they're all open, show the results page
  	if (firstMoved && secondMoved && thirdMoved) {
  		console.log('submit is shown');
  		$('.submit-vote').css('display','block');
  		$('.ribbon-shadows').css('display','none');
  		$('.submit-vote').on('click', openResults);

  		function openResults() {
  			resultsOpen = true;
  			$('.results').css('display','block');

	  		setTimeout(function case3Function() {
	  			$('.result-line.1').css('width','112px')
	  			$('.result-line.2').css('width','40px')
	  			$('.result-line.3').css('width','20px')
	  		},300);
  		}
  	}
  }

	resultsOpen = false;
	$('a').on('click', closeResults);

	function closeResults() {
		if (resultsOpen) {
			$('.submit-vote').css('display','none');
  			$('.ribbon-shadows').css('display','block');
  			resultsOpen = false;
  			$('.results').css('display','none');
		}
	}

}); // end of SIAF



