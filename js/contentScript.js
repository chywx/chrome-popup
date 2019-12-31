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

        let status = 0;

        let BMECID = "";

        let BMEWebToken = "";

        let flat = true;

        setInterval(sendMsg, 5000);

        function sendMsg() {
            if (status == 0) {
                chrome.runtime.sendMessage(
                    {greeting: '你好，我是content-script1！'},
                    function (response) {
                        // console.log(JSON.stringify(response));
                        if (response.mp == 1) {
                            BMECID = response.BMECID;
                            BMEWebToken = response.BMEWebToken;
                            if(status == 0){
                                status = 1;
                                iCount = setInterval(opera, 10000);
                            }
                        }
                    }
                );
            }
        }

        setInterval(sendSop, 5000);

        function sendSop() {
            if (status == 1) {
                chrome.runtime.sendMessage(
                    {greeting: '你好，我是content-script2'},
                    function (response) {
                        if (response.mp == 2) {
                            clearInterval(iCount);
                            status = 0;
                        }
                    }
                );
            }
        }

        function opera() {
            console.log("开始调用接口");
            var dt = new Date().getTime();
            $.ajax({
                url: "https://org.ke.m-pesa.com/business.action?BMECID=" + BMECID + "&BMETimestamp=" + dt + "&BMEWebToken=" + BMEWebToken,
                data: {
                    "bmeEvent.mode": "render",
                    "bmeEvent.validation": "true",
                    "bmeEvent.regionid": "",
                    "bmeEvent.targetid": "please",
                    "bmeEvent.service": "queryBroadcastForOperator",
                    "BMEParam": "%{#BMEModel}",
                    "bmeEvent.action": "orgIndexPagestartPagequeryBroadcastForOperator('%{#BMEModel}')"
                },
                type: "POST",
                success: function (data) {
                    console.log(data);
                }
            })
        }


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