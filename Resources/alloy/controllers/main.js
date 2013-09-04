function Controller() {
    function __alloyId12() {
        __alloyId12.opts || {};
        var models = __alloyId11.models;
        var len = models.length;
        var views = [];
        for (var i = 0; len > i; i++) {
            var __alloyId2 = models[i];
            __alloyId2.__transform = {};
            var __alloyId4 = Ti.UI.createScrollView({
                views: __alloyId1
            });
            views.push(__alloyId4);
            var __alloyId6 = Ti.UI.createImageView({
                width: 320,
                top: 0,
                image: "undefined" != typeof __alloyId2.__transform["image"] ? __alloyId2.__transform["image"] : __alloyId2.get("image")
            });
            __alloyId4.add(__alloyId6);
            var __alloyId8 = Ti.UI.createLabel({
                width: 320,
                bottom: 0,
                color: "#fff",
                zIndex: 2,
                text: "undefined" != typeof __alloyId2.__transform["content"] ? __alloyId2.__transform["content"] : __alloyId2.get("content")
            });
            __alloyId4.add(__alloyId8);
            var __alloyId10 = Ti.UI.createLabel({
                text: "undefined" != typeof __alloyId2.__transform["author"] ? __alloyId2.__transform["author"] : __alloyId2.get("author")
            });
            __alloyId4.add(__alloyId10);
        }
        $.__views.scrollableView.views = views;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.main = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    var __alloyId1 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView({
        width: 330,
        showPagingControl: false,
        views: __alloyId1,
        id: "scrollableView"
    });
    $.__views.main.add($.__views.scrollableView);
    var __alloyId11 = Alloy.Collections["feeds"] || feeds;
    __alloyId11.on("fetch destroy change add remove reset", __alloyId12);
    exports.destroy = function() {
        __alloyId11.off("fetch destroy change add remove reset", __alloyId12);
    };
    _.extend($, $.__views);
    var url = "https://api.weibo.com/2/statuses/friends_timeline.json?access_token=2.00xudY2Bp7AtIDfb89a2306f0o2KP2&uids&feature=1&count=100";
    util.get(url, function(res) {
        var data = JSON.parse(res).statuses;
        for (var i = 0; data.length > i; i++) if (null != data[i].bmiddle_pic && data[i].bmiddle_pic.match(/jpg|png/)) {
            var feed = Alloy.createModel("feed", {
                image: data[i].bmiddle_pic,
                author: data[i].user.name,
                avatar: data[i].user.profile_image_url,
                content: data[i].text,
                created_at: data[i].created_at
            });
            Alloy.Collections.feeds.add(feed);
        }
        $.main.open();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;