var SEARCHTERM ='';
var RUNCALL = true;

var getDataFromApi = function(searchTerm){
	var query = {
		method: ['GET', 'PUT', 'POST', 'DELETE'],
		fields: ['id', 'title', 'content', 'date'],
	};
	$.ajax({
		url: 'https://obscure-ridge-73322.herokuapp.com/',
		data: query,
		success: function(data, e){
			displayNotes(data);
		},
		dataType: 'json'
	});


function displayNotes(notes){
	var html = "";
	if(notes.notes.length === 0){
		RUNCALL = false;
		html += '<p>No search results for ' + SEARCHTERM + '</p>'
	} else {
		$.each(notes.notes, function(index, value){
			html += '<li>' + value.title + '</li></br>';
			html += '<li>' + value.content + '</li><br>';
			html += '<li>' + value.date + '</li><br>';
		});
	}
	$('.js-search-form').append(html);
	$('.js-query').val('');
	$('.js-search-results').show();
}

$(document.ready(function(){
	$('.js-search-results').hide();

	$('api-search').submit(function(e){
		e.preventDefault();
		if( $('.js-query').val.length === 0) {return false};
		$('.js-search-results').html('');
		SEARCHTERM = $('.js-query').val();
		$('.js-search-results').text(SEARCHTERM);
		getDataFromApi(SEARCHTERM);
		RUNCALL = true;
	})
}))
}