$(document).ready(function() {

    function calculateIEEE() {
        var number = document.getElementById("ieee-decimal-input").value;
        var result = new floatContext(number, 4, 5);
        console.log(result);
    }
    
    document.getElementById("ieee-decimal-submit").onclick = function() {
        calculateIEEE();
    }
})
