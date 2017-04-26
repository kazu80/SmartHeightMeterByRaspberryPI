var usonic = require('r-pi-usonic');

// センサーの設定値
var sensorConfig = {
    echoPinGIPO:    17,
    triggerPinGPIO: 18,
    timeout:        1000
};

/**
 * センサー処理
 */

// センサーの初期設定
usonic.init(function (error) {
    if (error) {
        console.error(error)
    }
    else {
        var sensor = usonic.createSensor(
            sensorConfig.echoPinGIPO,
            sensorConfig.triggerPinGPIO,
            sensorConfig.timeout
        );

        console.log( "distance : " + sensor());
    }
});



