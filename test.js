const titles = ["首頁", "【新消息】首頁"];
let index = 0;

function titleChange() {
    document.title = titles[index];
    index = (index + 1) % titles.length;
}

setInterval(titleChange, 1000); // 將時間參數改為 1000 毫秒