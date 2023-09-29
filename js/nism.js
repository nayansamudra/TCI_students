
$(document).on('click', '.col-1.d-flex.justify-content-end', function (e) {
    var $parentContainer = $(this).closest('.iq-message-body');
    var $hrElement = $parentContainer.find('hr'); // Get the <hr> element
    $parentContainer.find('.nism_description').toggle(); // Toggle visibility of job_description
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

$(document).on('click', '.d-inline-flex.me-4', function (e) {
    $('.d-inline-flex.me-4').css('border', '0px')
    $('.d-inline-flex.me-4').find('a').css('color', 'inherit')
    current_click = $(this).find('a').text()
    if($(this).hasClass('btn_active')){
        $(this).removeClass('btn_active')
        $('#nism_reader_div').hide()
    } else {
        $('.d-inline-flex.me-4').removeClass('btn_active')
        $(this).addClass('btn_active')
        if($('body').hasClass('theme-color-default dark')){
            $(this).css('border', '1px solid #50b5ff')
            $(this).find('a').css('color', '#50b5ff')
        } else if($('body').hasClass('theme-color-default light')){
            $(this).css('border', '1px solid #0088ff')
            $(this).find('a').css('color', '#0088ff')
        } 
        $('#blog_heading').html(`<b>${current_click}</b>`)
        $('#nism_reader_div').show()
    }
    e.preventDefault()
});