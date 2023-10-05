
$(document).on('click', '.col-1.d-flex.justify-content-end', function (e) {
    var $parentContainer = $(this).closest('.iq-message-body');
    var $hrElement = $parentContainer.find('hr'); // Get the <hr> element
    $parentContainer.find('.job_description').toggle(); // Toggle visibility of job_description
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

const fetch_jobs = () => {
    $.post(api_url + "/jobs_table", { email: email }, function (data, status) {
        job_table_data = data

        if (data.length > 0) { $("#append_jobs").empty() }

        for (var i = 0; i < data.length; i++) {

            let title = data[i][1]
            let loc = data[i][3]
            let exp = data[i][4]
            let edu = data[i][5]
            let job_description = data[i][6].replace(/\n/g, '<br>');

            let contact = data[i][17].replace(/\n/g, '<br>')

            var str = `<div class="col-md-12">
            <div class="iq-message-body iq-other-user mb-3">
               <div class="iq-chat-text">
                  <div class="align-items-center justify-content-start">
                     <div class="iq-chating-content" style="max-width: 100%;">
                        <div class="container-fluid" id="${data[i][0]}">
                           <div class="row">
                              <div class="col-11 px-0">
                                 <h4 class="mb-0 d-inline-block"><b>${title}</b>
                                 </h4>
                                 <div class="mt-2">
                                    <div class="d-sm-inline-flex me-3">
                                       <i class="material-symbols-outlined me-2">work</i>${exp}
                                    </div>
                                    <div class="d-sm-inline-flex me-3">
                                       <i class="material-symbols-outlined me-2">school</i>${edu}
                                    </div>
                                    <div class="d-sm-inline-flex me-3">
                                       <i class="material-symbols-outlined me-2">location_on</i>${loc}
                                    </div>
                                 </div>
                              </div>
                              <div
                                 class="col-1 d-flex justify-content-end align-items-center px-0">
                                 <i class="material-symbols-outlined">arrow_drop_down</i>
                              </div>
                           </div>
                        </div>
                        <hr class="job_page" style="display: none;">
                        <div class="row job_description"
                           style="font-size: 14px; display: none;">
                           <h4><b>Job Description:</b></h4>
                           <div class="job_description_${i}"></div>
                           <h4><b>Skills:</b></h4>
                           <div>
                              <ul class="skill_ul_${i}"></ul>
                           </div>
                           <h4><b>Contact:</b></h4>
                           <div class="contact_${i}">${contact}</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>`

            $("#append_jobs").append(str)

            $(`.job_description_${i}`).html(job_description)

            for (var j = 7; j < 17; j++) {
                if (data[i][j] == '' || data[i][j] == "." || data[i][j] == " ") {
                } else {
                    $(`.skill_ul_${i}`).append(`<li>${data[i][j]}</li>`)
                }
            }

            $(`.contact_${i}`).html(contact)
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

$(document).ready(function () {
   $('#jobs_html').addClass('active')
    fetch_jobs()
})