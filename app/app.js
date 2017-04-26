/**
 * 値の設定
 */
var port         = 3000; // socket.io 待受ポート番号
var intervalTime = 500;  // センサー値の送信タイマー間隔（単位はミリ秒）

var con    = null; // コネクション
var sensor = null; // センサー
var timer  = null; // センサー値の送信タイマー

var io     = require('socket.io')(port);
var usonic = require('r-pi-usonic');

// センサーの設定値
var sensorConfig = {
    echoPinGIPO:    17,
    triggerPinGPIO: 18,
    timeout:        1000
};

/**
 * センサー処理
 * コネクション処理
 */

// センサーの初期設定
usonic.init(function (error) {
    if (error) {
        console.error(error)
    }
    else {
        sensor = usonic.createSensor(
            sensorConfig.echoPinGIPO,
            sensorConfig.triggerPinGPIO,
            sensorConfig.timeout
        );
    }
});

// コネクション処理
io.on('connection', function (socket) {
    con = socket;

    // startメッセージを受けたらセンサーの値を、◯秒間隔で送信するタイマーを作成する
    socket.on('start', function (msg) {
        timer = setInterval(function () {
            con.emit("sensor", sensor());
        }, intervalTime);
    });

    // endメッセージを受けたら送信タイマーを停止する
    socket.on('end', function () {
        clearInterval(timer);
    });
});



