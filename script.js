const color_map = {
    "sostantivo": "blurple",
    "aggettivo": "coral",
    "verbo": "green",
    "avverbio": "magenta",
    "colore": "white",
    "esclamazione": "red"
};

const input = `
<div class="textbox-wrapper">
<input type="text" class="textbox" value="$2">
<select class="textbox-dropdown">
$1
</select>
</div>
`;

$("#done").on("click", function() {
    $("textarea.text").css("display", "none");
    $(this).css("display", "none");
    $("div.text").css("display", "block");

    let text = $("textarea.text").val().replaceAll(/([\wàèéìòù']+)/gm, "<span>$1</span>");
    $("div.text").html(text);
    
    $(".text > span").on("click", function() {
        let options = "";
        Object.keys(color_map).forEach(i => options += `<option>${i.toUpperCase()}</option>`);
        $(this).replaceWith(input.replace("$1", options).replace("$2", $(this).html()));

        $(".textbox").each(function() {
            adjustTextbox(this);
        });
        
        $(".textbox-dropdown").on("change", function() {
            let value = $("option:selected", this)[0].value.toLowerCase();
            $(".textbox-wrapper").eq($(this).index(".textbox-dropdown")).css("--tbcolor", `var(--${color_map[value]})`);
        });

        $(".textbox").on("input", function() {
            adjustTextbox(this);
        });
    });
});

function adjustTextbox(tb) {
    $(tb).css("width", "0px");
    $(tb).css("width", Math.max(100, $(tb)[0].scrollWidth) + "px");
}