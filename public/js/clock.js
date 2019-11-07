$(document).ready(function () {
    var pack = ['Gói 1 tiếng', 'Gói 3 tiếng', 'Gói 1 ngày'];
    $('#select-pack').addClass('disabled');
    pack.forEach( (p, i) => {
        $('.package').append(`<tr class="pack pack${i}" data-ab="${i}"><td>${p}</td></tr>`);
    });
    $('#booking').click( function (e)  {
        console.log(parkingSlotsJS);
        // $.ajax({
        //     type: 'POST',
        //     url: '/booking',
        //
        // });
    });
    $(".package").delegate('tr','click', null, function (e) {
        $('.pack').removeClass('bg-green');
        var i = $(this).data()['ab'];
        $(`.pack${i}`).addClass('bg-green');
        $('#select-pack').removeClass('disabled');
    })
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
                var prefix = 'https://test-payment.momo.vn/gw_payment/qrcode/image/receipt?key=';
                var qrUrl = prefix + data.qrCodeUrl.slice(42);
                console.log(data);
                console.log(qrUrl);
                $('#qr-code').attr('src', qrUrl);
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8'
        });
    });
});
