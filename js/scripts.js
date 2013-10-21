// $(function(){
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

	$('.droppable.two .magnet-area').css('display','block'); // fixes sidebar bug


	//what physically happens when you move the arrows
	function changeSample() {
		switch (x)
		{
		case 1:
			$('.audio-1, .droppable.one').css('margin-left','0px');
			$('.audio-2, .droppable.two').css('margin-left','300px');
			$('.audio-3, .droppable.three').css('margin-left','600px');
			$('.droppable.two .magnet-area').css('display','none');
			Song=document.getElementById("song-1");
			
		  break;
		case 2:
			$('.audio-1, .droppable.one').css('margin-left','-300px');
			$('.audio-2, .droppable.two').css('margin-left','0px');
			$('.audio-3, .droppable.three').css('margin-left','300px');
			$('.droppable.two .magnet-area').css('display','block');
			$('.droppable.three .magnet-area').css('display','none');
			Song=document.getElementById("song-2"); 

		  break;
		case 3:
			$('.audio-1, .droppable.one').css('margin-left','-600px');
			$('.audio-2, .droppable.two').css('margin-left','-300px');
			$('.audio-3, .droppable.three').css('margin-left','0px');
			$('.droppable.three .magnet-area').css('display','block');
			Song=document.getElementById("song-3");

		  break;
		}
		grantAward;
	}

//reads what medal you just moved to the stand
	function caseFunction() {
		if (lastRibbonMoved == "ribbon-1") {
			onFirst = "first";
		}
		else if (lastRibbonMoved == "ribbon-2") {
			onFirst = "second";
		}
		else if (lastRibbonMoved == "ribbon-3") {
			onFirst = "third";
		}
	}
	
	// happens on drag of these ribbons
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
		  console.log(lastRibbonMoved  +' was moved');
		  registerVote();
		}
	  });

  var firstMoved = secondMoved = thirdMoved = false;
  function registerVote() {
  	if ($('.droppable').hasClass('pep-dpa')){
  		console.log('something on the medal stand');
  		if (lastRibbonMoved == "ribbon-1"){
  			console.log('first place!');
  			firstMoved = true;
			if (x==1) {
				grantAward('m1on1');
			}
			else if (x==2) {
				grantAward('m1on2');
			}
			else if (x==3) {
				grantAward('m1on3');
			}
  		}
  		else if (lastRibbonMoved == "ribbon-2"){
  			console.log('second place!');
  			secondMoved = true;
  			if (x==1) {
				grantAward('m2on1');
			}
			else if (x==2) {
				grantAward('m2on2');
			}
			else if (x==3) {
				grantAward('m2on3');
			}
  		}
  		if (lastRibbonMoved == "ribbon-3"){
  			console.log('third place!');
  			thirdMoved = true;
  			if (x==1) {
  				grantAward('m3on1');
  			}
  			else if (x==2) {
  				grantAward('m3on2');
  			}
  			else if (x==3) {
  				grantAward('m3on3');
  			}
  		}
  	}
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

	// using all of the possibilities of awards (i.e. m1on3)
	function grantAward(result) {
		if (firstMoved || secondMoved || thirdMoved){
			if (firstMoved){
				$('#ribbon-1').css('display','none');
			}
			if (secondMoved){
				$('#ribbon-2').css('display','none');
			}
			if (thirdMoved){
				$('#ribbon-3').css('display','none');
			}
		}

		switch (result)
		{
		case 'm1on1':	
			if (x == 1){$('#ribbon-1').css('display','block')}
			if (x == 2){}
			if (x == 3){}
			console.log(result);
		  break;
		
		case 'm1on2':
			console.log(result);
			if (x == 1){}
			if (x == 2){$('#ribbon-1').css('display','block')}
			if (x == 3){}
		  break;
		
		case 'm1on3':
			console.log(result);
			if (x == 1){}
			if (x == 2){}
			if (x == 3){$('#ribbon-1').css('display','block')}
		  break;
		
		case 'm2on1':
			console.log(result);
			if (x == 1){$('#ribbon-2').css('display','block')}
			if (x == 2){}
			if (x == 3){}
		  break;
		
		case 'm2on2':
			console.log(result);
			if (x == 1){}
			if (x == 2){$('#ribbon-2').css('display','block')}
			if (x == 3){}
		  break;
		
		case 'm2on3':
			console.log(result);
			if (x == 1){}
			if (x == 2){}
			if (x == 3){$('#ribbon-2').css('display','block')}
		  break;
		
		case 'm3on1':
			console.log(result);
			if (x == 1){$('#ribbon-3').css('display','block')}
			if (x == 2){}
			if (x == 3){}
		  break;
		
		case 'm3on2':
			console.log(result);
			if (x == 1){}
			if (x == 2){$('#ribbon-3').css('display','block')}
			if (x == 3){}
		  break;
		
		case 'm3on3':
			console.log(result);
			if (x == 1){}
			if (x == 2){}
			if (x == 3){$('#ribbon-3').css('display','block')}
		  break;
		}
	}

// }); // end of SIAF



