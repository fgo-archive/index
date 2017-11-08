var data;
$(document).ready(function() {
    data = readJson("data/data.json", "fgoArchiveMainDataVer", "fgoArchiveMainData");
    if (window.location.search == "") {
        createServantList();
    } else {
        createServantInf();
    }
});

function createServantList() {
    var servantList = [];
    for (var i in data) {
        if (data[i].id > 0) {
            servantList.push(data[i].id);
        }
    }
    var u = $("<ul></ul>");
    u.attr("class", "display");
    for (var i in servantList) {
        var liStr = '<li><a href="servant.html?' + servantList[i] + '"><img src="' + getPicUrl("servant", servantList[i]) + '" /></a></li>';
        u.append(liStr);
    }
    $("#main").append(u);
}

function createServantInf() {
    var servantId = window.location.search.match(/\d+/g)[0];
    var id = 0;
    $.each(data, function(i, info) {
        if (info.id == servantId) {
            id = info.id;
            createPage(info);
            return false;
        }
    });
    if (id == 0) {
        window.location.href = "servant.html";
    }
}

function createPage(data) {
    document.title = servantNamesDict[data.svtId];
    $("#main").append('<div style="margin-top:30px"><img src="' + getPicUrl("servant", data.id) + '"/></div>');
    var tb = $("<table></table>");
    tb.attr("id", "require");
    tb.append("<tr><td colspan='2'>灵基再临</td></tr>");
    for (var i = 1; i <= 4; i++) {
        tb.append("<tr><td>第" + i + "阶段</td><td></td></tr>");
    }
    tb.append("<tr><td colspan='2'>技能升级</td></tr>");
    for (var i = 1; i <= 9; i++) {
        tb.append("<tr><td>Lv" + i + " → Lv" + (i + 1) + "</td><td></td></tr>");
    }
    $("#main").append(tb);
    setTableVal(data);
}

function setTableVal(data) {
    $.each(data.limitItems, function(i, period) {
        $.each(period, function(j, items) {
            var e_li = $("<li></li>");
            e_li.attr("class", "require_item");
            e_li.append("<a href='item.html?" + items[0] + "'><img src='" + getPicUrl("item", items[0]) + "'/></a>");
            e_li.append(((items[1].toString().length) < 2 ? "&nbsp; × &nbsp;" : " × ")  + items[1]);
            $("#require").find("tr").eq(i + 1).find("td").eq(1).append(e_li);
        });
    });
    $.each(data.limitQPs, function(i, qp) {
        var e_li = $("<li></li>");
        e_li.attr("class", "require_item");
        e_li.append("<img src='resources/others/QP.png'/>");
        e_li.append(" × " + numSeparator(qp, 4));
        $("#require").find("tr").eq(i + 1).find("td").eq(1).append(e_li);
    });
    $.each(data.skillItems, function(i, period) {
        $.each(period, function(j, items) {
            var e_li = $("<li></li>");
            e_li.attr("class", "require_item");
            e_li.append("<a href='item.html?" + items[0] + "'><img src='" + getPicUrl("item", items[0]) + "'/></a>");
            e_li.append(((items[1].toString().length) < 2 ? "&nbsp; × &nbsp;" : " × ") + items[1]);
            $("#require").find("tr").eq(i + 6).find("td").eq(1).append(e_li);
        });
    });
    $.each(data.skillQPs, function(i, qp) {
        var e_li = $("<li></li>");
        e_li.attr("class", "require_item");
        e_li.append("<img src='resources/others/QP.png'/>");
        e_li.append(" × " + numSeparator(qp, 4));
        $("#require").find("tr").eq(i + 6).find("td").eq(1).append(e_li);
    });
}
