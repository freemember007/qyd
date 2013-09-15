function Controller() {
    function __alloyId22() {
        __alloyId22.opts || {};
        var models = __alloyId21.models;
        var len = models.length;
        var views = [];
        for (var i = 0; len > i; i++) {
            var __alloyId2 = models[i];
            __alloyId2.__transform = transformFunction(__alloyId2);
            var __alloyId4 = Ti.UI.createView({
                views: __alloyId1
            });
            views.push(__alloyId4);
            var __alloyId6 = Alloy.createController("actInd", {
                $model: __alloyId2,
                __parentSymbol: __alloyId4
            });
            __alloyId6.setParent(__alloyId4);
            var __alloyId8 = Ti.UI.createScrollView({
                width: Ti.Platform.displayCaps.platformWidth,
                contentWidth: Ti.Platform.displayCaps.platformWidth
            });
            __alloyId4.add(__alloyId8);
            var __alloyId10 = Ti.UI.createImageView({
                width: Ti.Platform.displayCaps.platformWidth,
                height: "auto",
                top: 0,
                preventDefaultImage: true,
                image: "undefined" != typeof __alloyId2.__transform["image"] ? __alloyId2.__transform["image"] : __alloyId2.get("image")
            });
            __alloyId8.add(__alloyId10);
            hideActInd ? __alloyId10.addEventListener("load", hideActInd) : __defers["__alloyId10!load!hideActInd"] = true;
            toggleDesc ? __alloyId10.addEventListener("click", toggleDesc) : __defers["__alloyId10!click!toggleDesc"] = true;
            var __alloyId12 = Ti.UI.createView({
                bottom: 0,
                width: Ti.Platform.displayCaps.platformWidth,
                height: Ti.UI.SIZE,
                backgroundColor: "#90000000",
                zIndex: 2
            });
            __alloyId4.add(__alloyId12);
            var __alloyId14 = Ti.UI.createWebView({
                left: 10,
                right: 10,
                bottom: 50,
                height: Ti.UI.SIZE,
                backgroundColor: "transparent",
                enableZoomControls: false,
                html: "undefined" != typeof __alloyId2.__transform["content"] ? __alloyId2.__transform["content"] : __alloyId2.get("content")
            });
            __alloyId12.add(__alloyId14);
            var __alloyId16 = Ti.UI.createImageView({
                width: 30,
                height: 30,
                bottom: 5,
                left: 10,
                borderRadius: 15,
                preventDefaultImage: true,
                image: "undefined" != typeof __alloyId2.__transform["avatar"] ? __alloyId2.__transform["avatar"] : __alloyId2.get("avatar")
            });
            __alloyId12.add(__alloyId16);
            var __alloyId18 = Ti.UI.createLabel({
                height: 30,
                bottom: 5,
                left: 50,
                font: {
                    fontSize: Alloy.CFG.smallFont
                },
                color: "#ccc",
                text: "undefined" != typeof __alloyId2.__transform["author"] ? __alloyId2.__transform["author"] : __alloyId2.get("author")
            });
            __alloyId12.add(__alloyId18);
            var __alloyId20 = Ti.UI.createLabel({
                height: 30,
                bottom: 5,
                right: 10,
                font: {
                    fontSize: Alloy.CFG.smallFont
                },
                color: "#ccc",
                text: "undefined" != typeof __alloyId2.__transform["created_at"] ? __alloyId2.__transform["created_at"] : __alloyId2.get("created_at")
            });
            __alloyId12.add(__alloyId20);
        }
        $.__views.scrollableView.views = views;
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.content = '<!DOCTYPE html><html"><head><meta name="viewport" content="width=device-width, user-scalable=no"></head><body><div style="color: #fff; line-height: 150%; font-size:15px">' + transform.content.replace(/http:\/\/t\.cn\/[a-zA-Z0-9]{4,7}/g, "<a style='color: #880000' href='$&' target='_blank'>$&</a>") + "</div></body></html>";
        return transform;
    }
    function toggleDesc() {
        var desc = $.scrollableView.views[$.scrollableView.currentPage].children[2];
        if (false == descHide) {
            desc.hide();
            descHide = true;
        } else {
            desc.show();
            descHide = false;
        }
    }
    function hideActInd() {
        $.scrollableView.views[$.scrollableView.currentPage].children[0].hide();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.main = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    var __alloyId1 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView({
        width: "103%",
        showPagingControl: false,
        views: __alloyId1,
        id: "scrollableView"
    });
    $.__views.main.add($.__views.scrollableView);
    var __alloyId21 = Alloy.Collections["feeds"] || feeds;
    __alloyId21.on("fetch destroy change add remove reset", __alloyId22);
    exports.destroy = function() {
        __alloyId21.off("fetch destroy change add remove reset", __alloyId22);
    };
    _.extend($, $.__views);
    var url = "https://api.weibo.com/2/statuses/friends_timeline.json?access_token=2.00xudY2Bp7AtIDfb89a2306f0o2KP2&uids&feature=1&count=100";
    util.get(url, function(res) {
        var feeds = [];
        async.series([ function(callback) {
            var data = JSON.parse(res).statuses;
            for (var i = 0; data.length > i; i++) if (null != data[i].bmiddle_pic && data[i].bmiddle_pic.match(/jpg|png/) && !data[i].text.match(/早安|早上好|打卡|周一|周二|周三|周四|周五|周六|周日|周末|段子|晚安|早睡|早点睡|午安|午休|午安|带着微博去旅行|星座宝典|微群|模板|签到|正能量|预订|粉丝|微博|屏蔽|有奖|奖品|大奖|返利|注册|转发|评论|转让|微信/)) {
                var feed = Alloy.createModel("feed", {
                    image: data[i].bmiddle_pic,
                    author: data[i].user.name,
                    avatar: data[i].user.profile_image_url,
                    content: data[i].text,
                    created_at: moment(data[i].created_at).fromNow()
                });
                feeds.push(feed);
            }
            callback(null, "one");
        }, function(callback) {
            Alloy.Collections.feeds.reset(feeds);
            callback(null, "two");
        } ], function() {
            $.main.open();
        });
    });
    var descHide = false;
    $.main.addEventListener("close", function() {
        $.destroy();
    });
    __defers["__alloyId10!load!hideActInd"] && __alloyId10.addEventListener("load", hideActInd);
    __defers["__alloyId10!click!toggleDesc"] && __alloyId10.addEventListener("click", toggleDesc);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;