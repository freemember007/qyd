function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.webView = Ti.UI.createWebView({
        loading: true,
        scalesPageToFit: true,
        id: "webView",
        url: "https://api.weibo.com/oauth2/authorize?client_id=2879718887&response_type=token&redirect_uri=https://api.weibo.com/oauth2/default.html&display=mobile"
    });
    $.__views.login.add($.__views.webView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.login.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;