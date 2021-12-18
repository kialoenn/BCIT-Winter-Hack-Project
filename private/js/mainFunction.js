$(document).ready(function() {
    function calculateIEEE() {
        var decimal = document.getElementById("ieee-decimal-input").value;
        console.log(decimal);
    }
    
    document.getElementById("ieee-decimal-submit").onclick = function() {
        calculateIEEE();
    }
})
