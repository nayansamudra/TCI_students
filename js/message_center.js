

push_div = (name, link) => {
    if (name == "" || link == "") { return }
    let str = '<li class="d-flex mb-3 align-items-center"><div class="stories-data ms-3"><h5><a href="' + link + '">' + name + '</a></h5></div></li>'
    $("#link_append").append(str)
}

get_link = () => {
    $.post(api_url + "/get_links", { email: email }, function (data, status) {
        console.log(); ("Data " + data)

        try {
            $("#link_append li").remove()

            if (data[0][1] != null && data[0][7] != null) { push_div(data[0][1], data[0][7]) }
            if (data[0][2] != null && data[0][8] != null) { push_div(data[0][2], data[0][8]) }
            if (data[0][3] != null && data[0][9] != null) { push_div(data[0][3], data[0][9]) }
            if (data[0][4] != null && data[0][10] != null) { push_div(data[0][4], data[0][10]) }
            if (data[0][5] != null && data[0][11] != null) { push_div(data[0][5], data[0][11]) }
            if (data[0][6] != null && data[0][12] != null) { push_div(data[0][6], data[0][12]) }
        }
        catch (e) { console.log("nulldata"); return }

        try {
            if (data[0][14] != null && data[0][16] != null) {
                if (data[0][14] != "" && data[0][16] != "") {
                    console.log("14 and 16 present")

                    global_frame_1_desc = data[0][14]
                    $("#frame1_desc").html("<b>English</b><br>" + global_frame_1_desc)
                    global_frame_1 = data[0][16]
                    $("#frame1").append(global_frame_1)
                }
                else { }
            }
            if (data[0][15] != null && data[0][17] != null) {
                if (data[0][15] != "" && data[0][17] != "") {
                    console.log("15 and 17 present")

                    global_frame_2_desc = data[0][15]
                    $("#frame2_desc").html("<b>Hindi</b><br>" + global_frame_2_desc)
                    global_frame_2 = data[0][17]
                    $("#frame2").append(global_frame_2)
                }
                else { }
            }

        }
        catch (e) { console.log("nulldata"); return }

    });
}

get_msg = () => {
    $.post(api_url + "/get_msg", { email: email }, function (data, status) {
        // console.log(data)

        try {
            if (data == "lw_locked") {
                console.log("Will show msg lock screen")
                $("#locked_msg").show()
            }
        }
        catch (e) { console.log("nullmsg"); return }

        try {
            let ts = data[0][0]
        }
        catch (e) { console.log("nullmsg"); return }

        // data preprocessing
        for (var i = 0; i < data.length; i++) {
            let ts = data[i][0]
            data[i][0] = moment.unix(ts).format("DD-MMM-YYYY HH:mm")
            data[i][2] = linkify(data[i][2])
            data[i][2] = data[i][2].replace(/\n/g, '<br>');
        }

        for (var i = 0; i < data.length; i++) {
            let time = data[i][0]

            var str = `<div class="iq-message-body iq-other-user mb-3">
            <div class="chat-profile">
               <img src="images/tci_logo.webp" width="25px" alt="chat-user" class="rounded"
              loading="lazy">
            </div>
            <div class="iq-chat-text">
               <div class="d-flex align-items-center justify-content-start">
                  <div class="iq-chating-content">
                     <span class="d-flex justify-content-end" style="font-size: 11px;">${data[i][0]}</span>
                     <p class="data-desscription-${i}"></p>
                  </div>
               </div>
            </div>
            </div>`

            $('#msg_append').append(str)
            $(`.data-desscription-${i}`).html(data[i][2])

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
    get_link()
    get_msg()
});