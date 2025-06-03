//顯示header 暫時不使用這個 
document.addEventListener("DOMContentLoaded", function () {
    const headerElement = document.getElementById('header__innerHtml');
    if (headerElement) {
        headerElement.innerHTML = ``;
    }
});