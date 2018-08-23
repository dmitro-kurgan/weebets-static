$('.switchtab a').click(function(e) {
	e.preventDefault();
	$(".switchtab a").removeClass('active');
	$(this).addClass('active');
	var table = $(this).data('table');
	$('#turntab').find('th.day, td.day, th.week, td.week, th.month, td.month').hide();
	$('#turntab').find('th.'+table+', td.'+table).show();
});