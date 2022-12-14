$('#reviewList').on('click', (e) => {

    $.ajax({
        type: 'post',
        url: '/admin/reviewRequest',
        data: $('#reviewListForm').serialize(),
        success: (data) => {
            console.log(data)
            new Noty({
                type: 'success',
                layout: 'topRight',
                text: 'Review Requested Successfully',
                timeout: 1500
            }).show();
        }
    })
})

$('.reviews-container').on('click', 'a.review', (e) => {
    e.preventDefault()
    const clicked = $(e.target)
    console.log(clicked.attr('href'))
    $.ajax({
        type: 'post',
        url: clicked.attr('href'),
        data: clicked.parents('form').serialize(),
        success: (data) => {
            location.reload()
            console.log('hi')
        }
    })
})