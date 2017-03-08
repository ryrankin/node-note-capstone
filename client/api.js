var SEARCHTERM ='';
var RUNCALL = true;
var js_search_form = $('.js-search-form');
var postForm = $('#post-form')



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
	$.ajax('/notes/:id', {
		type: 'PUT',
		data: JSON.stringify(post),
		dataType: 'json',
		contentType: 'application/json'
	})
	.done(displayNotes);
}



var deleteNote = function(id){
	$.ajax('/notes/' + id, {
		type: 'DELETE',
		dataType: 'json',
		contentType: 'application/json'
	})
	.done(getDataFromApi);
}	

var populatePostForm = function(post){
	postForm.children('.title-box').val(post.title);
	postForm.children('.content-box').val(post.content);
	postForm.children('.date-box').val(post.date);
	postForm.attr("name", post._id);
}

var clearForm = function(){
	postForm.children('.title-box').val('');
	postForm.children('.content-box').val('');
	postForm.children('.date-box').val('');
	postForm.attr('id', '');
	$('.title-warning').text('');
}


var displayNotes = function(notes){
	var html = "";
	if(notes.length === 0){
		RUNCALL = false;
		html += '<p>No search results for ' + SEARCHTERM + '</p>'
	} else {
		$.each(notes, function(index, value){
			html += '<div class="inline-form-group">' + 
						'<li>' + value.title + '</li>' +
						'<ul>' + value.content + '</ul>' +
						'<ul>' + value.date + '</ul>' + 
						'<ul id="id" style="display:none">' + value.id + '</ul>' +
						'<section>' +
							'<div class="delete-btn">' +
							'<button class="div-button">Delete</button>' +
							'</div>' +
						'</section>' +
					'</div>';
		});
	}
	$('.js-search-form').html(html);
	$('.js-query').val('');
}



$(document).ready(function(){
	getDataFromApi();	

	$('.add-btn').on('click', function(event){
		event.preventDefault();
		createNote();
		displayNotes();
	});

	$('div').on('click', '.delete-btn > .div-button', function(){
		var id = $(this).parent().parent().siblings('#id').html();
		deleteNote(id);		
	});

	$('.clear-btn').on('click', function(event){
		event.preventDefault();
		clearForm();
	})

	$('.submit-btn').on('click', function(event){
		event.preventDefault();
		var title = $(this).parent().children('.title-box').val();
		var content = $(this).parent().children('.content-box').val();
		var date = $(this).parent().children('.date-box');

		var id = $(this).parent().attr('id');

		if(title == ''){
			$('.title-warning').text(' * required field');
		} else {
			if(id == ''){
				createNote(title, content, date);
			} else {
				updateNote(id, title, content, date);
			}
		}
	});


/*	$('.js_search_form').on('click', '.delete-btn', function(){
		var id = $(this).parent().attr('id');
		deleteItem(note, value);
	});*/

});

