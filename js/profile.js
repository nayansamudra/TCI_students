const get_stats = () => {
    $.post(api_url + "/user_stats", { email: email }, function (data, status) {
        console.log(data)
        data = eval(data)
        $("#acc_posts").text(data[0])
        $("#acc_likes").text(data[1])
    })
}

const select_img = (el) => {
    $("img").removeClass("avatar_select_border")
    $(el).addClass("avatar_select_border")
    global_avatar_sel = el.src
}


const update_profile = () => {

    var new_name = $("#fname").val() + " " + $("#lname").val() 

    var new_avatar = global_avatar_sel

    $.post(api_url + "/update_profile", { email: email, new_name: new_name, new_avatar: new_avatar }, function (data, status) {
        if (data == "success") {
            toast_function("success","Profile Updated Successfully!")
        }
    })
}


$(document).ready(function () {

    get_stats()

});