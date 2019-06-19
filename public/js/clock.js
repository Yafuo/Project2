$(document).ready(function () {
    function format2Digits(intNum) {
        return intNum < 10 ? '0' + intNum : intNum;
    }
    function clock() {
        var time = new Date();
        var hour = time.getHours();
        var min = time.getMinutes();
        var second = time.getSeconds();
        hour = hour < 10 ? '0' + hour : hour;
        min = min < 10 ? '0' + min : min;
        second = second < 10 ? '0' + second : second;
        var clk = `${hour}:${min}:${second}`;
        $('#main-clock').text(clk);
        setTimeout(clock, 1000);
    }
    $('.chooseTime').val(`${format2Digits(new Date().getHours())}:${format2Digits(new Date().getMinutes())}`);
    $('.chooseHour').val(format2Digits(new Date().getHours()));
    $('.chooseMinute').val(format2Digits(new Date().getMinutes()));
    $('.clockpicker').clockpicker({
        afterDone: function() {
            var chosenTime = $('.chooseTime').val();
            var chosenHour = parseInt(chosenTime.slice(0, chosenTime.indexOf(':')));
            chosenHour = chosenHour === 0 ? 24 : chosenHour;
            var chosenMinute = parseInt(chosenTime.slice(chosenTime.indexOf(':')+1));
            if (chosenHour > new Date().getHours() || (chosenHour === new Date().getHours() && chosenMinute > new Date().getMinutes())) {
                $('#validateTime').text('Ready to submit.');
                $('#validateTime').removeClass().addClass('col-4 valid');
                $('#submitBtn').attr('disabled', false);
                $('#submitBtn').removeClass().addClass('col-4 btn btn-primary');
            } else {
                $('#validateTime').text('Invalid time. Please try again');
                $('#validateTime').removeClass().addClass('col-4 invalid');
                $('#submitBtn').attr('disabled', true);
                $('#submitBtn').removeClass().addClass('col-4 btn btn-primary');
            }
        }
    });
    $('#submitBtn').click((e) => {
        e.preventDefault();
        const userAlarm = $('.chooseTime').val();
        const userSlot = $('.slot').val();
        $.ajax({
            type: 'POST',
            url: '/userAlarm',
            data: JSON.stringify({
                'userSlot': userSlot,
                'userAlarm': userAlarm
            }),
            success: function(data) {
                $('.container').css('filter', 'opacity(12%)');
                $('.message').css('display', 'block');
            },
            dataType: 'json',
            contentType: 'application/json'
        });
    });
    $('.close').click((e) => {
        $('.container').css('filter', 'opacity(100%)');
        $('.message').css('display', 'none');
    });
    clock();
});
