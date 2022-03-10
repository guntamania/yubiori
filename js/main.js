// DOMが読み込まれたら実行させる
$(function() {
    const url = window.location.href;
    if(url.includes("remain")) {
        initContentPage();
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
        document.location.href = "/remain?text=" + userText + "&date=" + epochDate;
    });
}

function initContentPage() {
    const userDate = getParam('date');
    const userText = getParam('text');

    const now = Date.now() / 1000;
    const remains = Math.floor((userDate - now) / (24 * 60 * 60));

    const userDateElement = $('<div>', { id:'hoge', class:'foo', text: remains + "日" });
    const userTextElement = $('<div>', { id:'text', class:'foo', text: userText });
    $("#main_wrapper").append(userTextElement);
    $("#main_wrapper").append(userDateElement);
}

/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
 */
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
