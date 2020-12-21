$(function(){

    var colors = [
        '26e000','2fe300','37e700','45ea00','51ef00',
        '61f800','6bfb00','77ff02','80ff05','8cff09',
        '93ff0b','9eff09','a9ff07','c2ff03','d7ff07',
        'f2ff0a','fff30a','ffdc09','ffce0a','ffc30a',
        'ffb509','ffa808','ff9908','ff8607','ff7005',
        'ff5f04','ff4f03','f83a00','ee2b00','e52000'
    ];
    var colors_master = [
        '26e000','2fe300','37e700','45ea00','51ef00',
        '61f800','6bfb00','77ff02','80ff05','8cff09',
        '93ff0b','9eff09','a9ff07','c2ff03','d7ff07',
        'f2ff0a','fff30a','ffdc09','ffce0a','ffc30a',
        'ffb509','ffa808','ff9908','ff8607','ff7005',
        'ff5f04','ff4f03','f83a00','ee2b00','e52000'
    ];

    var rad2deg = 180/Math.PI;
    var deg = 0;
    var bars = $('#bars');
    var bars_master = $('#bars_master');

    for(var i=0;i<colors.length;i++){

        deg = i*12;

        // Create the colorbars

        $('<div class="colorBar">').css({
            backgroundColor: '#'+colors[i],
            transform:'rotate('+deg+'deg)',
            top: -Math.sin(deg/rad2deg)*80+100,
            left: Math.cos((180 - deg)/rad2deg)*80+100,
        }).appendTo(bars);

        $('<div class="colorBar_master">').css({
            backgroundColor: '#'+colors_master[i],
            transform:'rotate('+deg+'deg)',
            top: -Math.sin(deg/rad2deg)*80+100,
            left: Math.cos((180 - deg)/rad2deg)*80+100,
        }).appendTo(bars_master);
    }

    var colorBars = bars.find('.colorBar');
    var colorBars_master = bars_master.find('.colorBar_master');
    var numBars = 0, lastNum = -1;

    $('#control').knobKnob({
        snap : 10,
        value: 180,
        turn : function(ratio){
            numBars = Math.round(colorBars.length*ratio);

            // Update the dom only when the number of active bars
            // changes, instead of on every move

            if(numBars == lastNum){
                return false;
            }
            lastNum = numBars;
            // console.log(lastNum);
            colorBars.removeClass('active').slice(0, numBars).addClass('active');
        }
    });


});