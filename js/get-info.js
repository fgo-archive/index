function removeItems() {
    document.getElementById("button_area").remove();
}

function friendship() {
    sortByElmentNo(master.mstSvt);
    var str = "[<br/>";
    for (var x in master.mstSvt) {
        if ((master.mstSvt[x].type == 1 || master.mstSvt[x].type == 2 || master.mstSvt[x].type == 99) && master.mstSvt[x].collectionNo > 1) {
            var tid = findSvtFs(master.mstSvt[x].id);
            var n = [];
            var m = [];
            var id = 0;
            var name = "";
            for (var a in master.mstFriendship) {
                if (master.mstFriendship[a].id == tid && master.mstFriendship[a].rank < 10) {
                    n[master.mstFriendship[a].rank] = master.mstFriendship[a].friendship;
                }
            }
            for (var a in bondCE) {
                if (bondCE[a][1] == master.mstSvt[x].id) {
                    for (var b in master.mstSvt) {
                        if (master.mstSvt[b].id == bondCE[a][0]) {
                            id = master.mstSvt[b].collectionNo;
                            name = master.mstSvt[b].name;
                            break;
                        }
                    }
                    break;
                }
            }

            m[0] = n[4] / 10000;
            for (var i = 5; i < 10; i++) {
                m[i - 4] = (n[i] - n[i - 1]) / 10000;
            }
            m[6] = n[9] / 10000;
            str += "&nbsp;&nbsp;&nbsp;&nbsp;{<br/>";
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "' + id + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "' + name + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"servantID": "' + master.mstSvt[x].collectionNo + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"servant": "' + findSvtNameZh(master.mstSvt[x].id) + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"friendship": {<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"0-5": "' + m[0] + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"5-6": "' + m[1] + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"6-7": "' + m[2] + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"7-8": "' + m[3] + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"8-9": "' + m[4] + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"9-10": "' + m[5] + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"total": "' + m[6] + '"<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"desc": "unknown"<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;},<br/>';
        }
    }
    str = str.substring(0, str.length - 6);
    str += "<br/>]";
    removeItems();
    document.getElementById("info").innerHTML = str;
}

function friendship2() {
    sortByElmentNo(master.mstSvt);
    var tbStr = $("<table></table>");
    var trStr = $("<tr></tr>");
    var thStr = $("<td>id</td><td>名字</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td>");
    trStr.append(thStr);
    tbStr.append(trStr);
    for (var x in master.mstSvt) {
        if ((master.mstSvt[x].type == 1 || master.mstSvt[x].type == 2 || master.mstSvt[x].type == 99) && master.mstSvt[x].collectionNo > 1) {
            var q = findSvtFs(master.mstSvt[x].id);
            var n = [];
            var m = [];
            for (var a in master.mstFriendship) {
                if (master.mstFriendship[a].id == q && 10 > master.mstFriendship[a].rank) {
                    n[master.mstFriendship[a].rank] = master.mstFriendship[a].friendship;
                }
            }
            trStr = $("<tr></tr>");
            var tdStr = '<td>' + master.mstSvt[x].collectionNo + '</td>';
            tdStr += '<td>' + findSvtNameZh(master.mstSvt[x].id) + '</td>';
            for (var i = 4; i < 10; i++) {
                tdStr += '<td>' + n[i] / 10000 + '</td>';
            }
            trStr.append(tdStr);
            tbStr.append(trStr);
        }
    }
    $("#info").empty();
    $("#info").append(tbStr);
    removeItems();
}

