var info = new Array();
var sortStatus = {
	id : false,
	name : false,
	servant : false,
	servantID : false,
	"0-5" : false,
	"5-6" : false,
	"6-7" : false,
	"7-8" : false,
	"8-9" : false,
	"9-10" : false,
	total : false
};

$(document).ready(function () {
	$.getJSON("data/fcraft.json", function (data) {
		for (let i in data) {
			let row = {
				id : ("000" + data[i]["id"]).slice(-3),
				name : data[i].name,
				servantID : ("000" + data[i]["servantID"]).slice(-3),
				servant : data[i].servant,
				desc : data[i].desc
			};
			for (let j in data[i]["friendship"]) {
				row[j] = ("000000" + data[i]["friendship"][j] * 1000).slice(-6);
			}
			info.push(row);
		};
		sortStatus["servantID"] = true;
		createTableHead();
		createTableBody();
	});
});

function createTableBody() {
	$("#main_table").empty();
	var line = 1;
	for (let i in info) {
		let trSty = "";
		let tdSty = "";
		if ((line % 2) == 1) {
			trSty = ' class="odd"';
		}
		if (parseInt(info[i]["id"]) > process) {
			tdSty = ' class="unopened"';
		}
		let clink = 'href="http://fgowiki.com/guide/equipdetail/' + info[i]["id"] + '"';
		let slink = 'href="http://fgowiki.com/guide/petdetail/' + info[i]["servantID"] + '"';
		let tr = $('<tr' + trSty + '></tr>');
		let tds = '<td' + tdSty + '><a ' + clink + ' target="_blank">' + parseInt(info[i]["id"]) + '</a></td>';
		if (picFlag) {
			tds += '<td><a ' + clink + ' target="_blank"><img src="http://fgowiki.com/fgo/equip/' + info[i]["id"] + '.jpg" style="width:60px ;height:auto"></a></td>';
		}
		tds += '<td><a ' + clink + ' target="_blank">' + info[i]["name"] + '</a></td>';
		if (picFlag) {
			tds += '<td><a ' + slink + ' target="_blank"><img src="http://file.fgowiki.fgowiki.com/fgo/head/' + info[i]["servantID"] + '.jpg" style="width:60px ;height:auto"></a></td>';
		} else {
			tds += '<td><a ' + slink + ' target="_blank">' + parseInt(info[i]["servantID"]) + '</a></td>';
		}
		tds += '<td><a ' + slink + ' target="_blank">' + info[i]["servant"] + '</a></td>';
		tds += '<td>' + parseInt(info[i]["0-5"]) / 1000 + '</td>';
		tds += '<td>' + parseInt(info[i]["5-6"]) / 1000 + '</td>';
		tds += '<td>' + parseInt(info[i]["6-7"]) / 1000 + '</td>';
		tds += '<td>' + parseInt(info[i]["7-8"]) / 1000 + '</td>';
		tds += '<td>' + parseInt(info[i]["8-9"]) / 1000 + '</td>';
		tds += '<td>' + parseInt(info[i]["9-10"]) / 1000 + '</td>';
		tds += '<td>' + parseInt(info[i]["total"]) / 1000 + '</td>';
		tds += '<td style="text-align:left">' + info[i]["desc"] + '</td>';
		tr.append(tds);
		$("#main_table").append(tr);
		line++;
	}
}

function createTableHead() {
	var thd = $('<thead></thead>');
	var tr1 = $('<tr></tr>');
	var tr2 = $('<tr></tr>');
	var ths = '<th id="th_id" rowspan="2" class="clickable" onclick="sortTable(\'id\')">ID</th>';
	if (picFlag) {
		ths += '<th rowspan="2" class="clickable" onclick="sortTable(\'id\')">图标</th>';
	}
	ths += '<th rowspan="2" class="clickable" onclick="sortTable(\'name\')">礼装名称</th>';
	if (picFlag) {
		ths += '<th rowspan="2" class="clickable" onclick="sortTable(\'servantID\')">头像</th>';
	} else {
		ths += '<th rowspan="2" class="clickable" style="width:51px" onclick="sortTable(\'servantID\')">从者ID</th>';
	}
	ths += '<th rowspan="2" class="clickable" onclick="sortTable(\'servant\')">隶属从者</th>';
	ths += '<th colspan="7" class="clickable" onclick="sortTable(\'total\')">羁绊点数(万)</th>';
	ths += '<th rowspan="2" class="clickable" onclick="sortTable(\'desc\')">说明</th>';
	tr1.append(ths);
	thd.append(tr1);
	ths = '<th class="clickable" onclick="sortTable(\'0-5\')">0-5</th>';
	ths += '<th class="clickable" onclick="sortTable(\'5-6\')">5-6</th>';
	ths += '<th class="clickable" onclick="sortTable(\'6-7\')">6-7</th>';
	ths += '<th class="clickable" onclick="sortTable(\'7-8\')">7-8</th>';
	ths += '<th class="clickable" onclick="sortTable(\'8-9\')">8-9</th>';
	ths += '<th class="clickable" onclick="sortTable(\'9-10\')">9-10</th>';
	ths += '<th class="clickable" onclick="sortTable(\'total\')">总计</th>';
	tr2.append(ths);
	thd.append(tr2);
	$("#cft_table").append(thd);
	var tby = $('<tbody id="main_table"></tbody>');
	$("#cft_table").append(tby);
}

function sortTable(col) {
	if (sortStatus[col]) {
		for (let x in sortStatus) {
			sortStatus[x] = false;
		}
		info.sort(function (x, y) {
			return y[col].localeCompare(x[col]);
		});
	} else {
		for (let x in sortStatus) {
			sortStatus[x] = false;
		}
		sortStatus[col] = true;
		info.sort(function (x, y) {
			return x[col].localeCompare(y[col]);
		});
	}
	createTableBody();
}
