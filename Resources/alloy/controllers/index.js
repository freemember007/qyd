function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "default.png",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.actInd = Ti.UI.createActivityIndicator({
        id: "actInd"
    });
    $.__views.index.add($.__views.actInd);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.actInd.show();
    $.index.open();
    null == Ti.App.Properties.getString("token") || myDate.getTime() - Ti.App.Properties.getString("accessDate") > 7776e6 ? Alloy.createController("login") : Alloy.createController("main");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;