
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
    if ($(this).hasClass('btn_active')) {
        $(this).removeClass('btn_active')
        $('#nism_reader_div').hide()
    } else {
        $('.d-inline-flex.me-4').removeClass('btn_active')
        $(this).addClass('btn_active')
        if ($('body').hasClass('theme-color-default dark')) {
            $(this).css('border', '1px solid #50b5ff')
            $(this).find('a').css('color', '#50b5ff')
        } else if ($('body').hasClass('theme-color-default light')) {
            $(this).css('border', '1px solid #0088ff')
            $(this).find('a').css('color', '#0088ff')
        }
        $('#blog_heading').html(`<b>${current_click}</b>`)
        $('#nism_reader_div').show()
    }
    e.preventDefault()
});



const fetch_nism_blog_list = () => {

    $.post(api_url + "/blogs/fetch_nism_blog_list", { email: email }, function (data, status) {

        if (data) {

            $('#Equity_Derivatives').empty()
            $('#research_analyst_certification').empty()

            Equity_Derivatives = []
            research_analyst_certification = []

            for (var i = 0; i < data.length; i++) {

                if (data[i][1] == "1") {
                    Equity_Derivatives.push(data[i])
                }
                else if (data[i][1] == "2") {
                    research_analyst_certification.push(data[i])
                }
            }

            for (var i = 0; i < Equity_Derivatives.length; i++) {
                var str = `<div class="d-inline-flex me-4"><a class="msg_links" id="${Equity_Derivatives[i][0]}" href="#">${Equity_Derivatives[i][2]}</a></div>`
                if ((i % 5) == 0) {
                    str1 = `<div class="mt-1 d-md-flex Equity_Derivatives_${i}">${str}</div>`
                    temp_class = `Equity_Derivatives_${i}`
                    $('#Equity_Derivatives').append(str1)
                } else {
                    $(`.${temp_class}`).append(str)
                }
            }

            for (var i = 0; i < research_analyst_certification.length; i++) {
                var str = `<div class="d-inline-flex me-4"><a class="msg_links" id="${research_analyst_certification[i][0]}" href="#">${research_analyst_certification[i][2]}</a></div>`
                if ((i % 4) == 0) {
                    str2 = `<div class="mt-1 d-md-flex research_analyst_certification_${i}">${str}</div>`
                    temp_class = `research_analyst_certification_${i}`
                    $('#research_analyst_certification').append(str2)
                } else {
                    $(`.${temp_class}`).append(str)
                }
            }
        }

    });
}

function linkify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return '<a class="linkified_a" href="' + url + '" target="_blank">' + url + '</a>';
    })
}

$(document).ready(function () {
    fetch_nism_blog_list()
});