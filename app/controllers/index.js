$.actInd.show();
$.index.open();
if (Ti.App.Properties.getString('token')==null||myDate.getTime()-Ti.App.Properties.getString('accessDate')>90*24*60*60000) {
	Alloy.createController('login');
} else {
	Alloy.createController('main');
};