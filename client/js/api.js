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
			var date = new Date(value.date);
					html += 
					'<div class="inline-form-group">' + 
						'<li id="title">' + value.title + '</li>' +
						'<ul class="hider">' + value.content + '</ul>' +
						'<ul class="hider" id="date">' + date.toDateString() + '</ul>' + 
						'<ul id="id" style="display:none">' + value.id + '</ul>' +
							'<div class="delete-btn">' +
							'<button class="div-button">Delete</button>' +
							'</div><br>' +
					'</div>';
		});
	}
	$('.js-search-form').html(html);
	$('.js-query').val('');
}



$(document).ready(function(){
	getDataFromApi();	

	$('div').on('click', '.delete-btn > .div-button', function(){
		var id = $(this).parent().siblings('#id').html();
		if (!confirm('Are you sure you want to delete?')){
			return false;
		 } else {
			deleteNote(id);	
		}
	});


	$('div').on('click', '.inline-form-group', function(){			
		$(this).find('.hider').toggle('fast');
	});


/*	$('.delete').on("click", function (e) {
    e.preventDefault();

    var choice = confirm($(this).attr('data-confirm'));

    if (choice) {
        window.location.href = $(this).attr('href');
    }
}); */

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
			if(!(title && content == '')){
				createNote(title, content, date);
			} else {
				updateNote(id, title, content, date);
			}
		}
	})

});

