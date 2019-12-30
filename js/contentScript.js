(function () {
    $(document).ready(function () {
        // document.body.contentEditable = "true"
        //发消息
        // var bac = chrome.extension.connect({name: "bgAndCon"});
        // bac.postMessage({joke: "Knock knock"});

        // 发送请求chyok
        // setInterval(function () {
        //         chrome.extension.sendRequest({greeting: "hello"}, function (response) {
        //             // 打印相应
        //             console.log(response.farewell);
        //
        //         });
        // },5000)

        // 向background发送数据
        let iii = 0;
        setInterval(function () {
            chrome.runtime.sendMessage(
                {greeting: '你好，我是content-script呀，我主动发消息给后台！' + ++iii},
                function (response) {
                    console.log('收到来自后台的回复：' + response);
                }
            );
        }, 5000);


        // 监听background传过来的数据dahai
        // chrome.runtime.onMessage.addListener(
        //     function (request, sender, sendResponse) {
        //         console.log(sender.tab ? "来自内容脚本：" + sender.tab.url : "来自扩展程序");
        //         console.log(JSON.stringify(request), request.greeting);
        //         if (request.greeting == "您好") {
        //             console.log("进行响应");
        //             sendResponse({farewell: "再见"});
        //         }
        //     });


        // let aaa = 1;
        // //接收消息
        // chrome.extension.onConnect.addListener(function (cab) {
        //     cab.onMessage.addListener(function (msg) {
        //         if (msg.mp == 1) {
        //             console.log("hello", msg.mp, new Date(), aaa++);
        //             // $.ajax({
        //             //     url: "https://bet-api.bangbet.com/api/bet/tournament/list",
        //             //     data: {sportCategoryId: "sr:category:1"},
        //             //     type: "get",
        //             //     success: function (data) {
        //             //         console.log(JSON.stringify(data));
        //             //     }
        //             // })
        //         }
        //     })
        // })

    });
})();