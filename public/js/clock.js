$(document).ready(function () {
    $('#booking').click(e => {
        $.ajax({
            type: 'POST',
            url: '/booking',

        });
    });
    $('#paying').click(e => {
        var date = Date.now().toString();
        var data = `partnerCode=MOMO&accessKey=F8BBA842ECF85&requestId=UIT${date}&amount=5000&orderId=UIT${date}&orderInfo=UIT team.&returnUrl=https://momo.vn&notifyUrl=https://momo.vn&extraData=abc@gmail.com`;
        var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        var signature = CryptoJS.HmacSHA256(data, secretKey);
        console.log(signature.toString(CryptoJS.enc.Hex));
        $.ajax({
            type: 'POST',
            url: 'https://test-payment.momo.vn/gw_payment/transactionProcessor',
            data: JSON.stringify({
                partnerCode: 'MOMO',
                accessKey: 'F8BBA842ECF85',
                requestId: 'UIT'+ date,
                amount: '5000',
                orderId: 'UIT'+ date,
                orderInfo: 'UIT team.',
                returnUrl: 'https://momo.vn',
                notifyUrl: 'https://momo.vn',
                requestType: 'captureMoMoWallet',
                signature: signature.toString(CryptoJS.enc.Hex),
                extraData: 'abc@gmail.com',
            }),
            crossDomain: true,
            success: function (data) {
                console.log(data);
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8'
        });
        // $.ajax({
        //     type: 'POST',
        //     url: 'https://test-payment.momo.vn/gw_payment/transactionProcessor',
        //     headers: {
        //         'content-type': "application/x-www-form-urlencoded"
        //     },
        //     data: '{\r\n  \"accessKey\": \"F8BBA842ECF85\",\r\n  \"partnerCode\": \"MOMO\",\r\n  \"requestType\": \"captureMoMoWallet\",\r\n  \"notifyUrl\": \"https://momo.vn\",\r\n  \"returnUrl\": \"https://momo.vn\",\r\n  \"orderId\": \"123213216\",\r\n  \"amount\": \"150000\",\r\n  \"orderInfo\": \"SDK team.\",\r\n  \"requestId\": \"123213216\",\r\n  \"extraData\": \"email=abc@gmail.com\",\r\n  \"signature\": \"a9749c5b911ca9506d2974873595b8cb1f33d7d46f8c132fb0eebeca9f0611ab\"\r\n}',
        //     success: function (data, textStatus, jQxhr) {
        //         var messsage = "HTTP Endpoint: " + 'https://test-payment.momo.vn/gw_payment/transactionProcessor' + "\nHTTP Status: " + jQxhr.status + "\nHTTP Payload: \n" + JSON.stringify(data, null, 1);
        //         $("#response-body").text(messsage);
        //         console.log(data);
        //     },
        //     error: function (jQxhr, textStatus, errorThrown) {
        //         console.log("jQxhr", jQxhr, "textStatus", textStatus, "errorThrown", errorThrown)
        //         var message = "HTTP Status: " + jQxhr.status + "\n" + "HTTP Body: " + JSON.stringify(errorThrown);
        //         $("#response-body").text(message);
        //         console.log(data);
        //     },
        //     complete: function (data) {
        //         // setLoadingAnimation('#execute-request');
        //         console.log(data);
        //     }
        // });
    });
});
