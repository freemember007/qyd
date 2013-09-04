// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
//Alloy.Globals.login = Alloy.createController('login').getView();

var util = require("util");
var moment = require('alloy/moment');
// moment.lang('zh-cn');
(function(){
	moment.lang('zh-cn', {
		relativeTime: {
			future: "%s内",
			past: "%s前",
			s: "几秒",
			m: "1分钟",
			mm: "%d分钟",
			h: "1小时",
			hh: "%d小时",
			d: "1天",
			dd: "%d天",
			M: "1个月",
			MM: "%d个月",
			y: "1年",
			yy: "%d年"
		}
	});
})();

Alloy.Collections.feeds = Alloy.createCollection('feed');