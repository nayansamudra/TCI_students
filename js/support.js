
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

$(document).on('click', '#submit_btn', function (e) {
    gen_ticket()
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

const fetch_tickets = () => {

    $.post(api_url + "/ticket/get_client_tickets", { email: email, client_email: email }, function (data, status) {

        if (data.length > 0) {
            $("#append_tickets").empty()
        }

        for (var i = 0; i < data.length; i++) {

            var format_date = moment.unix(data[i][0]).format("DD-MMM HH:mm A")
            if (data[i][3] == "pending" || data[i][6] == "") { var display_answer = "d-none" } else { var display_answer = "" }
            if (data[i][5] == "") { var display_image = "d-none" } else { var display_image = "" }
            var ts = data[i][0]
            if (data[i][3] == "pending") { var status = '<span style="color:orange">Pending</span>' }
            else { var status = '<span style="color:green">Resolved</span>' }

            var str = `<div class="col-md-12">
            <div class="iq-message-body iq-other-user mb-3">
               <div class="iq-chat-text">
                  <div class="align-items-center justify-content-start">
                     <div class="iq-chating-content" style="max-width: 100%;">
                        <div class="container-fluid">
                           <div class="row">
                              <div class="col-11 px-0">
                                 <div class="d-sm-inline-flex me-3 ticket_spacing">Ticket ID: ${(data[i][0]).replace(".", "-")}</div>
                                 <div class="d-sm-inline-flex me-3 ticket_spacing">${format_date}</div>
                                 <div class="d-sm-inline-flex me-3 ticket_spacing"><span class="font-weight-bold">Status:&nbsp;${status}</span></div>
                              </div>
                              <div class="col-1 d-flex justify-content-end align-items-center px-0">
                                 <i class="material-symbols-outlined">arrow_drop_down</i>
                              </div>
                           </div>
                        </div>
                        <hr class="support_page" style="display: none;">
                        <div class="my-2 user-post" style="display: none;">
                           <a href="javascript:void(0);" class="${display_image}">
                              <img src="https://students.tradingcafeindia.com${data[i][5]}" alt="post-image" class="img-fluid rounded w-100" loading="lazy" style="max-height: 300px; object-fit: contain;"/>
                           </a>
                        </div>
                        <div class="row query_response" style="font-size: 14px; display: none;">
                           <div class="col-12">
                              <span class="ms-1 category_value">#${data[i][2]}</span>
                           </div>
                           <div class="d-inline-flex-end">
                              <span class="ms-1 px-2 rounded float-end question_value">
                                 <small class="float-end">Query</small>
                                 <h6>${linkify(data[i][4])}</h6>
                              </span>
                           </div>
                           <div class="mt-1 d-inline-flex ${display_answer}">
                              <span class="ms-1 px-2 rounded answer_value">
                                 <small>Response</small>
                                 <h6>${linkify(data[i][6])}</h6>
                              </span>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div></div>`

            $("#append_tickets").append(str)
        }
    })
}

function linkify(text) {
    if (text == "" || text == undefined) { return "" }
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return '<a class="linkified_a" href="' + url + '" target="_blank">' + url + '</a>';
    })
}

const gen_ticket = () => {
    var tag = $("#readonlyInput").val()
    var description = $("#feedback_text").val()

    // input validation
    if (description == "" || tag == "none") { toast_function("warning","Please Enter all fields!"); return }

    var filename = $('#Image_input').val()
    if (filename == "") { console.log("Upload w/o Image") }
    filename = (filename.split("\\"))[2]

    var formData = new FormData();
    formData.append('file', $('#Image_input')[0].files[0]);
    formData.append('category', tag);
    formData.append('description', description);
    formData.append('email', email);
    formData.append('filename', filename);
    formData.append('course', global_user_type);

    $.ajax({
        type: "POST",
        url: api_url + '/ticket/gen_ticket',
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            if (data == "success") {
                toast_function("success","Ticket Submitted Successfully!")
                $('#create_ticket_form').attr('style', 'display:none')
                $('#post_content').attr('style', 'display:block')
                fetch_tickets()
            }
            else if (data == "Limit exceeded") {
                toast_function("warning","Ticket Limit Exceeded!")   
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            toast_function("danger","Timeout Please Retry After some time!")
            redirect('support')
        }
    })



}


$(document).ready(function () {
    fetch_tickets()
});

