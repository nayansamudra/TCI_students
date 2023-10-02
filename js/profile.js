get_stats = () => {
    let email = getCookie("user")
    $.post(api_url + "/user_stats", { email: email }, function (data, status) {
        console.log(data)
        data = eval(data)
        $("#acc_posts").text(data[0])
        $("#acc_likes").text(data[1])
    })
}