$(document).ready(function() {
    if (window.location.search == "") {
        createItemList();
    } else {
        createItemReqInf();
    }
});

function createItemList() {
    var itemList = [];
    for (var i in itemsDict) {
        if (i >= 6000 && i <= 8000) {
            itemList.push(i);
        }
    }
    itemList.sort();
    var u = $("<ul></ul>");
    u.attr("class", "display");
    for (var i in itemList) {
        var liStr = '<li><a href="item.html?' + itemList[i] + '"><img src="' + getPicUrl("item", itemList[i]) + '" /></a></li>';
        u.append(liStr);
    }
    $("#main").append(u);
}

function createItemReqInf() {
    var limitNum = 0;
    var skillNum = 0;
    var totalList = [];
    var itemId = window.location.search.match(/\d+/g)[0];
    if (itemId >= 8000 || !itemsDict[itemId]) {
        window.location.href = "item.html";
        return;
    }
    document.title = itemsDict[itemId];
	try {
		createItemDropInf(itemId);
	} catch (e) {
		console.log(e);
	}
    var data = readJson("data/data.json", "fgoArchiveMainDataVer", "fgoArchiveMainData");
    $.each(data, function(i, info) {
        if (info.id > 0) {
            var singleLmtNum = 0;
            var singleSklNum = 0;
            var single = [];
            $.each(info.limitItems, function(j, items) {
                $.each(items, function(k, item) {
                    if (item[0] == itemId) {
                        limitNum += item[1];
                        singleLmtNum += item[1];
                    }
                });
            });
            $.each(info.skillItems, function(j, items) {
                $.each(items, function(k, item) {
                    if (item[0] == itemId) {
                        skillNum += (item[1] * 3);
                        singleSklNum += item[1];
                    }
                });
            });
            if (singleLmtNum > 0 || singleSklNum > 0) {
                single.push(info.id, singleLmtNum, singleSklNum * 3);
                totalList.push(single);
            }
        }
    });
    createItemReqList(totalList, limitNum, skillNum);

}

function createItemReqList(totalList, limitNum, skillNum) {
    var t = $("<table></table>");
    t.attr("class", "no_side_border");
    if (limitNum > 0) {
        var tr = $("<tr></tr>");
        tr.append("<td style='width:100px;padding-top:25px'>突破总共需要素材：" + limitNum + "</td>");
        var td = $("<td></td>");
        var ul = $("<ul></ul>");
        for (var i in totalList) {
            if (totalList[i][1] > 0) {
                var li = $("<li></li>");
                var pic_div = $("<div></div>");
                var num_div = $("<div></div>");
                pic_div.attr("class", "bg_pic");
                num_div.attr("class", "float_num");
                pic_div.append("<a href='servant.html?" + totalList[i][0] + "'><img src='" + getPicUrl("servant", totalList[i][0]) + "'></a>");
                num_div.append("<a href='servant.html?" + totalList[i][0] + "'>" + totalList[i][1] + "</a>");
                pic_div.append(num_div);
                li.append(pic_div);
                ul.append(li);
            }
        }
        td.append(ul);
        tr.append(td);
        t.append(tr);
    }
    if (skillNum > 0) {
        var tr = $("<tr></tr>");
        tr.append("<td style='width:100px;padding-top:25px'>技能总共需要素材：" + skillNum + "</td>");
        var td = $("<td></td>");
        var ul = $("<ul></ul>");
        for (var i in totalList) {
            if (totalList[i][2] > 0) {
                var li = $("<li></li>");
                var pic_div = $("<div></div>");
                var num_div = $("<div></div>");
                pic_div.attr("class", "bg_pic");
                num_div.attr("class", "float_num");
                pic_div.append("<a href='servant.html?" + totalList[i][0] + "'><img src='" + getPicUrl("servant", totalList[i][0]) + "'></a>");
                num_div.append(totalList[i][2]);
                pic_div.append(num_div);
                li.append(pic_div);
                ul.append(li);
            }
        }
        td.append(ul);
        tr.append(td);
        t.append(tr);
    }
    $("#main").append(t);
}

function createItemDropInf(itemId) {
    var data = readJson("data/drop_chance.json", "fgoArchiveDropDataVer", "fgoArchiveDropData")[itemId];
    var tb = $("<table></table>");
    tb.attr("style", "margin:10px 10px;");
    tb.attr("class", "no_side_border");
    var tr = $("<tr></tr>");
    var td = $("<td></td>");
    td.attr("rowspan", data.ApEfficiency.length + 1);
    td.attr("style", "width:140px;");
    td.append("<img src='" + getPicUrl("item", itemId) + "'</>");
    td.append("<p>数据来自效率剧场<br/>更新日期：<br/>2018-1-3</p>");
    tr.append(td);
    tr.append("<td class='right_border'>AP效率Top" + data.ApEfficiency.length + "</td><td class='right_border'>平均AP</td><td class='right_border'>样本数</td><td class='right_border'>掉率Top" + data.ApEfficiency.length + "</td><td class='right_border'>掉率</td><td>样本数</td>");
    tb.append(tr);
    for (var i in data.ApEfficiency) {
        tb.append("<tr><td class='right_border'>" + data.ApEfficiency[i][0] + "</td><td class='right_border'>" + data.ApEfficiency[i][3] + "AP/个</td><td class='right_border'>" + data.ApEfficiency[i][2] + "</td><td class='right_border'>" + data.dropChance[i][0] + "</td><td class='right_border'>" + data.dropChance[i][3] + "%</td><td>" + data.dropChance[i][2] + "</td></tr>");
    }
    tb.append("<tr><td colspan='7'><a href='http://bbs.nga.cn/read.php?tid=12346005' target='_blank'>国服掉落解包数据及关卡配置</a></td></tr>");
    $("#main").append(tb);
}
