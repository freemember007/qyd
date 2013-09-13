$(document).ready(function(){
	// 以下不正确，不能用Ti的API，要用requireJS及其text插件
	// var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "partial.html");
	// var blob = file.read();
	// var contentText = blob.text;
	// // dispose of file handle & blob.
	// file = null;
	// blob = null;
	// var temp = doT.template('contentText');
	$('p').append("<b>Hello world!</b>");
});
