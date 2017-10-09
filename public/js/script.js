$(document).ready(() => {

    // TV MAZE API URL 
    const API_URL = 'http://api.tvmaze.com/search/shows?q=';

    // console log up an running 
    console.log('jQuery connected');

    // delete show ajax call
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

    // run delete show ajax on click
    $('.delete-show').click((e) => {
        // get the show of the color being deleted
        const id = $(e.target).attr('data-id');
        console.log(id);
        // delete the show
        deleteShow(id);
    });

    const editShow = (id) => {
        // ajax call to delete a color
        const data = { comments: $('#comments').val() };

        console.log('--------------------------');
        console.log('data from editShow is ' + data);

        $.ajax({
            url: `/tvtime/${id}`,
            type: 'PUT',
            data: data,
            // if the request is successful
            success: (data) => {
                window.location.replace(`/tvtime/profile`)
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

     $('#edit-show').click((e) => {
        // get the show of the color being deleted
        const id = $(e.target).attr('data-id');

        console.log('--------------------------');
        console.log('id from edit show is, ' + id);
        // delete the show
        editShow(id);
    });

}); 

