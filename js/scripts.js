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

	$('.audio-controls').on('click', playPause );

	getArtistThumbs();
	var onSort = false;
	var toggled = false;
	var playing = false;

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
			console.log(band);
			$($('.artist-name')[i]).prev('figure').addClass(band);
		}
	}

	function slideList() {
		$('#entry-nav ul').toggle();
	}

	function playPause(e) {
		Timer = new radialTimer();
		Timer.init("timer", 15);
		playSong();
		$('.playpause').addClass('playing');
		

		if (playing) {
			pauseSong();
			//Timer.stop(); doesnt exist
			$('.playpause').removeClass('playing');
			playing = false;
		}

		playing = true;
	}

	var Song1=document.getElementById("song1"); 
	function playSong()
	  { 
	  	Song1.play(); 
	  } 
	function pauseSong()
	  { 
	  	Song1.pause(); 
	  }

	var x=1;
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
			$('.audio-1').css('margin-left','0px');
			$('.audio-2').css('margin-left','300px');
			$('.audio-3').css('margin-left','600px');

		  break;
		case 2:
			$('.audio-1').css('margin-left','-300px');
			$('.audio-2').css('margin-left','0px');
			$('.audio-3').css('margin-left','300px');
		  break;
		case 3:
			$('.audio-1').css('margin-left','-600px');
			$('.audio-2').css('margin-left','-300px');
			$('.audio-3').css('margin-left','0px');
		  break;
		}
	}
	//to make the sections move, add or subtract a horizontal 300px

}); // end of SIAF



