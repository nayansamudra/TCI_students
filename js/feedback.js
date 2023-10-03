const gen_ticket = () => {
    var name = $("#ua_1").val()
    var phone = $("#ua_2").val()
    var description = $("#feedback_text").val()
    var selectedStarsCount = 0;
    $('#rating img').each(function() {
        if ($(this).attr('src') === 'images/selectedStar.png') {
            selectedStarsCount++;
        }
    });
    $('input[name=rating]').val(selectedStarsCount);
    var rating = $("input[name=rating]").val();

    // input validation
    if (description == "" || name == "" || phone == "") { toast_function("warning", "Please Enter all fields!"); return }

    var filename = $('#Image_input').val()
    if (filename == "") { console.log("Upload w/o Image") }
    filename = (filename.split("\\"))[2]

    var formData = new FormData();
    formData.append('file', $('#Image_input')[0].files[0]);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('description', description);
    formData.append('email', email);
    formData.append('rating', rating);
    formData.append('filename', filename);

    console.log(name, phone, description, rating)

    $.ajax({
        type: "POST",
        url: api_url + '/feedbackApi/gen_feedback',
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            if (data == "success") {
                toast_function("success", "Feedback is passed to the team. Thank you for your time")
            }
            else if (data == "Limit exceeded") {
                toast_function("warning", "Feedback Limit Exceeded, please try again tommorow")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            toast_function("warning", "Connection Timeout Please Retry After some time!")
        }
    })
}

$(document).on('click', '#submit_btn', function (e) {
    gen_ticket()
    e.preventDefault()
})

$(document).on("mouseenter", ".star", function () {
    var currentPosition = $(this).data('position');
    var totalStars = $('#rating img').length;

    // Check if hovering backward
    if (currentPosition < totalStars) {
        // Replace selectedStar with unselectedStar for all stars greater than currentPosition
        for (var i = currentPosition; i < totalStars; i++) {
            if ($('body').hasClass('dark')) {
                $('#rating img[data-position="' + (i + 1) + '"]').attr('src', 'images/unselectedStar_white.png');
            } else if ($('body').hasClass('light')) {
                $('#rating img[data-position="' + (i + 1) + '"]').attr('src', 'images/unselectedStar_black.png');
            }
        }
    }

    // Replace unselectedStar with selectedStar for all stars less than or equal to currentPosition
    for (var i = 0; i < currentPosition; i++) {
        $('#rating img[data-position="' + (i + 1) + '"]').attr('src', 'images/selectedStar.png');
    }
});

$(document).ready(function () {
    if ($('body').hasClass('dark')) {
        $('#rating img[src="images/unselectedStar_black.png"]').attr('src', 'images/unselectedStar_white.png');
    } else if ($('body').hasClass('light')) {
        $('#rating img[src="images/unselectedStar_white.png"]').attr('src', 'images/unselectedStar_black.png');
    }
})