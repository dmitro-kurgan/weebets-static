$(window).bind('resize', function () {
	$('#usr-pan').appendTo('#LeftSideUsrPan');
	$('#logo').appendTo('#LeftSideLogo');
	if (window.matchMedia('(max-width: 1170px)').matches) {
		$('#usr-pan, #logo').appendTo('.header_inner');
	}
}).trigger('resize');

$(window).bind('resize', function () {	
    if (window.matchMedia('(max-width: 1024px)').matches) {
        $('#spins').appendTo('#col-top-left');
		$('#spins-det').appendTo('#col-top-right');
		$('#user-det').appendTo('#col-mid-left');
		$('#turnover').appendTo('#col-bottom-left');
		$('#turnover-det').appendTo('#col-bottom-right');
		$('#map').appendTo('#col-add');
    }
    else {
    	$('#spins-det').appendTo('#col-top-left');
		$('#user-det').appendTo('#col-top-right');
		$('#spins').appendTo('#col-mid-left');
		$('#users').appendTo('#col-mid-mid');
		$('#turnover').appendTo('#col-mid-right');
		$('#turnover-det').appendTo('#col-bottom-right');
		$('#map').appendTo('#col-bottom-left');
    }
}).trigger('resize');


$(window).bind('resize', function () {
	if (window.matchMedia('(max-width: 768px)').matches) {
        $('#user-det').appendTo('#col-mid-mid');
		$('#users').appendTo('#col-mid-left');
		$('#ftable').appendTo('#spins-det_right');
		$('#chart1').appendTo('#spins-det_left');
    }
    else {
		$('#users').appendTo('#col-mid-mid');
		$('#ftable').appendTo('#spins-det_left');
		$('#chart1').appendTo('#spins-det_right');
    }
}).trigger('resize');


$(document).ready(function(){
	$('#HamMenu').click(function(){
		$('.left-sidebar').toggleClass('show')
	})
});