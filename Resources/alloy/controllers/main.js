function Controller() {
    function __alloyId16() {
        __alloyId16.opts || {};
        var models = __alloyId15.models;
        var len = models.length;
        var views = [];
        for (var i = 0; len > i; i++) {
            var __alloyId2 = models[i];
            __alloyId2.__transform = {};
            var __alloyId4 = Ti.UI.createView({
                views: __alloyId1
            });
            views.push(__alloyId4);
            var __alloyId6 = Alloy.createController("ActInd", {
                $model: __alloyId2,
                __parentSymbol: __alloyId4
            });
            __alloyId6.setParent(__alloyId4);
            var __alloyId8 = Ti.UI.createScrollView({});
            __alloyId4.add(__alloyId8);
            var __alloyId9 = Ti.UI.createImageView({
                width: 320,
                top: 0,
                preventDefaultImage: true,
                image: "undefined" != typeof __alloyId2.__transform["image"] ? __alloyId2.__transform["image"] : __alloyId2.get("image")
            });
            __alloyId8.add(__alloyId9);
            hideActInd ? __alloyId9.addEventListener("load", hideActInd) : __defers["__alloyId9!load!hideActInd"] = true;
            var __alloyId10 = Ti.UI.createView({
                bottom: 0,
                height: Titanium.UI.SIZE,
                backgroundColor: "#90000000"
            });
            __alloyId4.add(__alloyId10);
            var __alloyId11 = Ti.UI.createLabel({
                width: 320,
                bottom: 45,
                color: "#fff",
                zIndex: 2,
                text: "undefined" != typeof __alloyId2.__transform["content"] ? __alloyId2.__transform["content"] : __alloyId2.get("content")
            });
            __alloyId10.add(__alloyId11);
            var __alloyId12 = Ti.UI.createImageView({
                width: 30,
                height: 30,
                bottom: 4,
                left: 5,
                zIndex: 2,
                borderRadius: 15,
                preventDefaultImage: true,
                image: "undefined" != typeof __alloyId2.__transform["avatar"] ? __alloyId2.__transform["avatar"] : __alloyId2.get("avatar")
            });
            __alloyId10.add(__alloyId12);
            var __alloyId13 = Ti.UI.createLabel({
                height: 30,
                bottom: 4,
                left: 40,
                font: {
                    fontSize: 14
                },
                color: "#ccc",
                zIndex: 2,
                text: "undefined" != typeof __alloyId2.__transform["author"] ? __alloyId2.__transform["author"] : __alloyId2.get("author")
            });
            __alloyId10.add(__alloyId13);
            var __alloyId14 = Ti.UI.createLabel({
                height: 30,
                bottom: 4,
                right: 5,
                font: {
                    fontSize: 14
                },
                color: "#ccc",
                zIndex: 2,
                text: "undefined" != typeof __alloyId2.__transform["created_at"] ? __alloyId2.__transform["created_at"] : __alloyId2.get("created_at")
            });
            __alloyId10.add(__alloyId14);
        }
        $.__views.scrollableView.views = views;
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
        width: 330,
        showPagingControl: false,
        views: __alloyId1,
        id: "scrollableView"
    });
    $.__views.main.add($.__views.scrollableView);
    var __alloyId15 = Alloy.Collections["feeds"] || feeds;
    __alloyId15.on("fetch destroy change add remove reset", __alloyId16);
    toggleDesc ? $.__views.scrollableView.addEventListener("singletap", toggleDesc) : __defers["$.__views.scrollableView!singletap!toggleDesc"] = true;
    exports.destroy = function() {
        __alloyId15.off("fetch destroy change add remove reset", __alloyId16);
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
                created_at: moment(data[i].created_at).fromNow()
            });
            Alloy.Collections.feeds.add(feed);
        }
        $.main.open();
    });
    var descHide = false;
    __defers["__alloyId9!load!hideActInd"] && __alloyId9.addEventListener("load", hideActInd);
    __defers["$.__views.scrollableView!singletap!toggleDesc"] && $.__views.scrollableView.addEventListener("singletap", toggleDesc);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;