function nphit() {
    sortByElmentNo(master.mstSvt);
    var str = "[<br/>";
    for (var x in master.mstSvt) {
        if ((master.mstSvt[x].type == 1 || master.mstSvt[x].type == 2 || master.mstSvt[x].type == 99) && master.mstSvt[x].collectionNo > 0) {
            var npCard = "";
            var i = 0,
                j = 0;
            var desc = "";
            var hits = 0;
            for (var y in master.mstSvtTreasureDevice) {
                if (master.mstSvtTreasureDevice[y].svtId == master.mstSvt[x].id && master.mstSvtTreasureDevice[y].treasureDeviceId != 100 && master.mstSvtTreasureDevice[y].num < 10) {
                    npCard = cardColorsDict[master.mstSvtTreasureDevice[y].cardId];
                    i = master.mstSvt[x].id;
                    j = master.mstSvtTreasureDevice[y].treasureDeviceId;
                    hits = master.mstSvtTreasureDevice[y].damage.length;
                    break;
                }
            }
            for (var z in tdDetail) {
                if (tdDetail[z][0] == j) {
                    desc = tdDetail[z][1];
                    if (desc.search(/攻擊[^力]|攻撃[^力]/) == -1) {
                        hits = 0;
                    }
                    break;
                }
            }
            str += "&nbsp;&nbsp;&nbsp;&nbsp;{<br/>";
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "' + master.mstSvt[x].collectionNo + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "' + findSvtNameZh(master.mstSvt[x].id) + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"npHits": "' + hits + '",<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"npCard": "' + npCard + '"<br/>';
            str += '&nbsp;&nbsp;&nbsp;&nbsp;},<br/>';
        }
    }
    str = str.substring(0, str.length - 6);
    str += "<br/>]";
    removeItems();
    document.getElementById("info").innerHTML = str;
}

function hitDamageValue(){
	var tbStr = $("<table></table>");
    var trStr = $("<tr></tr>");
    var thStr = $("<td rowspan='2'>id</td><td rowspan='2'>名字</td><td colspan='2'>Buster</td><td colspan='2'>Arts</td><td colspan='2'>Quick</td><td colspan='2'>Extra</td><td colspan='2'>宝具</td>");
	trStr.append(thStr);
    tbStr.append(trStr);
	tbStr.append("<tr><td>hits</td><td>伤害分布</td><td>hits</td><td>伤害分布</td><td>hits</td><td>伤害分布</td><td>hits</td><td>伤害分布</td><td>hits</td><td>伤害分布</td></tr>");
	var data = readJson("data/data.json", "fgoArchiveMainDataVer", "fgoArchiveMainData");
	$.each(data, function(i, servant) {
        if (servant.id > 0) {
			var trs = $("<tr></tr>");
            var tds = "<td>" + servant.id + "</td>";
			tds += "<td>" + "【" + classNamesDict[servant["class"]] + "】 "+ servantNamesDict[servant.svtId] + "</td>";
			tds += "<td>" + servant.card.Buster.hits + "</td>";
			tds += "<td>" + servant.card.Buster.damage + "</td>";
			tds += "<td>" + servant.card.Arts.hits + "</td>";
			tds += "<td>" + servant.card.Arts.damage + "</td>";
			tds += "<td>" + servant.card.Quick.hits + "</td>";
			tds += "<td>" + servant.card.Quick.damage + "</td>";
			tds += "<td>" + servant.card.EX.hits + "</td>";
			tds += "<td>" + servant.card.EX.damage + "</td>";
			if(servant.noblePhantasm[0].hits == 0)
			{
				tds += "<td>0</td><td>0</td>";
			}
			else{
				tds += "<td>" + servant.noblePhantasm[0].hits + "</td>";
				tds += "<td>" + servant.noblePhantasm[0].damage + "</td>";
			}
			trs.append(tds);
			tbStr.append(trs);
        }
    });
	
	$("#info").empty();
    $("#info").append(tbStr);
    removeItems();
}

