var BASE_URL = 'https://obscure-ridge-73322.herokuapp.com/';

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: BASE_URL,
    notes: '',
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}



function displaySearchData(Array) {
  var resultElement = '';
  console.log(data);
  if (data.Array.title) {
    console.log(array.title);
    Array.title.forEach(function(item) {
     resultElement += '<p>' + Array.title + '</p>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}
