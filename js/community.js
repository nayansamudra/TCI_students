function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // The loader is now visible in the viewport
            setTimeout(function () {
                console.log('function is called')
                loader_gif_visible += 1
                get_all_posts(loader_gif_visible)
                // Re-observe the loader element
                observer.observe(entry.target);
            }, 2000); // 3000 milliseconds (3 seconds)
            observer.unobserve(entry.target); // Stop observing once appended
        }
    });
}

$(document).on('click', '.thumb_up', function (e) {

    e.stopPropagation();

    const $blogContainer = $(this).closest('.blog_like');
    const $likeCount = $blogContainer.find('.number_of_like');
    let likeCountValue = parseInt($likeCount.text());

    if ($(this).hasClass('liked')) {
        $(this).removeClass('liked');
        likeCountValue -= 1;
    } else {
        $(this).addClass('liked');
        likeCountValue += 1;

        var ts = $(this).attr('data-id')
        $.post(api_url + "/like", { email: email, timestamp: ts }, function (data, status) { });
    }

    $likeCount.text(likeCountValue);

    e.preventDefault();
});

$(document).on('click', '#block-2', function () {
    $('#create_post_form').attr('style', 'display:block')
    $('#post_content').attr('style', 'display:none')
    $('#image_loader').attr('style', 'display:none')
});

$(document).on('click', '#close_btn', function (e) {
    $('#create_post_form').attr('style', 'display:none')
    $('#post_content').attr('style', 'display:block')
    $('#image_loader').attr('style', 'display:block')
    e.preventDefault()
});

$(document).on('click', '#submit_btn', function (e) {
    upload_post()
    e.preventDefault()
});

$(document).on('click', '.blog-single', function (e) {
    $('#myModal').modal('show');
    get_single_post($(this).attr('id'))
    e.preventDefault();
});

$(document).on('click', '#Grid_View', function (e) {
    $('.d-flex.align-items-center.view_option').removeClass('selected')
    $('#Grid_View h6').addClass('selected')
    get_all_posts()
    e.preventDefault();
});

$(document).on('click', '#Detail_View', function (e) {
    $('.d-flex.align-items-center.view_option').removeClass('selected')
    $('#Detail_View h6').addClass('selected')
    get_all_posts()
    // -------------- For Temporary
    str = '<span style="font-size:48px; text-align:center">Comming Soon ...</span>'
    $("#post_append").append(str)
    // $('#image_loader').attr('style', 'display:none')
    // -------------- For Temporary
    e.preventDefault();
});

