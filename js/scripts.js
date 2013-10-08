$(function(){

	// Sorting Page Functions
	$(".all-thumbs").sortable().sortable('disable');
	$('.sortToggle').on('click', allowSorting );
	$('.artist-link').on('click', getArtist );
	var onSort = false;

	function allowSorting() {
		if (onSort) {
			$(".all-thumbs").sortable('disable');
			$( ".all-thumbs li" ).removeClass('shaking');
			 onSort = false;
		}
		else {
		$(".all-thumbs").sortable('enable');
		$( ".all-thumbs" ).disableSelection();
		$(".all-thumbs li").addClass('shaking');
		onSort = true;
	 	}
	};

	function getArtist(e) {
		console.log(e.currentTarget.children[1].innerHTML);
		var currentArtist = (e.currentTarget.children[1].innerHTML)
		$('.current-artist').html(currentArtist);
	}

}); // end of SIAF



