$(document).ready(function () {
	var pages = {
		' ' : '首页',
		'fcraft.html' : '羁绊礼装表',
		'fcraft.html?no_pic' : '羁绊礼装表(无图版)',
		'np_cal.html' : 'NP计算器',
		'exp_cal.html' : '狗粮计算器',
		'drop_chance.html':'效率剧场'
	};
	var page = window.location.pathname + window.location.search;
	if (page.split('/')[2]) {
		page = page.split('/')[2];
		for (var i in pages) {
			if (page == i) {
				continue;
			}
			$("#title_link").append('<a href="' + './' + i + '">' + pages[i] + '</a>&nbsp;&nbsp;');
		}
	} else {
		for (var i in pages) {
			if (i == ' ') {
				continue;
			}
			$("#contents").append('<h3><a href="' + i + '">' + pages[i] + '</a></h3>');
		}
	}
});
