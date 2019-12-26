(function () {
    $(document).ready(function () {
        // document.body.contentEditable = "true"
        //发消息
        // var bac = chrome.extension.connect({name: "bgAndCon"});
        // bac.postMessage({joke: "Knock knock"});

        // 发送请求chyok
        // chrome.extension.sendRequest({greeting: "hello"}, function (response) {
        //     // 打印相应
        //     console.log(response.farewell);
        // });

        let aaa = 1;
        //接收消息
        chrome.extension.onConnect.addListener(function (cab) {
            cab.onMessage.addListener(function (msg) {
                if (msg.mp == 1) {
                    console.log("hello", new Date(), aaa++);
                    // $.ajax({
                    //     url: "https://bet-api.bangbet.com/api/bet/tournament/list",
                    //     data: {sportCategoryId: "sr:category:1"},
                    //     type: "get",
                    //     success: function (data) {
                    //         console.log(JSON.stringify(data));
                    //     }
                    // })
                }
                // if (msg.flag) {
                //     $("body").find("*").mouseenter(function () {
                //         event.stopPropagation();
                //         $(this).css({"box-shadow": "0 0 5px 1px #3AB2FF"});
                //         $(this).one("click", function () {
                //             event.stopPropagation();
                //             $(this).hide();
                //             return false;
                //         })
                //     });
                //     $("body").find("*").mouseout(function () {
                //         event.stopPropagation();
                //         $(this).css("box-shadow", "none");
                //     })
                // } else {
                //     $("body").find("*").unbind("mouseenter").unbind("mouseout").unbind("click");
                // }
            })
        })
        /*chrome.extension.onConnect.addListener(function(cab) {
            console.log("AAA")
            cab.onMessage.addListener(function(msg) {
                console.log(msg.greeting);
                console.log("BBB")
            })
        })*/
    });
})();