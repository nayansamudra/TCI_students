
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

$(document).on('click', '.d-inline-flex.me-4.nism_1', function (e) {

    var $arrowIcon = $('#dropdown_arrow_2');
    if ($arrowIcon.text() === 'arrow_drop_down') {
        $arrowIcon.text('arrow_drop_up'); // Change text to arrow_drop_up
    } else {
        $arrowIcon.text('arrow_drop_down'); // Change text to arrow_drop_down
    }

    $('.d-inline-flex.me-4.nism_1').css('border', '0px')
    $('.d-inline-flex.me-4.nism_1').find('a').css('color', 'inherit')
    current_click = $(this).find('a').text()

    if ($(this).hasClass('btn_active')) {
        $(this).removeClass('btn_active')
        $('#nism_reader_div_1').hide()
    } else {
        $('.d-inline-flex.me-4.nism_1').removeClass('btn_active')
        $(this).addClass('btn_active')
        if ($('body').hasClass('theme-color-default dark')) {
            $(this).css('border', '1px solid #50b5ff')
            $(this).find('a').css('color', '#50b5ff')
        } else if ($('body').hasClass('theme-color-default light')) {
            $(this).css('border', '1px solid #0088ff')
            $(this).find('a').css('color', '#0088ff')
        }
        $('#blog_heading_1').html(`<b>${current_click}</b>`)
        $('#nism_reader_div_1').show()
    }

    ts = $(this).find('a').attr('id')
    console.log(ts)
    read_single_blog(ts)

    var parentContainer = $(this).closest('.iq-message-body');
    parentContainer.classList.add('centered');

    e.preventDefault()
});

$(document).on('click', '.d-inline-flex.me-4.nism_2', function (e) {

    var $arrowIcon = $('#dropdown_arrow_1');
    if ($arrowIcon.text() === 'arrow_drop_down') {
        $arrowIcon.text('arrow_drop_up'); // Change text to arrow_drop_up
    } else {
        $arrowIcon.text('arrow_drop_down'); // Change text to arrow_drop_down
    }

    $('.d-inline-flex.me-4.nism_2').css('border', '0px')
    $('.d-inline-flex.me-4.nism_2').find('a').css('color', 'inherit')
    current_click = $(this).find('a').text()

    if ($(this).hasClass('btn_active')) {
        $(this).removeClass('btn_active')
        $('#nism_reader_div_2').hide()
    } else {
        $('.d-inline-flex.me-4.nism_2').removeClass('btn_active')
        $(this).addClass('btn_active')
        if ($('body').hasClass('theme-color-default dark')) {
            $(this).css('border', '1px solid #50b5ff')
            $(this).find('a').css('color', '#50b5ff')
        } else if ($('body').hasClass('theme-color-default light')) {
            $(this).css('border', '1px solid #0088ff')
            $(this).find('a').css('color', '#0088ff')
        }
        $('#blog_heading_2').html(`<b>${current_click}</b>`)
        $('#nism_reader_div_2').show()
    }

    ts = $(this).find('a').attr('id')
    console.log(ts)
    read_single_blog(ts)

    var parentContainer = $(this).closest('.iq-message-body');
    parentContainer.classList.add('centered');

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
                var str = `<div class="d-inline-flex me-4 nism_1"><a class="msg_links" id="${Equity_Derivatives[i][0]}" href="#nism_description_1">${Equity_Derivatives[i][2]}</a></div>`
                if ((i % 5) == 0) {
                    str1 = `<div class="mt-1 d-md-flex Equity_Derivatives_${i}">${str}</div>`
                    temp_class = `Equity_Derivatives_${i}`
                    $('#Equity_Derivatives').append(str1)
                } else {
                    $(`.${temp_class}`).append(str)
                }
            }

            for (var i = 0; i < research_analyst_certification.length; i++) {
                var str = `<div class="d-inline-flex me-4 nism_2"><a class="msg_links" id="${research_analyst_certification[i][0]}" href="#nism_description_2">${research_analyst_certification[i][2]}</a></div>`
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


const read_single_blog = (ts) => {

    $.post(api_url + "/blogs/fetch_blog_nism", { email: email, ts: ts }, function (data, status) {

        if (data[0][1] == "1" || data[0][1] == 1) {

            quill_r1.setContents("")

            $("#blog_heading_1").html(`<b>${data[0][4]}</b>`)

            try {
                data[0][7] = JSON.parse(data[0][7])
            } catch (e) {
                console.log("caught null quill")
                quill_r1.setContents("")
            }
            quill_r1.setContents(data[0][7]);

        } else if (data[0][1] == "2" || data[0][1] == 2) {

            quill_r2.setContents("")

            $("#blog_heading_2").html(`<b>${data[0][4]}</b>`)

            try {
                data[0][7] = JSON.parse(data[0][7])
            } catch (e) {
                console.log("caught null quill")
                quill_r2.setContents("")
            }
            quill_r2.setContents(data[0][7]);
        }

    });
}

$(document).ready(function () {

    $('#nism_html').addClass('active')

    fetch_nism_blog_list()

    quill_r1 = new Quill('#quill_reader_1', {
        modules: {
            toolbar: false
        },
        // placeholder: 'Compose an epic...',
        bounds: "document.body",
        theme: 'bubble'  // or 'bubble'
    });
    quill_r1.enable(false)

    quill_r2 = new Quill('#quill_reader_2', {
        modules: {
            toolbar: false
        },
        // placeholder: 'Compose an epic...',
        bounds: "document.body",
        theme: 'bubble'  // or 'bubble'
    });
    quill_r2.enable(false)
});