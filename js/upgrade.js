upgrade_course = () => {


    if (global_course == "pro full") {

        $(".hideme").hide()
        $("#payments_dynamic_l2").addClass("text-center")

        let email = getCookie("user")
        var pf_l2 = "Visit tredcode.tradingcafeindia.com and login with <b>" + email + "</b> & if you face any issue in login, refer to the below link<br><a style='color:#00c7d9' target='_blank' href='https://www.tradingcafeindia.in/loginii'><u>TCI-Students Login Issue</b></a>"

        $("#payments_dynamic_l1").html("Now you have full access to the Ultimate Mentorship program.")
        $("#payments_dynamic_l2").html(pf_l2)
        $("#payments_dynamic_l3").text("")
        return
    }

    // name dyn l1
    var name = 'Hi ' + global_name + ','
    // template collection

    //F -> Pd
    var f_pd_bef_l1 = '<ul style="list-style-type: circle"><li><span class="h5">Foundation module (where we cover basics)</span></li><li><span class="h5">Pro module (where we cover strategies, risk management, psychology)</span></li><li><span class="h5">Master tool – Tredcode, to find high probability setups</span></li><li><span class="h5">TCI community</span></li></ul>'
    var f_pd_bef_l2 = '<span class="h5">Currently you only have access of <b>Foundation module & TCI community</b>, on ' + global_cexp + ' we <b>will share instruction to get full access of Pro module and Tredcode.</b> Until then focus on foundation module.</span>'
    var f_pd_aft_l1 = ''
    var f_pd_aft_l2 = '<span class="h5"><b>It has been 2 weeks you are attending Foundation sessions</b> and in that we have completed all sessions.<br><br>Now you can Get full access of Pro mentorship program where <b>we will share full strategies for intraday trading, swing trading, options trading.<br><br>You will also get Full access of Tredcode</b> where you will be able to find high probability setups. <b>You will also get access of Index analysis features</b> which will help you in your Options trading in Nifty and BankNifty<br><b>Pay pending fees and proceed Further.<br>Pay through below option and whatsapp the screenshot to +91 98333 94530 we will upgrade you</b></span>'
    var f_pd_btn_bef = ''
    var f_pd_btn_aft = 'Pay Here'

    //F -> Fr
    var f_fr_bef_l1 = '<ul style="list-style-type: circle"><li><span class="h5">Foundation module (where we cover basics)</span></li><li><span class="h5">Pro module (where we cover strategies, risk management, psychology)</span></li><li><span class="h5">Master tool – Tredcode, to find high probability setups</span></li><li><span class="h5">TCI community</span></li></ul>'
    var f_fr_bef_l2 = '<span class="h5">Currently you only have access of <b>Foundation module & TCI community</b>, on ' + global_cexp + ' we <b>will share instruction to get full access of Pro module and Tredcode.</b> Until then focus on foundation module.</span>'
    var f_fr_aft_l1 = ''
    // var f_fr_aft_l2='<span class="h5"><b>If you have understood all session completely</b>, you can get now proceed to Pro module of Ultimate mentorship program <b>by confirming through below button. <br> Note: If you proceed to Pro module, then you will not receive session links of foundation. If you are still not confident then take one more week and repeat the sessions where you are facing difficulty and proceed to Pro module next week.</b></span>'
    var f_fr_aft_l2 = '<span class="h5">If you have understood all sessions completely, you can proceed to the Pro module of the program. You have been given access to the Pro module of the program.<br><br><b> Once you upgrade to the pro module you will stop receiving earlier foundation module links. So make sure you understood all the concepts of the foundation module and if still find difficulties with it you can attend one or two weeks again to make it clear.</b><br><br>You can proceed to the Pro module by Confirming through the below button</span>'
    var f_fr_btn_bef = ''
    var f_fr_btn_aft = 'Proceed'

    //PP -> Pd
    var pp_pd_bef_l1 = '<ul style="list-style-type: circle"><li><span class="h5">Module 1: Here we discuss Tredcode and its uses</span></li><li><span class="h5">Module 2:  Strategies and Entry/Exit parameters</span></li><li><span class="h5">Module 3: complete Swing Trading </span></li><li><span class="h5">Module 4: Options trading strategies</span></li><li><span class="h5">TCI community</span></li><li><span class="h5">Master tool – Tredcode, to find high probability setups</span></li></ul>'
    var pp_pd_bef_l2 = '<span class="h5">Currently you only have access of <b>Module 1 access & TCI community</b>, on ' + global_cexp + ' we <b>will share instruction to get full access of Pro module and Tredcode.</b> Until then focus on Module 1.</span>'
    var pp_pd_aft_l1 = ''
    var pp_pd_aft_l2 = '<span class="h5"><b>It has been 1 week you are attending Module-1 sessions</b> and in that we have completed uses of Tredcode.<br><b>Now you can Get full access of Pro mentorship program</b> where we will share <b>full strategies for intraday trading, swing trading, options trading.</b><br>You will also <b>get Full access of Tredcode</b> where you will be able to find <b>high probability setups.</b> You will also <b>get access of Index analysis features</b> which will help you in your<b> Options trading in Nifty and BankNifty<br>Pay pending fees and proceed Further.<br>Pay through below option and whatsapp the screenshot to +91 98333 94530 we will upgrade you</b></span>'
    var pp_pd_btn_bef = ''
    var pp_pd_btn_aft = 'Pay Here'


    let email = getCookie("user")
    $.post(api_url + "/detect_cexp", { email: email }, function (data, status) {
        // console.log(data)

        global_startdate = moment.unix(data[4]).format("DD-MMM-YY")
        global_cexp = moment.unix(data[5]).add(1, 'days').format("DD-MMM-YY")
        global_bal = parseInt(data[6]) * 100
        global_bal = String(global_bal)

        if (data[1] == "foundation" && data[2] == "fr" && data[3] == false) {
            console.log("f-fr-false")
            $("#payments_dynamic_l1").html(name)
            $("#payments_dynamic_l2").html(f_fr_bef_l1)
            $("#payments_dynamic_l3").html(f_fr_bef_l2)
        }
        else if (data[1] == "foundation" && data[2] == "fr" && data[3] == true) {
            console.log("f-fr-true")
            $(".hideme").hide()
            $("#payments_dynamic_l1").html(name)
            $("#payments_dynamic_l2").html(f_fr_aft_l1)
            $("#payments_dynamic_l3").html(f_fr_aft_l2)
            $("#status_btn_text1").show()
        }

        else if (data[1] == "foundation" && data[2] == "pd" && data[3] == false) {
            console.log("f-pd-false")
            $("#payments_dynamic_l1").html(name)
            $("#payments_dynamic_l2").html(f_pd_bef_l1)
            $("#payments_dynamic_l3").html(f_pd_bef_l2)
        }
        else if (data[1] == "foundation" && data[2] == "pd" && data[3] == true) {
            console.log("f-pd-true")
            $(".hideme").hide()
            $("#payments_dynamic_l1").html(name)
            $("#payments_dynamic_l2").html(f_pd_aft_l1)
            $("#payments_dynamic_l3").html(f_pd_aft_l2)
            $("#status_btn_text2").show()
        }

        else if (data[1] == "pro partial" && data[2] == "pd" && data[3] == false) {
            console.log("pp-pd-false")
            $("#payments_dynamic_l1").html(name)
            $("#payments_dynamic_l2").html(pp_pd_bef_l1)
            $("#payments_dynamic_l3").html(pp_pd_bef_l2)
        }
        else if (data[1] == "pro partial" && data[2] == "pd" && data[3] == true) {
            console.log("pp-pd-true")
            $(".hideme").hide()
            $("#payments_dynamic_l1").html(name)
            $("#payments_dynamic_l2").html(pp_pd_aft_l1)
            $("#payments_dynamic_l3").html(pp_pd_aft_l2)
            $("#status_btn_text2").show()
        }

        else if (data[1] == "pro partial" && data[2] == "fr" && data[3] == false) {
            console.log("pp-fr-false")
            alert("Something went wrong")
            window.location.replace(root + "/message-center")

        }
        else if (data[1] == "pro partial" && data[2] == "fr" && data[3] == true) {
            console.log("pp-fr-true")
            alert("Something went wrong")
            window.location.replace(root + "/message-center")
        }

        $(".startdate").html(global_startdate)
        $(".cexp").html(global_cexp)


    })

}

