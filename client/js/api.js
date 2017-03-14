var searchString = $('.js-query').val();
var js_search_form = $('.js-search-form');
var postForm = $('#post-form');


var getDataFromApi = function(){
	$.ajax({
		url: '/notes',
		success: function(data, e){
			displayNotes(data);
		},
		dataType: 'json'
	});
}

var updateSearch = function(){
	var query = $('.js-query').val();
		$.ajax({
		url: '/search?search=' + query,
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
	}

	$.ajax('/notes', {
		type: 'POST',
		data: JSON.stringify(post),
		dataType: 'json',
		contentType: 'application/json'
	})
	.done(getDataFromApi);
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
		html += '<p>No search results for ' + searchString + '</p>';
		} else {
		$.each(notes, function(index, value){
			var date = new Date(value.date);
					html += 
					'<div class="inline-form-group">' + 
						'<li id="title">' + value.title + '</li>' +
						'<ul id="content" class="hider">' + value.content + '</ul>' +
						'<ul id="date" class="hider">' + date.toDateString() + '</ul>' + 
						'<ul id="id" style="display:none">' + value.id + '</ul>' +
							'<div class="delete-btn">' +
								'<button class="btn div-button">' +
									'<img src="plus.png" id="delete">' +
								'</button>' +
							'</div><br>' +
						'</div>';
		});
	}
	$('.js-search-form').html(html);
	$('.js-query').val();
}



$(document).ready(function(){
	getDataFromApi();	

	$('div').on('click', '.delete-btn > .div-button', function(){
		var id = $(this).parent().siblings('#id').html();
		if (!confirm('Are you sure you want to delete?')){
			return false;
		 } else {
			deleteNote(id);
			clearForm();	
		}
	});

	$('div').on('click', '.inline-form-group', function(){			
		$(this).find('.hider').toggle('fast');
	});

	$('.submit-btn').on('click', function(event){
		event.preventDefault();
		var title = $(this).parent().children('.title-box').val();
		var content = $(this).parent().children('.content-box').val();
		var date = $('#date').context.lastModified;
		var id = $(this).parent().attr('#id');

		if(title == ''){
			$('.title-warning').text(' * required field');
		} 
		else {
			createNote(title, content, date);
			}		
		clearForm();
	});

	$('.clear-btn').on('click', function(event){
		event.preventDefault();
		clearForm();
	});

	$('#plus').on('click', function(event){
		$('#new-note').toggle(function(){
			$(this).parent().animate({right:'0px'}, {queue: false, duration: 500});
		}, function(){
			$(this).parent().animate({right:'-280px'}, {queue: false, duration:500});
		});
	});

	$('#search').on('click', function(){
		var query = $('.js-query').val();
		$.ajax({
			url: '/search?search=' + query,
			success: function(data, e){
			displayNotes(data);
			},
			dataType: 'json'
		})
	})
	
	$('.js-query').keydown(function(e){
		var query = $('.js-query').val();
			if(query !== ''){
		//if(e.which == 13){
			$('#search').click();
		}
	}); 

	$('.js-query').keydown(function(e){
		var query = $('.js-query').val();
		console.log(query);
		if(e.which === 8 && query == ''){
			getDataFromApi();
		}
	});
	





});

/*  $('div').on('click', '.delete-btn > .edit-button', function(){
		var title = $('#title');
		var content = $('#content').val();
		var date = $('#date').val();
		var id = $(this).parent().attr('#id');
	//	var id = $('#id');
		console.log(id);
		populatePostForm(title, content, date, id);
	}); */










