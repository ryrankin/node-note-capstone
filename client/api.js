var SEARCHTERM ='';
var RUNCALL = true;

var getDataFromApi = function(){
	$.ajax({
		url: '/notes',
		success: function(data, e){
			displayNotes(data);
		},
		dataType: 'json'
	});
}


function displayNotes(notes){
	var html = "";
	if(notes.length === 0){
		RUNCALL = false;
		html += '<p>No search results for ' + SEARCHTERM + '</p>'
	} else {
		$.each(notes, function(index, value){
			html += '<div>' + 
						'<li>Title: ' + value.title + '</li>' +
						'<ul>Content: ' + value.content + '</ul>' +
						'<ul>Date: ' + value.date + '</ul>' + 
						'<ul>ID: ' + value.id + '</ul>' + 
					'</div>';
		});
	}
	$('.js-search-form').append(html);
	$('.js-query').val('');
	$('.js-search-results').show();
}

$(document).ready(function(){
	$('.js-search-results').hide();
	getDataFromApi();
});
/*
	$('api-search').submit(function(e){
		e.preventDefault();
		if( $('.js-query').val.length === 0) {return false};
		$('.js-search-results').html('');
		SEARCHTERM = $('.js-query').val();
		$('.js-search-results').text(SEARCHTERM);
		getDataFromApi(SEARCHTERM);
		RUNCALL = true;
	})*/

