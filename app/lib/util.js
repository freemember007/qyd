exports.send = function(url, data, onload){
	var networkType = Ti.Network.getNetworkType();
	if(networkType == Ti.Network.NETWORK_NONE){
		Ti.UI.createAlertDialog({title:"提示", message:"网络连接异常，请检查。", ok:"确定"}).show();
		return;
	}
	var xhr = Titanium.Network.createHTTPClient();
	xhr.timeout = 30000;
    xhr.onload = function(e){
    	if (this.status != 200) {
	        alert(e);
	        alert(this.status);
	    }else{
    		onload(this.responseText);
	    }
    };
    xhr.onerror = function(e){
        alert(e.error);
    };
    xhr.open('POST', url);
    xhr.send(data);
};

exports.get = function(url, onload){
	var networkType = Ti.Network.getNetworkType();
	if(networkType == Ti.Network.NETWORK_NONE){
		Ti.UI.createAlertDialog({title:"提示", message:"网络连接异常，请检查。", ok:"确定"}).show();
		return;
	}
	var xhr = Titanium.Network.createHTTPClient();
    xhr.onload = function(e){
    	if (this.status != 200) {
	        alert(e);
	        alert(this.status);
	    }else{
    		onload(this.responseText);
	    }
    };
    xhr.onerror = function(e){
        alert(e.error);
    };
    xhr.open('GET', url);
    xhr.send();
};

exports.alert = function(message){
	Ti.UI.createAlertDialog({
		title: "提示",
		message: message,
		ok: "确定"
	}).show();
};

exports.notify = function(message){
	Ti.UI.createNotification({
		message: message,
		duration: Ti.UI.NOTIFICATION_DURATION_LONG
	}).show();
};
