const api_url = config.key_url;
const client_id = config.id;
const client_secret = config.secret;

document.getElementById("src_sen")
    .addEventListener("keyup", function(e) {
        if (e.code === 'Enter') {
            document.getElementById("TransSubmit").click();
        }
});

const submitBtn = document.getElementById("TransSubmit");
submitBtn.addEventListener("click", Translate);

// 외부 영역 클릭 시 팝업 닫기
$(document).mouseup(function (e){
	if($(".layer_pop").has(e.target).length === 0){
		$(".layer_pop").hide();
	}
});

function Translate() {
    let source = document.getElementById("src_lang").value;
    let target = document.getElementById("target_lang").value;
    let text = document.getElementById("src_sen").value;

    $.ajax({
        url: api_url,
        type: "POST",
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret},
        dataType: "JSON",
        data : {
            "source" : source,
            "target" : target,
            "text" : text
        },
        success: function(msg) {
            const result = msg.message.result.translatedText
            $("#translated_sen").val(result)
        },
        error : function(error) {
            console.log(error);
        }
    });
}