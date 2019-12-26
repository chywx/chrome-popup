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
        if (bg.mp == 0) {
            bg.mp = 1;
            $(".startListen").html("开始监听");
        } else {
            bg.mp = 0;
            $(".startListen").html("取消监听");
        }


        // $(".startListen").html("监听" + bg.mp + "次");
    })

    $(".downloadExcel").click(function () {
        // $(".exc").html("监听开始");
    })
}


$(document).ready(function () {
    if (bg.flag.begin)
        $(".btn").html("选择完成");
    else
        $(".btn").html("请选择要隐藏的区域");
})