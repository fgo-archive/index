function removeItems(){
	document.getElementById("buttonArea").remove();
}

function friendship(){
	sortByElmentNo(master.mstSvt);
	var str="[<br/>";
	for(var x in master.mstSvt){
		if((master.mstSvt[x].type==1||master.mstSvt[x].type==2||master.mstSvt[x].type==99)&&master.mstSvt[x].collectionNo>1){
			var tid=findSvtFs(master.mstSvt[x].id);
			var n=[];
			var m=[];
			var id=0;
			var name="";
			for(var a in master.mstFriendship){
				if(master.mstFriendship[a].id==tid&&master.mstFriendship[a].rank<10){
					n[master.mstFriendship[a].rank]=master.mstFriendship[a].friendship;
				}
			}
			for(var a in bondCE){
				if(bondCE[a][1]==master.mstSvt[x].id){
					for(var b in master.mstSvt){
						if(master.mstSvt[b].id==bondCE[a][0]){
							id=master.mstSvt[b].collectionNo;
							name=master.mstSvt[b].name;
							break;
						}
					}
					break;
				}
			}
			
			m[0]=n[4]/10000;
			for(var i=5;i<10;i++){
				m[i-4]=(n[i]-n[i-1])/10000;
			}
			m[6]=n[9]/10000;
			str+="&nbsp;&nbsp;&nbsp;&nbsp;{<br/>";
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "'+id+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "'+name+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"servantID": "'+master.mstSvt[x].collectionNo+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"servant": "'+findSvtNameZh(master.mstSvt[x].id)+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"friendship": {<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"0-5": "'+m[0]+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"5-6": "'+m[1]+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"6-7": "'+m[2]+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"7-8": "'+m[3]+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"8-9": "'+m[4]+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"9-10": "'+m[5]+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"total": "'+m[6]+'"<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"desc": "unknown"<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;},<br/>';
		}
	}
	str=str.substring(0,str.length-6);
	str+="<br/>]";
	removeItems();
	document.getElementById("info").innerHTML=str;
}
function friendship2(){
	sortByElmentNo(master.mstSvt);
	var tbStr= $("<table></table>");
	var trStr= $("<tr></tr>");
	var thStr=$("<td>id</td><td>名字</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td>");
	trStr.append(thStr);
	tbStr.append(trStr);
	for(var x in master.mstSvt){
		if((master.mstSvt[x].type==1||master.mstSvt[x].type==2||master.mstSvt[x].type==99)&&master.mstSvt[x].collectionNo>1){
			var q=findSvtFs(master.mstSvt[x].id);
			var n=[];
			var m=[];
			for(var a in master.mstFriendship){
				if(master.mstFriendship[a].id==q&&10>master.mstFriendship[a].rank){
					n[master.mstFriendship[a].rank]=master.mstFriendship[a].friendship;
				}
			}
			trStr= $("<tr></tr>");
			var tdStr='<td>'+master.mstSvt[x].collectionNo+'</td>';
			tdStr+='<td>'+findSvtNameZh(master.mstSvt[x].id)+'</td>';
			for(var i=4;i<10;i++){
				tdStr+='<td>'+n[i]/10000+'</td>';
			}
			trStr.append(tdStr);
			tbStr.append(trStr);
		}
	}
	$("#info").empty();
	$("#info").append(tbStr);
	removeItems();
}

function nphit(){
	sortByElmentNo(master.mstSvt);
	var str="[<br/>";
	for(var x in master.mstSvt){
		if((master.mstSvt[x].type==1||master.mstSvt[x].type==2||master.mstSvt[x].type==99)&&master.mstSvt[x].collectionNo>0){
			var npCard="";
			var i=0,j=0;
			var desc="";
			var hits=0;
			for(var y in master.mstSvtTreasureDevice){
				if(master.mstSvtTreasureDevice[y].svtId==master.mstSvt[x].id&&master.mstSvtTreasureDevice[y].treasureDeviceId!=100&&master.mstSvtTreasureDevice[y].num<10){
					if(master.mstSvtTreasureDevice[y].cardId==1){
						npCard="Arts";
					}
					else if(master.mstSvtTreasureDevice[y].cardId==2){
						npCard="Buster";
					}
					else if(master.mstSvtTreasureDevice[y].cardId==3){
						npCard="Quick";
					}else {
						npCard=="unknown";
					}
					i=master.mstSvt[x].id;
					j=master.mstSvtTreasureDevice[y].treasureDeviceId;
					hits=master.mstSvtTreasureDevice[y].damage.length;
					break;
				}
			}
			for(var z in tdDetail){
				if(tdDetail[z][0]==j){
					desc=tdDetail[z][1];
					if(desc.search(/攻擊[^力]|攻撃[^力]/)==-1) {hits=0;}
					break;
				}
			}
			str+="&nbsp;&nbsp;&nbsp;&nbsp;{<br/>";
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "'+master.mstSvt[x].collectionNo+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "'+findSvtNameZh(master.mstSvt[x].id)+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"npHits": "'+hits+'",<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"npCard": "'+npCard+'"<br/>';
			str+='&nbsp;&nbsp;&nbsp;&nbsp;},<br/>';
		}
	}
	str=str.substring(0,str.length-6);
	str+="<br/>]";
	removeItems();
	document.getElementById("info").innerHTML=str;
}