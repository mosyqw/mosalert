/*
*******************************
* @copyright: moses.ilovenet.cn
* @brief: 自定义消息框，基于JQ
* @author: sile
*******************************
*/

(function(){
	//定义全局对象
	mosObj = {
		file : function(file){
			return file[file.length-1].src.substring(0,file[file.length-1].src.lastIndexOf("/")+1);
			}(document.scripts)
		};
	}());

function MosAlert(msg,type,callback){
	
	//只允许出现一个
	if($("#mos-alert").length > 0)return false;
	
	//生成消息框
	CreateAlert();
	
	function CreateAlert(){
		var outputArray = ["",'<a class="mos-sure" onClick="mosObj.DelAlert()">确认</a>'],
		html;
		
		//判断消息类型
		switch(type){
		case 0:
			outputArray[0] = '<th class="mos-img" style="background-image:url(' + mosObj.file + 'error.png);"></th>';
		;
		break;
		case 1:
			outputArray[0] = '<th class="mos-img" style="background-image:url(' + mosObj.file + 'yes.png)"></th>';
		;
		break;
		case 2:
			outputArray[0] = '<th class="mos-img" style="background-image:url(' + mosObj.file + 'warn.png);"></th>';
			outputArray[1] = '<a class="mos-sure-1" onClick="mosObj.DelAlert(true)">确定</a><a class="mos-cancel" onClick="mosObj.DelAlert(false)">取消</a>';
		;
		break;
		}
		
		//创建消息框
		html  = '<div id="mos-alert" mos-animation="show">';
		html += 	'<div id="mos-frame">';
		html += 		'<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>';
		html += 			outputArray[0];
		html += 			'<th>' + msg + '</th>';
		html += 		'</tr></table>';
		html += 		'<div class="mos-btn">';
		html += 			outputArray[1];
		html += 		'</div>';
		html += 	'</div>';
		html += '</div>';
		$("body").append(html);
		
		//设置mos-frame的margintop
		$("#mos-frame").css("margin-top",-$("#mos-frame").innerHeight()/2 + "px");
		
		//设置mos-animation="show"
		$("#mos-alert").attr("mos-animation","show");
	}
	
	if((typeof type) == "function")callback = type;
	mosObj.DelAlert = function(condition){
		//回调函数
		if((typeof callback) == "function")callback(condition);
		
		//设置mos-animation="hidden"
		$("#mos-alert").attr("mos-animation","hidden");
		
		//延时190ms清除
		setTimeout(function(){$("#mos-alert").remove();},190);
	}
}