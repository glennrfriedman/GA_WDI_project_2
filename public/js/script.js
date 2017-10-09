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


}); // ends document.ready

            // const editShow = (id) => {
            //     // grab values from form
            //     const comment = $('.show-comment-input').val(),

            //         // create new object to send form data in
            //         const editedShowData = { comment: comment };
            //     // send ajax request to edit show
            //     $.ajax({
            //         method: 'PUT',
            //         url: `/tvtime/${id}`,
            //         data: editedShowData,
            //         success: response => {
            //             console.log(response);
            //             window.location.replace('/tvtime/profile');
            //         },
            //         error: msg => {
            //             console.log(msg);
            //         }
            //     }); // ends ajax method
            // }; // ends submit function for edited show

            // $('.edit-show-form').on('submit', e => {
            //         e.preventDefault(); // stops default behavior of page refresh
            //         const id = $(e.target).attr('data-id');
            //         const comment = $('.show-comment-input').val(),

            //             // create new object to send form data in
            //             const editedShowData = { comment: comment };
            //         // send ajax request to edit show
            //         $.ajax({
            //             method: 'PUT',
            //             url: `/tvtime/${id}`,
            //             data: editedShowData,
            //             success: response => {
            //                 console.log(response);
            //                 window.location.replace('/tvtime/profile');
            //             },
            //             error: msg => {
            //                 console.log(msg);
            //             }
            //         }); // ends ajax method
            //     }
