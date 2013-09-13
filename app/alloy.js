var util = require("util");
var async = require("async");
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

var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 639 || height > 959));
	var isios = osname === 'ipad' ||osname === 'iphone';
	var isiphone3 = osname === 'iphone' && height === 480;
	var isiphone4 = osname === 'iphone' && height > 480;
	var isold = osname === 'android' && (width > 240 && width < 400 || height > 480 && height < 600);
	var isout = osname === 'android' && (width < 241 || height < 481);
	Alloy.CFG.baseFont = isTablet ? 32 : isiphone3 ? 15 :  isiphone4 ? 32 : isold ? 16 : isout ? 12 : 24;
	Alloy.CFG.smallFont = isTablet ? 24 : isiphone3 ? 10 :  isiphone4 ? 12 : isold ? 6 : isout ? 8 : 16;
	Alloy.CFG.baseMargin = isTablet ? 10 :isiphone3 ? 3 : isiphone4 ? 6 : isold ? 3 : isout ? 2.5 :  5;