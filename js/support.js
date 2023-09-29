const set_catg = (category) => {
    console.log(category)
}

readonlyInput = document.getElementById("readonlyInput");

// Set the input field as readonly
readonlyInput.setAttribute("readonly", "true");

// Prevent changes via developer console
readonlyInput.addEventListener("input", function (event) {
    event.preventDefault();
    return false;
});

$(document).on('click', '#Tredcode_ticket', function () {
    $('#create_ticket_form').attr('style', 'display:block')
    $('#post_content').attr('style', 'display:none')
    readonlyInput.setAttribute("value", "Tredcode");
});

$(document).on('click', '#Student_portal_ticket', function () {
    $('#create_ticket_form').attr('style', 'display:block')
    $('#post_content').attr('style', 'display:none')
    readonlyInput.setAttribute("value", "Study Related");
});

$(document).on('click', '#Miscellaneous_ticket', function () {
    $('#create_ticket_form').attr('style', 'display:block')
    $('#post_content').attr('style', 'display:none')
    readonlyInput.setAttribute("value", "Other");
});

$(document).on('click', '#close_btn_1', function (e) {
    $('#create_ticket_form').attr('style', 'display:none')
    $('#post_content').attr('style', 'display:block')
    e.preventDefault()
});

$(document).on('click', '.col-1.d-flex.justify-content-end', function (e) {
    var $parentContainer = $(this).closest('.iq-message-body');
    var $hrElement = $parentContainer.find('hr'); // Get the <hr> element
    $parentContainer.find('.user-post').toggle(); // Toggle visibility of user-post
    $parentContainer.find('.query_response').toggle(); // Toggle visibility of query_response
    $hrElement.toggle(); // Toggle visibility of the <hr> element

    var $arrowIcon = $(this).find('.material-symbols-outlined');
    if ($arrowIcon.text() === 'arrow_drop_down') {
        $arrowIcon.text('arrow_drop_up'); // Change text to arrow_drop_up
    } else {
        $arrowIcon.text('arrow_drop_down'); // Change text to arrow_drop_down
    }
});

$(document).on('mouseenter', '.col-1.d-flex.justify-content-end', function (e) {
    $(this).css('cursor', 'pointer');
});