function detail_info() {
    sortByElmentNo(master.mstSvt);
    var lists = [];
    for (var x in master.mstSvt) {
		let continueFlag = false;
		for (var z in servantsWhiteList) {
			if (servantsWhiteList[z] === master.mstSvt[x].id) {
				continueFlag = true;
				break;
			}
		}
		if (continueFlag) {
			continue;
		}
        if ((master.mstSvt[x].type == 1 || master.mstSvt[x].type == 2 || master.mstSvt[x].type == 99) && master.mstSvt[x].collectionNo >= 0) {	
            var inf = {
                "id": master.mstSvt[x].collectionNo,
                "svtId": master.mstSvt[x].id,
                //"name": servantNamesDict[master.mstSvt[x].id],
                //"nickName": servantNamesDict[master.mstSvt[x].id] + (servantnickNamesDict[master.mstSvt[x].id] ? ' ' + servantnickNamesDict[master.mstSvt[x].id] : ''),
                "class": master.mstSvt[x].classId,
                "rarity": 0,
                "gender": master.mstSvt[x].genderType,
                "attr": master.mstSvt[x].attri,
                "policy": 0,
                "personality": 0,
                "individuality": [],
                "atkBase": 0,
                "hpBase": 0,
                "atkMax": 0,
                "hpMax": 0,
                "starRate": master.mstSvt[x].starRate / 10,
                "deathRate": master.mstSvt[x].deathRate / 10,
                "criticalWeight": 0,
                "card": {},
                "passiveSkills": [],
                "skills": [],
                "noblePhantasm": [],
                "limitItems": [],
                "limitQPs": [],
                "skillItems": [],
                "skillQPs": [],
            };
			
            //
            var pos = 0;
            for (var i in master.mstSvtLimit) {
                if (master.mstSvtLimit[i].svtId == master.mstSvt[x].id) {
                    pos = i;
                    inf.criticalWeight = master.mstSvtLimit[i].criticalWeight;
                    inf.policy = master.mstSvtLimit[i].policy;
                    inf.personality = master.mstSvtLimit[i].personality;
                    break;
                }
            }
            for (var i in master.mstSvtLimit) {
                if (master.mstSvtLimit[i].svtId == master.mstSvt[x].id && master.mstSvtLimit[i].limitCount == master.mstSvt[x].limitMax) {
                    if (master.mstSvtLimit[pos].hpBase != master.mstSvtLimit[i].hpBase || master.mstSvtLimit[pos].hpMax != master.mstSvtLimit[i].hpMax) {
                        inf.hpBase = master.mstSvtLimit[i].hpBase;
                        inf.hpMax = master.mstSvtLimit[i].hpMax;
                    } else {
                        inf.hpBase = master.mstSvtLimit[pos].hpBase;
                        inf.hpMax = master.mstSvtLimit[pos].hpMax;
                    }
                    if (master.mstSvtLimit[pos].atkBase != master.mstSvtLimit[i].atkBase || master.mstSvtLimit[pos].atkMax != master.mstSvtLimit[i].atkMax) {
                        inf.atkBase = master.mstSvtLimit[i].atkBase;
                        inf.atkMax = master.mstSvtLimit[i].atkMax;
                    } else {
                        inf.atkBase = master.mstSvtLimit[pos].atkBase;
                        inf.atkMax = master.mstSvtLimit[pos].atkMax;
                    }
                    inf.rarity = master.mstSvtLimit[i].rarity;
                    break;
                }
            }
            //特性
            for (var i in master.mstSvt[x].individuality) {
                if (individualityDict[master.mstSvt[x].individuality[i]]) {
                    inf.individuality.push(master.mstSvt[x].individuality[i]);
                }
            }

            //羁绊
            if (master.mstSvt[x].collectionNo > 1) {
                var tid = findSvtFs(master.mstSvt[x].id);
                var n = [];
                var m = [];
                var craftCollectionNo = 0;
                for (var j in master.mstFriendship) {
                    if (master.mstFriendship[j].id == tid && master.mstFriendship[j].rank < 10) {
                        n[master.mstFriendship[j].rank] = master.mstFriendship[j].friendship;
                    }
                }
                for (var j in bondCE) {
                    if (bondCE[j][1] == master.mstSvt[x].id) {
                        for (var k in master.mstSvt) {
                            if (master.mstSvt[k].id == bondCE[j][0]) {
                                craftCollectionNo = master.mstSvt[k].collectionNo;
                                break;
                            }
                        }
                        break;
                    }
                }
                m.push(n[4] / 10000);
                for (var i = 5; i < 10; i++) {
                    m.push((n[i] - n[i - 1]) / 10000);
                }
                m.push(n[9] / 10000);
                var t = {
                    id: craftCollectionNo,
                    name: "",
                    rank: m,
                    desc: ""
                };
                inf["friendship"] = t;
            }

            //配卡
            var rawCardNp = [];
            for (var i in master.mstSvtTreasureDevice) {
                if (master.mstSvtTreasureDevice[i].svtId == master.mstSvt[x].id && 100 != master.mstSvtTreasureDevice[i].treasureDeviceId) {
                    for (var j in master.mstTreasureDeviceLv) {
                        if (master.mstTreasureDeviceLv[j].treaureDeviceId == master.mstSvtTreasureDevice[i].treasureDeviceId) {
                            var t = [];
                            t.push(master.mstTreasureDeviceLv[j].tdPointA / 100);
                            t.push(master.mstTreasureDeviceLv[j].tdPointB / 100);
                            t.push(master.mstTreasureDeviceLv[j].tdPointQ / 100);
                            t.push(master.mstTreasureDeviceLv[j].tdPointEx / 100);
                            t.push(master.mstTreasureDeviceLv[j].tdPoint / 100);
                            rawCardNp.push(t);
                            break;
                        }
                    }
                }
            }
            var transCardNp = [];
            var cardNp = [];
            for (var i = 0; i < 5; i++) {
                transCardNp[i] = new Set();
                cardNp[i] = [];
            }
            for (var i in rawCardNp) {
                for (var j in rawCardNp[i]) {
                    transCardNp[j].add(rawCardNp[i][j]);
                }
            }
            for (var i in transCardNp) {
                cardNp[i] = Array.from(transCardNp[i]);
                cardNp[i].sort();
                if (cardNp[i][0] == 0) {
                    cardNp[i].reverse();
                    cardNp[i].pop();
                    cardNp[i].sort();
                }
            }
            var cardQuantity = [0, 0, 0];
            var cardHits = [0, 0, 0, 0];
            var cardDamage = [];
            for (var i in master.mstSvt[x].cardIds) {
                if (master.mstSvt[x].cardIds[i] == "1") {
                    cardQuantity[0]++;
                } else if (master.mstSvt[x].cardIds[i] == "2") {
                    cardQuantity[1]++;
                } else if (master.mstSvt[x].cardIds[i] == "3") {
                    cardQuantity[2]++;
                }
            }
            for (var i in master.mstSvtCard) {
                if (master.mstSvtCard[i].svtId == master.mstSvt[x].id) {
                    if (master.mstSvtCard[i].cardId == "1") {
                        cardHits[0] = master.mstSvtCard[i].normalDamage.length;
                        cardDamage[0] = master.mstSvtCard[i].normalDamage;
                    } else if (master.mstSvtCard[i].cardId == "2") {
                        cardHits[1] = master.mstSvtCard[i].normalDamage.length;
                        cardDamage[1] = master.mstSvtCard[i].normalDamage;
                    } else if (master.mstSvtCard[i].cardId == "3") {
                        cardHits[2] = master.mstSvtCard[i].normalDamage.length;
                        cardDamage[2] = master.mstSvtCard[i].normalDamage;
                    } else if (master.mstSvtCard[i].cardId == "4") {
                        cardHits[3] = master.mstSvtCard[i].normalDamage.length;
                        cardDamage[3] = master.mstSvtCard[i].normalDamage;
                    }
                    if (cardHits[0] != 0 && 　cardHits[1] != 0 && cardHits[2] != 0 && cardHits[3] != 0) {
                        break;
                    }
                }
            }
            inf.card.Arts = {
                quantity: cardQuantity[0],
                damage: cardDamage[0],
                hits: cardHits[0],
                np: cardNp[0]
            };
            inf.card.Buster = {
                quantity: cardQuantity[1],
                damage: cardDamage[1],
                hits: cardHits[1],
                np: cardNp[1]
            };
            inf.card.Quick = {
                quantity: cardQuantity[2],
                damage: cardDamage[2],
                hits: cardHits[2],
                np: cardNp[2]
            };
            inf.card.EX = {
                hits: cardHits[3],
                damage: cardDamage[3],
                np: cardNp[3]
            };

            //材料
            //limit
            for (var i = 0; i < 4; i++) {
                var tmp = [];
                for (var j in master.mstCombineLimit) {
                    if (master.mstCombineLimit[j].id == master.mstSvt[x].id && master.mstCombineLimit[j].svtLimit == i) {
                        for (var k in master.mstCombineLimit[j].itemIds) {
                            var t = [];
                            t.push(master.mstCombineLimit[j].itemIds[k]);
                            if (!itemsDict[master.mstCombineLimit[j].itemIds[k]]) {
                                console.log("------------item------------");
                                console.log(master.mstCombineLimit[j].itemIds[k], findItemName(master.mstCombineLimit[j].itemIds[k]));
                            }
                            t.push(master.mstCombineLimit[j].itemNums[k]);
                            tmp.push(t);
                        }
                        inf.limitQPs.push(master.mstCombineLimit[j].qp);
                    }
                }
                inf.limitItems.push(tmp);
            }
            //skill
            for (var i in master.mstCombineSkill) {
                var tmp = [];
                if (master.mstCombineSkill[i].id == master.mstSvt[x].id) {
                    for (var j in master.mstCombineSkill[i].itemIds) {
                        var t = [];
                        t.push(master.mstCombineSkill[i].itemIds[j]);
                        if (!itemsDict[master.mstCombineSkill[i].itemIds[j]]) {
                            console.log("------------item------------");
                            console.log(master.mstCombineSkill[i].itemIds[j], findItemName(master.mstCombineSkill[i].itemIds[j]));
                        }
                        t.push(master.mstCombineSkill[i].itemNums[j]);
                        tmp.push(t);
                    }
                    inf.skillQPs.push(master.mstCombineSkill[i].qp);
                }
                if (tmp.length != 0) {
                    inf.skillItems.push(tmp);
                }
            }

            //宝具
            for (var y in master.mstSvtTreasureDevice) {
                if (master.mstSvtTreasureDevice[y].svtId == master.mstSvt[x].id && 100 != master.mstSvtTreasureDevice[y].treasureDeviceId) {
                    var npLists = [];
                    let continueFlag = false;
                    for (var z in noblePhantasmsWhiteList) {
                        if (noblePhantasmsWhiteList[z] == master.mstSvtTreasureDevice[y].treasureDeviceId) {
                            continueFlag = true;
                            break;
                        }
                    }
                    if (continueFlag) {
                        continue;
                    }
                    for (var z in master.mstTreasureDevice) {
                        if (master.mstTreasureDevice[z].id == master.mstSvtTreasureDevice[y].treasureDeviceId) {

                            var npName = master.mstTreasureDevice[z].name;
                            if (npName == "？？？") {
                                break;
                            }
                            if (noblePhantasmsDict[npName]) {
                                npName = noblePhantasmsDict[npName];
                            } else {
                                console.log("------------Noble Phantasm------------");
                                console.log('collectionNo:', master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'treasureDeviceId:', master.mstSvtTreasureDevice[y].treasureDeviceId, 'npName:', npName);
                            }
                            var npHits = master.mstSvtTreasureDevice[y].damage.length;
                            var npDamage = master.mstSvtTreasureDevice[y].damage;
                            var npColor = master.mstSvtTreasureDevice[y].cardId;
                            var npRank = master.mstTreasureDevice[z].rank;
                            var npType = master.mstTreasureDevice[z].typeText.replace(/\uff0f/g, "\uff0f").replace(/\u5bfe/g, "\u5c0d").replace(/\u5b9d/g, "\u5bf6").replace(/\u5263/g, "\u528d").replace(/\u60aa/g, "\u60e1").replace(/\u5965/g, "\u5967").replace(/\u30bb\u30a4\u30d0\u30fc/g, "Saber").replace(/\u7adc/g, "\u9f8d");
                            var npRuby = master.mstTreasureDevice[z].ruby.replace(/・/g, "·");
                            // if (noblePhantasmsEnDict[master.mstTreasureDevice[z].ruby]) {
                            //     npRuby = noblePhantasmsEnDict[master.mstTreasureDevice[z].ruby];
                            // } else {
                            //     console.log("------------Noble Phantasm Ruby------------");
                            //     console.log('collectionNo:', master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'treasureDeviceId:', master.mstSvtTreasureDevice[y].treasureDeviceId, 'npRuby:', npRuby);
                            //     npRuby="";
                            // }
                            npColor = cardColorsDict[npColor];
                            if (!npColor) {
                                console.log("------------npColor------------");
                                console.log('collectionNo:', master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'treasureDeviceId:', master.mstSvtTreasureDevice[y].treasureDeviceId, 'cardId:', master.mstSvtTreasureDevice[y].cardId);
                            }
                            var l = [];
                            for (var i in tdDetail) {
                                if (master.mstTreasureDevice[z].id == tdDetail[i][0]) {
                                    l = tdDetail[i].slice(0);
                                    break;
                                }
                            }
                            var t = [];

                            l[1] = l[1].replace(/ ＋ |　＋　/g, "＋");
                            l[1] = l[1].replace(/〔(.*?)〕/g, "($1)");
                            l[1] = l[1].replace(/的話|┗|\[Lv\.\]|╔|╠|╚/g, "");
                            l[1] = l[1].replace(/・/g, "·");
                            l[1] = l[1].replace(/<br>/g, " ");
                            l[1] = l[1].replace(/Critical/g, "暴击");
                            l[1] = l[1].replace(/攻擊|攻撃/g, "攻击");
                            l[1] = l[1].replace(/<a.*?>(.*?)\(?(.*?)\)?(.*?)<\/a>/g, "$1$2$3");
                            l[2] = l[2].replace(/<a.*?>(.*?)\(?(.*?)\)?(.*?)<\/a>/g, "$1$2$3");
                            //hits修正
                            if ((l[1] + ' ').search(/攻击[^力]/) == -1) {
                                npHits = 0;
                            }
                            len = l[1].split(/＆|＋/).length;
                            var o = [];
                            for (var i = 0; i < len; i++) {
                                var t = [];
                                t.push(l[1].split(/＆|＋/)[i]);
                                t.push(l[i + 2]);
                                o.push(t);
                            }

                            var npInf = {
                                id: master.mstSvtTreasureDevice[y].treasureDeviceId,
                                name: npName,
                                ruby: npRuby,
                                rank: npRank,
                                type: npType,
                                damage: npDamage,
                                hits: npHits,
                                color: npColor,
                                np: cardNp[4].sort(),
                                desc: o
                            };

                            inf.noblePhantasm.push(npInf);
                        }
                    }
                }
            }
            //技能
            for (var y in master.mstSvtSkill) {
                if (master.mstSvtSkill[y].svtId == master.mstSvt[x].id) {
                    var skillChargeTurn = "";
                    var skillName = "";
                    var skillIcoId = 0;
                    for (var z in master.mstSkill) {
                        if (master.mstSvtSkill[y].skillId == master.mstSkill[z].id) {
                            skillName = master.mstSkill[z].name;
                            skillIcoId = master.mstSkill[z].iconId;
                            if (!skillsPath[skillIcoId]) {
                                console.log("------------skill icon------------");
                                console.log('collectionNo:', master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'skillIcoId:', skillIcoId, 'name:', master.mstSkill[z].name);
                            }
                            break;
                        }
                    }
                    var ts = skillName.split(' ');
                    if (ts.length > 1 && skillsDict[ts[0]]) {
                        skillName = skillsDict[ts[0]] + ' ' + ts[1];
                    } else if (skillsDict[skillName]) {
                        skillName = skillsDict[skillName];
                    } else {
                        console.log("------------skill------------");
                        console.log('collectionNo:', master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'skillId:', master.mstSvtSkill[y].skillId, 'name:', master.mstSkill[z].name);
                    }

                    for (var i in master.mstSkillLv) {
                        if (master.mstSvtSkill[y].skillId == master.mstSkillLv[i].skillId && 1 == master.mstSkillLv[i].lv) {
                            skillChargeTurn = master.mstSkillLv[i].chargeTurn;
                            break;
                        }
                    }
                    var l = [];
                    for (var i in skDetail) {
                        if (master.mstSvtSkill[y].skillId == skDetail[i][0]) {
                            l = skDetail[i].slice(0);
                            break;
                        }
                    }
                    l[1] = l[1].replace(/ ＋ |　＋　/g, "＋");
                    l[1] = l[1].replace(/〔(.*?)〕/g, "($1)");
                    l[1] = l[1].replace(/\[Lv\.\]|┗|╔|╠|╚/g, "");
                    l[1] = l[1].replace(/<br>/g, " ");
                    l[1] = l[1].replace(/・/g, "·");
                    l[1] = l[1].replace(/Critical/g, "暴击");
                    l[1] = l[1].replace(/<a.*?>(.*?)\(?(.*?)\)?(.*?)<\/a>/g, "$1$2$3");
                    l[2] = l[2].replace(/<a.*?>(.*?)\(?(.*?)\)?(.*?)<\/a>/g, "$1$2$3");
                    len = l[1].split(/＆|＋/).length;
                    var o = [];
                    for (var i = 0; i < len; i++) {
                        var t = [];
                        t.push(l[1].split(/＆|＋/)[i]);
                        t.push(l[i + 2]);
                        o.push(t);
                    }
                    var skillInf = {
                        id: master.mstSvtSkill[y].skillId,
                        num: master.mstSvtSkill[y].num,
                        name: skillName,
                        chargeTurn: skillChargeTurn,
                        icoId: skillIcoId,
                        desc: o
                    };
                    inf.skills.push(skillInf);
                }
            }
            //被动
            if (master.mstSvt[x].classPassive.length != 0) {
                for (var y in master.mstSvt[x].classPassive) {
                    let continueFlag = false;
                    for (var z in passiveSkillsWhiteList) {
                        if (passiveSkillsWhiteList[z] == master.mstSvt[x].classPassive[y]) {
                            continueFlag = true;
                            break;
                        }
                    }
                    if (continueFlag) {
                        continue;
                    }
                    var pSkillName = "";
                    var pSkillIcoId = 0;
                    for (var i in master.mstSkill) {
                        if (master.mstSvt[x].classPassive[y] == master.mstSkill[i].id) {
                            pSkillName = master.mstSkill[i].name;
                            pSkillIcoId = master.mstSkill[i].iconId;
                            if (!skillsPath[pSkillIcoId]) {
                                console.log("------------Passive skill icon------------");
                                console.log('collectionNo:', master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'skillIcoId:', pSkillIcoId, 'name:', master.mstSkill[i].name);
                            }
                            break;
                        }
                    }

                    var ts = pSkillName.split(' ');
                    if (ts.length > 1 && passiveSkillsDict[ts[0]]) {

                        pSkillName = passiveSkillsDict[ts[0]] + ' ' + ts[1];
                    } else if (passiveSkillsDict[pSkillName]) {
                        pSkillName = passiveSkillsDict[pSkillName];
                    } else {
                        console.log("------------Passive Skill------------");
                        console.log('collectionNo:', master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'skillId:', master.mstSvt[x].classPassive[y], 'SkillName:', pSkillName);
                    }
                    var l = [];
                    for (var i in skDetail) {
                        if (master.mstSvt[x].classPassive[y] == skDetail[i][0]) {
                            l = skDetail[i].slice(0);
                            break;
                        }
                    }

                    l[1] = l[1].replace(/ ＋ |　＋　/g, "＋");
                    l[1] = l[1].replace(/〔(.*?)〕/g, "($1)");
                    l[1] = l[1].replace(/\[Lv\.\]/g, "");
                    l[1] = l[1].replace(/<br>/g, " ");
                    l[1] = l[1].replace(/Critical/g, "暴击");

                    len = l[1].split(/＆|＋/).length;
                    var o = [];
                    for (var i = 0; i < len; i++) {
                        var t = [];
                        t.push(l[1].split(/＆|＋/)[i]);
                        t.push(l[i + 2]);
                        o.push(t);
                    }
                    var pSkillInf = {
                        id: master.mstSvt[x].classPassive[y],
                        name: pSkillName,
                        icoId: pSkillIcoId,
                        desc: o
                    };
                    inf.passiveSkills.push(pSkillInf);
                }
            }
            lists.push(inf);

            //log
            if (!servantNamesDict[inf.svtId]) {
                console.log("------------name------------");
                console.log("collectionNo:", master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'name:', findSvtNameZh2[master.mstSvt[x].id]);
            }
            if (!classNamesDict[inf.class]) {
                console.log("------------classId------------");
                console.log("collectionNo:", master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'classId:', master.mstSvt[x].classId);
            }
            if (!genderTypeDict[inf.gender]) {
                console.log("------------gender------------");
                console.log("collectionNo:", master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'gender:', master.mstSvt[x].genderType);
            }
            if (!attrDict[inf.attr]) {
                console.log("------------attri------------");
                console.log("collectionNo:", master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'attri:', master.mstSvt[x].attri);
            }
            if (!policyDict[inf.policy]) {
                console.log("------------policy------------");
                console.log("collectionNo:", master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'policy:', master.mstSvtLimit[pos].policy);
            }
            if (!personalityDict[inf.personality]) {
                console.log("------------personality------------");
                console.log("collectionNo:", master.mstSvt[x].collectionNo, "servantID:", master.mstSvt[x].id, 'attri:', master.mstSvtLimit[pos].personality);
            }
        }
    }
    //console.log(lists);
    var individualityLength = 0;
    for (var x in individualityDict) {
        individualityLength++;
    }
    if (individualityList.length != individualityLength) {
        console.log('individuality has changed!', individualityList);
    }

    removeItems();
    $("#info").append("<code id='info_str'></code>");
    $("#info_str").append(JSON.stringify(lists).replace(/<(.*?)>/g, "&lt;$1&gt"));
}
