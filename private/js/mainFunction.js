$(document).ready(function() {


    function calculateIEEE() {
        var number = parseInt($('#inputNumber').text())
        var result = new floatContext(number, 4, 5);
        console.log(result);
        $('#resultNumber').text(result.sign + "   " + result.exponent + "   " + result.mantissa);

    }

    function binary() {
        var number = parseFloat($('#inputNumber').text());
        console.log(number);
        $('#resultNumber').text(number.toString(2));
    }

    function octal() {
        var number = parseInt($('#inputNumber').text())
        $('#resultNumber').text(number.toString(8));
    }

    function hex() {
        var number = parseInt($('#inputNumber').text())

        $('#resultNumber').text(number.toString(16));
        console.log(number);
    }

    document.getElementById("ieee-decimal-submit").onclick = function() {
        calculateIEEE();
    }

    $('#toBinary-submit').on("click", function() {
        binary();
    })

    $('#toOctal-submit').on("click", function() {
        octal();
    })

    $('#toHex-submit').on("click", function() {
        hex();
    })
})