const upload_post = () => {
    var title = $("#ip_title").val()
    var tag = $("#ip_tag").val()
    var description = $("#feedback_text").val()

    // input validation
    if (title == "" || description == "") { toast_function("warning", "Please Enter all fields!"); return }

    var filename = $('#Image_input').val()
    if (filename == "") { toast_function("warning", "Please Upload a Image"); return }
    filename = (filename.split("\\"))[2]

    var formData = new FormData();
    formData.append('file', $('#Image_input')[0].files[0]);
    formData.append('title', title);
    formData.append('tag', tag);
    formData.append('description', description);
    formData.append('email', email);
    formData.append('filename', filename);
    $.ajax({
        type: "POST",
        url: api_url + '/user_add_post',
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            if (data == "success") {
                toast_function("success", "Post Uploaded Successfully!")
                $('#image_loader').attr('style', 'display:block')
                get_all_posts(loader_gif_visible)
            }
            else if (data == "Limit exceeded") {
                toast_function("warning", "Post Limit Exceeded!")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    })



}

const get_single_post = (ts) => {
    $.post(api_url + "/get_post", { email: email, timestamp: ts }, function (data, status) {
        let ts = moment.unix(data[0][0]).format("DD-MMM-YYYY HH:mm")
        $("#post_time_push").text(ts)
        $("#post_topic_push").text(data[0][1])
        $("#post_tag_push").text("#" + data[0][4])
        $("#post_msg_push").text(data[0][2])
        $("#post_img").attr("src", 'https://students.tradingcafeindia.com' + data[0][5])
        $("#post_img_a").attr("href", data[0][5])
        $("#post_likes_push").text(data[0][6] + 'Likes')

        $("#post_author").text(data[2][0])
        if (data[2][1] == "") { data[2][1] = "TCI Student" }
        if (data[2][1] == '/img/avatar/default.png') {
            $("#post_avatar").attr("src", 'https://students.tradingcafeindia.com' + data[2][1])
        } else {
            $("#post_avatar").attr("src", data[2][1])
        }
    });
}

const get_total_count = () => {

    var filter = clicked_category
    var offset_arr = []

    $.ajaxSetup({ async: false });
    $.post(api_url + "/get_all_posts_count", { email: email, filter: filter }, function (data, status) {

        var total_post = JSON.parse(data[0])
        let total_pages = Math.ceil(total_post / 15)

        for (var i = 0; i < total_pages; i++) {
            offset_arr.push(15 * i)
        }

    });

    return offset_arr
}

const shorten = (text, length = 80) => {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
}

const get_all_posts = (pgno = 1) => {

    $('#image_loader').show()

    var filter = clicked_category

    // get count
    var offset_arr = get_total_count()
    var offset = offset_arr[pgno - 1]
    if (offset == 0) {
        $('#post_append').empty()
    }
    
    if(offset == offset_arr[offset_arr.length - 1]) {
        $('#image_loader').hide()
    }
    else {
        $('#image_loader').show()
    }
    $.post(api_url + "/get_all_posts", { email: email, filter: filter, offset: offset }, function (data, status) {

        if(data == null) {
            $('#image_loader').attr('style', 'display:none')
            toast_function("warning","No post related to your search")
            return;
        }

        var liked_posts = JSON.parse(data[data.length - 1])

        var spl = ""
        for (var i = 0; i < data.length - 1; i++) {
            // for (var i = 0; i < 1; i++) {
            if (liked_posts.includes(data[i][0])) { spl = "liked" }
            else { spl = "" }

            data[i][2] = shorten(data[i][2])

            if ($('#Grid_View h6').hasClass('selected')) {
                var str = ` <div class="col-lg-6 col-xl-4">
                <div class="card card-transparent card-block card-stretch card-height blog-grid blog-single community_post" id="${data[i][0]}">
                   <div class="card-body p-0 position-relative">
                      <div class="image-block" style="height:400px; overflow:hidden">
                         <img src="https://students.tradingcafeindia.com${data[i][5]}" class="img-fluid rounded w-100" alt="blog-img" style="object-fit: contain; max-height:400px">
                      </div>
                      <div class="blog-description p-3">
                         <div class="date"><a href="#" tabindex="-1" class="post-category" data-id="${data[i][0]}">#${data[i][4]}</a></div>
                         <h5 class="mb-2 post-name" data-id="${data[i][0]}">${data[i][1]}</h5>
                         <span class="post-description">${data[i][2]}</span>
                         <div
                            class="mt-2 d-flex align-items-center justify-content-between position-right-side blog_like">
                            <div class="like d-flex align-items-center">
                               <i class="material-symbols-outlined pe-2 md-18 thumb_up ${spl}" data-id="${data[i][0]}">thumb_up</i><span
                                  class="number_of_like">${data[i][6]}</span>&nbsp;like
                            </div>
                         </div>
                      </div>
                   </div>
                </div></div>`
            } else if ($('#Detail_View h6').hasClass('selected')) {
                var str = ''
            }
            $("#post_append").append(str)
        }
    });
    $.ajaxSetup({ async: true });
}




$(document).ready(function () {
    loader_gif_visible = 1
    clicked_category = "all"
    get_all_posts()

    var options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger the callback when 10% of the loader is visible
    };

    var observer = new IntersectionObserver(handleIntersection, options);
    var loader = document.querySelector('#image_loader img');
    observer.observe(loader);
});

$(document).on('click', '.category_class', function (e) {
    $('.category_class').removeClass('selected')
    $(this).addClass('selected')
    clicked_category = $(this).attr('data-val')
    get_all_posts()
})