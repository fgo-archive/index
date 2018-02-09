var info = new Array();
var sortStatus = {
    id: false,
    name: false,
    servant: false,
    servantID: false,
    "rank0": false,
    "rank1": false,
    "rank2": false,
    "rank3": false,
    "rank4": false,
    "rank5": false,
    "rank6": false
};

$(document).ready(function() {
    var data = readJson("data/data.json", "fgoArchiveMainDataVer", "fgoArchiveMainData");
    $.each(data, function(i, inf) {
        if (inf.hasOwnProperty("friendship")) {
            var row = {
                id: numLenFormat(inf["friendship"]["id"], 3),
                name: inf["friendship"]["name"],
                servantID: numLenFormat(inf["id"], 3),
                servant: servantNamesDict[inf["svtId"]],
                desc: inf["friendship"]["desc"]
            };
            for (var j in inf["friendship"]["rank"]) {
                row["rank" + j] = numLenFormat(inf["friendship"]["rank"][j] * 1000, 6);
            }
            info.push(row);
        }
    });
    sortStatus["servantID"] = true;
    createTableHead();
    createTableBody();
});



function createTableBody() {
    $("#main_table").empty();
    var line = 1;
    for (var i in info) {
        var trSty = "";
        var tdSty = "";
        if ((line % 2) == 1) {
            trSty = ' class="odd"';
        }
        var clink = 'href="http://fgowiki.com/guide/equipdetail/' + info[i]["id"] + '"';
        var slink = 'href="http://fgowiki.com/guide/petdetail/' + info[i]["servantID"] + '"';
        var tr = $('<tr' + trSty + '></tr>');
        var tds = '<td' + tdSty + '><a ' + clink + ' target="_blank">' + parseInt(info[i]["id"]) + '</a></td>';
        if (picFlag) {
            tds += '<td><a ' + clink + ' target="_blank"><img src="' + getPicUrl("craft", info[i]["id"]) + '" style="width:60px ;height:auto"></a></td>';
        }
        tds += '<td><a ' + clink + ' target="_blank">' + info[i]["name"] + '</a></td>';
        if (picFlag) {
            tds += '<td><a ' + slink + ' target="_blank"><img src="' + getPicUrl("servant", info[i]["servantID"]) + '" style="width:60px ;height:auto"></a></td>';
        } else {
            tds += '<td><a ' + slink + ' target="_blank">' + parseInt(info[i]["servantID"]) + '</a></td>';
        }
        tds += '<td><a ' + slink + ' target="_blank">' + info[i]["servant"] + '</a></td>';
        for (var j = 0; j <= 6; j++) {
            tds += '<td>' + parseInt(info[i]["rank" + j]) / 1000 + '</td>';
        }
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
    ths += '<th colspan="7" class="clickable" onclick="sortTable(\'rank6\')">羁绊点数(万)</th>';
    ths += '<th rowspan="2" class="clickable" onclick="sortTable(\'desc\')">说明</th>';
    tr1.append(ths);
    thd.append(tr1);
    ths = '<th class="clickable" onclick="sortTable(\'rank0\')">0-5</th>';
    ths += '<th class="clickable" onclick="sortTable(\'rank1\')">5-6</th>';
    ths += '<th class="clickable" onclick="sortTable(\'rank2\')">6-7</th>';
    ths += '<th class="clickable" onclick="sortTable(\'rank3\')">7-8</th>';
    ths += '<th class="clickable" onclick="sortTable(\'rank4\')">8-9</th>';
    ths += '<th class="clickable" onclick="sortTable(\'rank5\')">9-10</th>';
    ths += '<th class="clickable" onclick="sortTable(\'rank6\')">总计</th>';
    tr2.append(ths);
    thd.append(tr2);
    $("#cft_table").append(thd);
    var tby = $('<tbody id="main_table"></tbody>');
    $("#cft_table").append(tby);
}

function sortTable(col) {
    if (sortStatus[col]) {
        for (var x in sortStatus) {
            sortStatus[x] = false;
        }
        info.sort(function(x, y) {
            return y[col].localeCompare(x[col]);
        });
    } else {
        for (var x in sortStatus) {
            sortStatus[x] = false;
        }
        sortStatus[col] = true;
        info.sort(function(x, y) {
            return x[col].localeCompare(y[col]);
        });
    }
    createTableBody();
}
