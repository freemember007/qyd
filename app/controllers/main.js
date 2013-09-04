var url = 'https://api.weibo.com/2/statuses/friends_timeline.json?access_token=' + '2.00xudY2Bp7AtIDfb89a2306f0o2KP2&uids' + '&feature=1&count=100';
util.get(url, function(res) {
	var data = JSON.parse(res).statuses;
	// Ti.API.log(data[0]);
	for (var i = 0; i < data.length; i++) {
		if(data[i].bmiddle_pic != null && data[i].bmiddle_pic.match(/jpg|png/)){
			var feed = Alloy.createModel('feed', {
				image: data[i].bmiddle_pic,
				author: data[i].user.name,
				avatar: data[i].user.profile_image_url,
				content: data[i].text,
				created_at: moment(data[i].created_at).fromNow()
			});
			Alloy.Collections.feeds.add(feed);
		};
	}
	$.main.open();
});

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