const gen_order = () => {
    let email = getCookie("user")
    $.post(api_pay_url + "/gen_oid", { email: email, amt: global_bal }, function (data, status) {
        console.log(data)
        var oid = data
        pay(oid)
    })
}

const pay = (oid, desc = "Balance Payment") => {

    if (global_bal == 0) {
        console.log("global_bal0 critical err")
        return
    }

    let email = getCookie("user")
    var options = {
        "key": "rzp_live_3QnAmm2hZjX1oz", // Enter the Key ID generated from the Dashboard
        "amount": global_bal, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": global_name,
        "description": "TCI Fees Payment",
        "image": "/img/tci_purple.png",
        "order_id": oid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            alert("Payment Success!")
            if (global_course == "pro partial") {
                // window.location.replace(root+"/message-center")
                window.location.replace(root + "/upgrade")
            }
            else if (global_course == "foundation") {
                window.location.replace(root + "/upgrade")
            }
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
        },
        "prefill": {
            "name": name,
            "email": email,
            "contact": "9999999999"
        },
        "notes": {
            "email": email,
            "course": global_course,
            "address": "TCI Pending Payment"
        },
        "theme": {
            "color": "#3399cc"
        }
    }

    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        // alert(response.error.code);
        alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
    });
    // document.getElementById('rzp-button1').onclick = function(e){
    //     rzp1.open();
    //     e.preventDefault();
    // }
    rzp1.open();


}

// detect_cexp=()=>{
// 	let email=getCookie("user")
// 	$.post(api_url+"/detect_cexp" ,{email:email}, function(data, status){
// 		console.log(data)
// 	})
// }
const foundation_upgrade = () => {
    let x = confirm("Are you sure to Upgrade this Pro Full?")
    if (x) { console.log('Confirmed!') }
    else { return }
    let email = getCookie("user")
    $.post(api_url + "/upgrade_course", { email: email }, function (data, status) {
        console.log(data)
        if (data == "success") {
            // window.location.replace(root+"/message-center")
            window.location.replace(root + "/upgrade")
        }
    })
}





$(document).ready(function () {

    $('#upgrade_html').addClass('active')

    // global declaration
    global_avatar_sel = "1"
    global_course = "fetch_pending"
    global_subs_state = "unk"
    global_name = "Student"
    global_startdate = '<span class="startdate font-weight-bold" >10-10-10</span>'
    global_cexp = '<span class="cexp font-weight-bold" >10-10-10</span>'
    global_bal = "0"

    //first api call
    let email = getCookie("user")

    $.post(api_url + "/verify_user", { email: email }, function (data, status) {
        console.log("Data: " + data + "\nStatus: " + status);
        if (data == "success") { }
        else {
            tci_logout()
        }

        setTimeout(keep_alive, 8000); setInterval(keep_alive, 45000)

    });



    refresh()
    detect_acc_type()
    get_stats()
    //calledfrm inside det_acc for cb chaining
    // get_avatar(upgrade_course)


    setInterval(function () { refresh() }, 180000);
    setInterval(function () { $('.signout_btn').trigger('click'); }, 1800000);

});