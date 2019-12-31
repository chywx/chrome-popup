var flag = {
    begin: 0,
    change: 0
};//当前未开始
var mp = 0;
var BMECID = "";
var BMEWebToken = "";
/*var d = new Date();
console.log(d.toLocaleString());*/

// setInterval(function () {
//     var pop = chrome.extension.getViews({type: 'popup'})[0];
//     if (pop) {
//         console.log(pop.b);
//     }
// }, 1000)

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     setInterval(function () {
//         let cab = chrome.tabs.connect(tabId);
//         cab.postMessage({mp});
//         // chrome.tabs.connect(tabId);
//         // chrome.tabs.sendMessage(tabId, {mp});
//
//     }, 5000);
// });


// 监听content_js的请求，并响应chyok
// chrome.extension.onRequest.addListener(
//     function (request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.greeting == "hello" && mp == 1)
//             sendResponse({farewell: "world"});
//         else
//             sendResponse({farewell: "goodbye"}); // snub them.
//     });

// 监听content传递过来的数据
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // if (mp == 1) {
    //     sendResponse({mp, BMECID, BMEWebToken});//做出回应
    sendResponse({"mp": mp, "BMECID": BMECID, "BMEWebToken": BMEWebToken});
    // }
    // sendResponse({"msg": '我已收到你的消息：' + JSON.stringify(request)});//做出回应
});

// 向content发送数据dahai
// setInterval(function () {
//     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {message: "calculate", greeting: "您好"}, function (response) {
//             if (typeof response != 'undefined') {
//                 alert(JSON.stringify(response));
//             } else {
//                 alert("response为空=>" + response);
//             }
//         });//end  sendMessage
//     }); //end query
// })


//接收消息
// chrome.extension.onConnect.addListener(function(bac) {
//     bac.onMessage.addListener(function(msg) {
//         console.log("chy");
//         console.log(msg.joke);
//     })
// })


//发消息
/*chrome.tabs.query({active:true}, function(tab) {
    chrome.tabs.sendMessage(tab.id, { greeting: "hello"}, 
        function(response) {
            console.log(response.farewell)
        });
}) */
/*chrome.tabs.query({active:true}, function(tab) {
    setInterval(function(){
    console.log(tab.id)

},1000)
    // chrome.tabs.connect(tab.id, {name: "knockknock"})
})*/