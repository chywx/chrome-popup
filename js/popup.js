var b = "I'm popup";
var bg = chrome.extension.getBackgroundPage();//获取background页面,popup与background通信
if (bg) {
    // $(".btn").click(function () {
    //     if (!bg.flag.begin) {
    //         bg.flag.begin = 1;
    //         bg.flag.change = 1;
    //     } else {
    //         bg.flag.begin = 0;
    //         bg.flag.change = 1;
    //     }
    // })

    $(".startListen").click(function () {
        bg.mp = 1;
        bg.BMECID = $("#BMECID").val();
        $(".startListen").html("已开始监听");
        $(".stopListen").html("结束监听")
        // if (bg.mp == 0) {
        //     bg.mp = 1;
        //     $(".startListen").html("开始监听");
        // } else {
        //     bg.mp = 0;
        //     $(".startListen").html("取消监听");
        // }
    })

    $(".stopListen").click(function () {
        bg.mp = 2;
        $(".stopListen").html("已结束监听");
        $(".startListen").html("开始监听");
    })

    $(".downloadExcel").click(function () {
        // $(".exc").html("监听开始");
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            let BMECID = $("#BMECID").val();
            chrome.tabs.sendMessage(tabs[0].id, {message: "calculate", greeting: "您好","BMECID":BMECID}, function (response) {
                if (typeof response != 'undefined') {
                    console.log(JSON.stringify(response));
                } else {
                    console.log("response为空=>" + response);
                }
            });//end  sendMessage
        });
    })
}


$(document).ready(function () {
    if (bg.flag.begin)
        $(".btn").html("选择完成");
    else
        $(".btn").html("请选择要隐藏的区域");
})