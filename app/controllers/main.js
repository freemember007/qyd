var url = 'https://api.weibo.com/2/statuses/friends_timeline.json?access_token=' + '2.00xudY2Bp7AtIDfb89a2306f0o2KP2&uids' + '&feature=1&count=100';
util.get(url, function(res) {
	var feeds = [];
	async.series([
		function(callback) {
			var data = JSON.parse(res).statuses;
			// Ti.API.log(data[0]);
			if(OS_ANDROID){util.notify("即将呈现...")};
			for (var i = 0; i < data.length; i++) {
				if(data[i].bmiddle_pic != null && data[i].bmiddle_pic.match(/jpg|png/) && !data[i].text.match(/早安|早上好|打卡|周一|周二|周三|周四|周五|周六|周日|周末|段子|晚安|早睡|早点睡|午安|午休|午安|带着微博去旅行|星座宝典|微群|模板|签到|正能量|预订|粉丝|微博|屏蔽|有奖|奖品|大奖|返利|注册|转发|评论|转让|微信/)){
					var feed = Alloy.createModel('feed', {
						image: data[i].bmiddle_pic,
						author: data[i].user.name,
						avatar: data[i].user.profile_image_url,
						content: data[i].text,
						created_at: moment(data[i].created_at).fromNow()
					});
					feeds.push(feed);
				};
			};
			callback(null, 'one');
		},
		function(callback) {
			Alloy.Collections.feeds.reset(feeds); //注意，不可用'add'，则否将促发N次视图渲染！
			callback(null, 'two');
		}
	],
	function(err, results) {
		$.main.open();
	});
});

function transformFunction(model) {
    var transform = model.toJSON();
	// var doT = require('doT.min')
	// var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "/webView/partial.html");
	// var blob = file.read();
	// var contentText = blob.text;
	// file = null;
	// blob = null;
	// var temp = doT.template(contentText);
	// alert(temp());
    transform.content = '<html><head><meta name="viewport" content="user-scalable=0"></head><body><div style="color: #fff; line-height: 150%">' + transform.content.replace(/http:\/\/t\.cn\/[a-zA-Z0-9]{4,7}/g, "<a style='color: #880000' href='$&' target='_blank'>$&</a>") + '</div></body></html>';
    return transform;
}

var descHide = false;
function toggleDesc(){
	var desc = $.scrollableView.views[$.scrollableView.currentPage].children[2];
	if(descHide == false){
		desc.hide();
		descHide = true;
	}else{
		desc.show();
		descHide = false;
	};
}

function hideActInd(){
	$.scrollableView.views[$.scrollableView.currentPage].children[0].hide()
}


$.main.addEventListener("close", function(){
    $.destroy();
});