$(document).ready(() => {

	// WEATHER API KEY
	const API_URL = 'http://api.tvmaze.com/search/shows?q=';

	console.log('jQuery connected');

  $('#submit').on('click', function(event){

  	var showSearch = $('#show_search').val()

  	// makeCall(zipcode)

  	console.log(showSearch);

  });

}); // ends document.ready