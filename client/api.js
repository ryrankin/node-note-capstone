var SEARCHTERM ='';
var RUNCALL = true;
var state = {
	notes: []
};

var getDataFromApi = function(){
	$.ajax({
		url: '/notes',
		success: function(data, e){
			displayNotes(data);
		},
		dataType: 'json'
	});
}

var createNote = function(title, content, date){
	var post = {
		title: title,
		content: content,
		date: date
	};

	$.ajax('/notes', {
		type: 'POST',
		data: JSON.stringify(post),
		dataType: 'json',
		contentType: 'application/json'
	})
	.done(displayNotes);
}

var updateNote = function(title, content, date, id){
	var post = {
		title: title,
		content: content,
		date: date,
		id: id
	}
	$.ajax('notes/:id', {
		type: 'PUT',
		data: JSON.stringify(post),
		dataType: 'json',
		contentType: 'application/json'
	})
	.done(displayNotes);
}

var deleteNote = function(id){
	$.ajax('/:id',{
		type: 'DELETE',
		dataType: 'json',
		contentType: 'application/json'
	})
	.done(displayNotes);
}	



var displayNotes = function(notes){
	var html = "";
	if(notes.length === 0){
		RUNCALL = false;
		html += '<p>No search results for ' + SEARCHTERM + '</p>'
	} else {
		$.each(notes, function(index, value){
			html += '<div class="inline-form-group">' + 
						'<li>Title: ' + value.title + '</li>' +
						'<ul><b>Content:</b> ' + value.content + '</ul>' +
						'<ul><b>Date:</b> ' + value.date + '</ul>' + 
						'<ul><b>ID:</b> ' + value.id + '</ul>' + 
						'<section>' +
							'<div class="edit"><button class="div-button" id="edit">Edit</button></div>' +
							'<div class="delete"><button class="div-button" id="delete">Delete</button></div>' +
						'</section>' +
					'</div>';
		});
	}
	$('.js-search-form').append(html);
	$('.js-query').val('');
}

$(document).ready(function(){
	getDataFromApi();


	$('.delete').on('click', '.delete', function(){
		var div = $(this).parent();
		var span = div.siblings();
		var value = span.text();
		deleteItem(note, value);
		getDataFromApi();	
	});

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

