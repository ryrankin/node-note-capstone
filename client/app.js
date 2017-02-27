var SEARCHTERM ='';
var RUNCALL = true;

var getDataFromApi = function(searchTerm){
	var query = {
		method: 'GET', 'PUT', 'POST', 'DELETE',
		fields: ['id', 'title', 'content', 'date'],
	};
	$.ajax({
		url: 'https://obscure-ridge-73322.herokuapp.com/notes',
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
	$('#searchResults').append(html);
	$('#query').val('');
	$('.resultsText').show();
}

$(document.ready(function(){
	$('.resultsText').hide();

	$('api-search').submit(function(e){
		e.preventDefault();
		if( $('#api-query').val.length === 0) {return false};
		$('#searchResults').html('');
		SEARCHTERM = $('#api-query').val();
		$('.search').text(SEARCHTERM);
		getDataFromApi(SEARCHTERM);
		RUNCALL = true;
	})
}))
}