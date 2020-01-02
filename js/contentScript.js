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

        let flat = true;


        setInterval(sendMsg, 5000);

        function sendMsg() {
            // console.log("BMEWebToken",GetQueryString("BMEWebToken"));
            if (status == 0) {
                chrome.runtime.sendMessage(
                    {greeting: '你好，我是content-script1！'},
                    function (response) {
                        // console.log(JSON.stringify(response));
                        if (response.mp == 1) {
                            BMECID = response.BMECID;
                            BMEWebToken = response.BMEWebToken;
                            if (status == 0) {
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
            let BMEWebToken = GetQueryString("BMEWebToken");
            if (BMEWebToken == null) {
                return;
            }
            console.log("开始调用接口");
            if(flat){
                let dt = new Date().getTime();
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
            }else{
                flat = false;
            }

        }


        // 监听background传过来的数据dahai
        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                console.log(sender.tab ? "来自内容脚本：" + sender.tab.url : "来自扩展程序");
                console.log(JSON.stringify(request), request.greeting);
                // if (request.greeting == "您好") {
                //     console.log("进行响应");
                //     sendResponse({farewell: "再见"});
                // }


                let dt = new Date().getTime();
                let BMEWebToken = GetQueryString("BMEWebToken");
                let BMECID = request.BMECID;
                subForm("https://org.ke.m-pesa.com/business.action?BMECID=" + BMECID + "&BMETimestamp=" + dt + "&BMEWebToken=" + BMEWebToken,BMEWebToken);


            });


        let formJsonData = {
            "queryByAccountTag": "true",
            "condition.accountNo": "500000002143191067",
            "bmeEvent.def": "hotPage:spring:BMEPage",
            "hotPage.recordperpage": "10",
            "hotPage.curPage": "0",
            "transRecords[0].conditionBeginTime": "31-12-2019 00:00:00",
            "transRecords[0].conditionBeginTime_bmeDTMShowFmt": "dd-MM-yyyy HH:mm:ss",
            "transRecords[0].conditionBeginTime_bmeDSTSupport": "false",
            "transRecords[0].conditionEndTime": "31-12-2019 23:59:59",
            "transRecords[0].conditionEndTime_bmeDTMShowFmt": "dd-MM-yyyy HH:mm:ss",
            "transRecords[0].conditionEndTime_bmeDSTSupport": "false",
            "transRecords[0].direction": "",
            "transRecords[0].oppositeIdentityType": "",
            "bmeEvent.def": "page:spring:BMEPage",
            "page.recordperpage": "10",
            "page.curPage": "1",
            "transRecords[1].queryStatus": "All",
            "transRecords[1].conditionBeginTime": "25-12-2019 00:00:00",
            "transRecords[1].conditionBeginTime_bmeDTMShowFmt": "dd-MM-yyyy HH:mm:ss",
            "transRecords[1].conditionBeginTime_bmeDSTSupport": "false",
            "transRecords[1].conditionEndTime": "31-12-2019 23:59:59",
            "transRecords[1].conditionEndTime_bmeDTMShowFmt": "dd-MM-yyyy HH:mm:ss",
            "transRecords[1].conditionEndTime_bmeDSTSupport": "false",
            "transRecords[1].direction": "",
            "transRecords[1].oppositeIdentityType": "",
            "bmeEvent.def": "page:spring:BMEPage",
            "page.recordperpage": "10",
            "page.curPage": "0",
            "BMEClear": "queryByAccountTag",
            "BMEClear": "transRecords[1].queryStatus",
            "bmeEvent.mode": "export",
            "bmeEvent.validation": "true",
            "bmeEvent.export": "export",
            "bmeEvent.targetid": "",
            "bmeEvent.service": "exportStatusData",
            "BMEParam": "%{#BMEModel}",
            "BMEParam": "COMPLETED",
            "BMEParam": "xls",
            "bmeEvent.action": "orgQueryTransactionLogsqueryTransDetailexportStatusData('%{#BMEModel}', 'COMPLETED', jEvent.jqItem.attr('fileType'))"
        };

        function subForm(action,tok) {
            form = $("<form id='formId'></form>");
            form.attr('action', action);
            form.attr('method', 'post');

            for (let v in formJsonData) {
                let inputDom = $("<input type='hidden' />");
                inputDom.attr('name', v);
                inputDom.attr('value', formJsonData[v]);
                form.append(inputDom);
            }
            form.appendTo("body");
            form.css('display', 'none');
            // form.submit()
            // ajax提交
            $.ajax({
                type: "POST",
                headers:{
                  "Referer":"https://org.ke.m-pesa.com/business.action?BMEBusiness=orgQueryTransactionLogs&condition.identityType=5000&identityId=201000000201025279&BMEWebToken="+tok
                },
                url: action,
                data: $('#formId').serialize(),
                success: function (data) {
                    alert("success");
                },
                error: function (data) {
                    alert("error");
                }
            });
        }


        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }


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