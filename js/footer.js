//目前暫時沒有使用 不知道為甚麼用這個下方年份都會消失

document.addEventListener("DOMContentLoaded", function () {
    const footerElement = document.getElementById('footer__innerHtml');
    if (footerElement) {
        footerElement.innerHTML = ``;
    }
});