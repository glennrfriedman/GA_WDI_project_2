$(document).ready(() => {

    // TV MAZE API URL 
    const API_URL = 'http://api.tvmaze.com/search/shows?q=';

    // console log up an running 
    console.log('jQuery connected');

    const deleteShow = (id) => {
        // ajax call to delete a color
        $.ajax({
            url: `/tvtime/${id}`,
            type: 'DELETE',
            // if the request is successful
            success: (data) => {
                // remove the color from the list
                window.location.reload();
                $(`#saved-shows-container[data-id=${id}]`).remove();
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    $('.delete-show').click((e) => {
        // get the show of the color being deleted
        const id = $(e.target).attr('data-id');
        console.log(id);
        // delete the show
        deleteShow(id);
    });


}); // ends document.ready