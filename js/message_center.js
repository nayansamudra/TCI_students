redirect = (link, redirect = false) => {
    if (redirect) { window.open(link, '_blank') }
    else { window.location.href = link }
}

push_div = (name, link) => {
    if (name == "" || link == "") { return }
    let str = '<li class="d-flex mb-3 align-items-center"><div class="stories-data ms-3"><h5><a href="' + link + '">' + name + '</a></h5></div></li>'
    $("#link_append").append(str)
}

get_link = () => {
    let email = getCookie("user")
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

    $(".chat-content-leftside").remove()

    let email = getCookie("user")
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
            data[i][0] = moment.unix(ts).format("DD-MMM HH:mm A")
            data[i][1] = linkify(data[i][1])
            data[i][1] = "<pre class=''>" + data[i][1] + "</pre>"
        }

        if (data[0].length >= 3) {
            // processing pro table to 2 columns
            var new_data = []
            for (var i = 0; i < data.length; i++) {
                data[i][1] = data[i][2]
                data[i][1] = linkify(data[i][1])
                data[i][1] = "<pre class=''>" + data[i][1] + "</pre>"
                data[i].pop()
                new_data.push(data[i])
            }
            data = new_data

        }

        for (var i = 0; i < data.length; i++) {
            let time = data[i][0]

            var str = `<div class="iq-message-body iq-other-user mb-3">
            <div class="chat-profile">
               <img src="images/tci_logo.webp" alt="chat-user" class="avatar-40 rounded"
                  loading="lazy">
               <small class="iq-chating p-0 mb-0 d-block">${data[i][0]}</small>
            </div>
            <div class="iq-chat-text">
               <div class="d-flex align-items-center justify-content-start">
                  <div class="iq-chating-content d-flex align-items-center ">
                     <p class="mr-2 mb-0">${data[i][1]}</p>
                  </div>
               </div>
            </div>
         </div>`

            $('#msg_append').append(str)


        }
    });
}

function linkify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return '<a class="linkified_a" href="' + url + '" target="_blank">' + url + '</a>';
    })
}




detect_acc_type = () => {
    let email = getCookie("user")
    $.post(api_url + "/detect_user", { email: email }, function (data, status) {
        if (data == "foundation") {
            global_course = data
            $(".jobs_pg,.nism_pg").hide()

            $("#acc_type,#acc_type2").html("<i class='fas fa-graduation-cap'></i> Foundation Course")
            // setTimeout(update_course,3000)
        }
        else if (data == "pro partial") {
            global_course = data
            $(".jobs_pg,.nism_pg").hide()
            $("#acc_type,#acc_type2").html("<i class='fas fa-graduation-cap'></i> Pro Mentorship")
            // setTimeout(update_course,3000)
        }
        else if (data == "pro full") {
            global_course = data
            $("#acc_type,#acc_type2").html("<i class='fas fa-graduation-cap'></i> Pro Mentorship")
            // setTimeout(update_course,3000)
        }
        else { $(".jobs_pg").hide() }
    })
}

get_stats = () => {
    let email = getCookie("user")
    $.post(api_url + "/user_stats", { email: email }, function (data, status) {
        console.log(data)
        data = eval(data)
        $("#acc_posts").text(data[0])
        $("#acc_likes").text(data[1])
    })
}

get_avatar = () => {
    let email = getCookie("user")
    $.post(api_url + "/get_avatar", { email: email }, function (data, status) {
        data = data[0]
        $("#avatar_big,#avatar_small,#avatar_mob").attr("src", data[0])

        if (data[1] == "0" || data[1] == "") {
            data[1] = "Student"
        }
        $("#acc_name").text(data[1])
        $("#acc_name2,#acc_name_mob").text("Hi " + data[1])
    })
}

$(document).ready(function () {

    // reg_worker()
    // $(".classes_icon").hide()

    let email = getCookie("user")

    $.post(api_url + "/verify_user", { email: email }, function (data, status) {
        console.log("Data: " + data + "\nStatus: " + status);
        if (data == "success") { }
        else {
            tci_logout()
        }

        setTimeout(keep_alive, 8000); setInterval(keep_alive, 45000)

    });

    // close player keyboard bind
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            close_df()
        }
    };

    // admin_verify()
    detect_acc_type()
    // refresh()
    get_link()
    get_msg()
    get_stats()
    get_avatar()
});