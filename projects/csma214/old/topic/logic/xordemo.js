// function to go from 'A' => '65' [it's ASCII code]
function str2dec(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        result += String(str.charCodeAt(i)).padStart(3, "0") + " ";
    }
    return result.trim();
}

// function to go from 'A' => '01000001' [binary ASCII]
function str2bin(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let byte = str.charCodeAt(i);
        for (let bit = 7; 0 <= bit; bit--) {
            if (byte & (1 << bit)) {
                result += "1";
            } else {
                result += "0";
            }
        }
    }
    return result;
}

// function to calculate the XOR of two strings
function xor(str1, str2) {
    let result = "";
    for (i = 0; i < str1.length; i++) {
        result += String.fromCharCode(str1.charCodeAt(i) ^ str2.charCodeAt(i));
    }
    return result;
}

$("#enc").on("click", function () {
    let input_str = $("#input_str").val();
    let key_str = $("#key_str").val();

    let output_str = xor(input_str, key_str);
    $("#output_str").val(btoa(output_str));
    // note: the output is base64 encode so that we can
    // easily copy and paste its content, even though
    // it it might contain values that aren't printable

    $("#input_dec").text(str2dec(input_str));
    $("#input_bin").text(str2bin(input_str));
    $("#key_dec").text(str2dec(key_str));
    $("#key_bin").text(str2bin(key_str));
    $("#output_dec").text(str2dec(output_str));
    $("#output_bin").text(str2bin(output_str));
});

$("#dec").on("click", function () {
    // on decode we again remove the base64
    // encoding
    let output_str = atob($("#output_str").val());
    let key_str = $("#key_str").val();

    let input_str = xor(output_str, key_str);
    $("#input_str").val(input_str);

    $("#input_dec").text(str2dec(input_str));
    $("#input_bin").text(str2bin(input_str));
    $("#key_dec").text(str2dec(key_str));
    $("#key_bin").text(str2bin(key_str));
    $("#output_dec").text(str2dec(output_str));
    $("#output_bin").text(str2bin(output_str));
});
