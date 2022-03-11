// DOMが読み込まれたら実行させる
$(function() {
    const url = window.location.href;
    if(url.includes("remain")) {
        // initContentPage();
    } else {
        initLandingPage();
    }
});

function initLandingPage() {
    $('#datepicker').datepicker();
    $('#create_button').on('click', function() {
        const userDate = $('#datepicker').datepicker('getDate');
        const userText = $('#your_text').val();
        if(!userDate || !userText) {
            alert("空欄があります");
            return;
        }
        const epochDate = userDate.getTime() / 1000;
        const url = "/remain?text=" + userText + "&date=" + epochDate;
        console.log(url);
        document.location.href = url;
        return false;
    });
}

function initContentPage() {
    const userDate = getParam('date');
    const userText = getParam('text');

    const now = Date.now() / 1000;
    const remains = Math.ceil((userDate - now) / (24 * 60 * 60));

    const userDateElement = $('<div>', { id:'remain_days', class:'days', text: remains + "日" });
    const userTextElement = $('<div>', { id:'text', class:'foo', text: userText });
    $("#main_wrapper").append(userTextElement);
    $("#main_wrapper").append(userDateElement);
}

