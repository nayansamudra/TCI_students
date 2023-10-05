const fetch_tree = () => {
    $.post(api_url + "/blogs/fetch_tree", { email: email }, function (data, status) {
        // console.log(status)
        if (data.length > 0) {
            data[0][1] = JSON.parse(data[0][1])
            // console.log(data)
            console.log("Data Present Using server tree")

            $('#jstree').jstree({
                core: {
                    check_callback: true,
                    data: data[0][1]
                },
                "checkbox": {
                    "three_state": false,
                },
                "themes": {
                    "url": true,
                    "icons": true
                },
                "types": {
                    "default": {
                        "icon": "glyphicon glyphicon-flash"
                    },
                },


                "plugins": ["themes", "json_data", "ui", "types", "dnd", "state"],

            });
        }


        // jstree desk evt
        x = ""
        $('#jstree').on('select_node.jstree', function (e, data) {
            // console.log(data)
            x = data
            global_curr_node_id = x.node.id
            let node_data = $('#jstree').jstree(true).get_node("#" + x.node.id).data
            if (node_data.ref == "" || node_data.ref == null) {
                console.log("empty_bl")
                $("#blog_heading").html("")
                $("#frame1_desc").html("")
                $("#frame2_desc").html("")
                global_frame_1 = ""
                global_frame_2 = ""
                $("#frame1").hide()
                $("#frame2").hide()
                quill_r.setContents("")
            }
            if (node_data.ts == "" || node_data.ts == null) { console.log("empty_bl"); quill_r.setContents("") }
            else {
                $("#frame1").show()
                $("#frame2").show()
                console.log(node_data)
                read_single_blog(node_data.ts)
            }

        })

        setTimeout(function () { $(".jstree-anchor > i").remove() }, 3000);

    });
}


const read_single_blog = (ts) => {
    $.post(api_url + "/blogs/fetch_blog", { email: email, ts: ts }, function (data, status) {

        if (data == "access denied") {
            $("#access_denied_page").show()
            $("#quill_reader_div").hide()
        }
        else {
            $("#access_denied_page").hide()
            $("#quill_reader_div").show()
        }


        try {
            data[0][7] = JSON.parse(data[0][7])
        } catch (e) {
            console.log("caught null quill")
            quill_r.setContents("")
        }



        quill_r.setContents(data[0][7]);

        global_frame_1 = data[0][2]
        global_frame_2 = data[0][3]
        $("#blog_heading").html(data[0][4])
        $("#frame1_desc").html(data[0][5])
        $("#frame2_desc").html(data[0][6])

        $('html, body').animate({
            scrollTop: $("#quill_reader_div").offset().top
        }, 2000);
        $("#quill_reader > div.ql-editor > p").css("fontSize", "1.2rem");
    });
}


$(document).ready(function () {

    $('#classes_html').addClass('active')

    global_avatar_sel = "1"
    global_course = "fetch_pending"

    course_click = 0

    //quil instance for reader
    quill_r = new Quill('#quill_reader', {
        modules: {
            toolbar: false
        },
        // placeholder: 'Compose an epic...',
        bounds: "document.body",
        theme: 'bubble'  // or 'bubble'
    });

    quill_r.enable(false)

    // ui patch rm transp ico
    $("#jstree").click(function () {
        $(".jstree-anchor > i").remove()
    })

    fetch_tree()

});


$(document).on('click', '#course_click', function () {
    course_click = 1
    $('.card-title.blinking-text').removeClass('blinking-text')
})