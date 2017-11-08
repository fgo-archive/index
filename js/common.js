function numLenFormat(num, length) {
    var s = Array(length).join(0) + num;
    return s.slice(-length);
}

function readJson(url, verProperty, dataProperty) {
    var returnData;
    if (window.localStorage) {
        var version;
        $.ajax({
            url: "data/version.json",
            type: "get",
            async: false,
            dataType: "json",
            cache: false,
            success: function(data) {
                version = data[verProperty];
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (window.localStorage.hasOwnProperty(verProperty)) {
                    version = window.localStorage.getItem(verProperty);
                }
            }
        });
        if (window.localStorage.hasOwnProperty(dataProperty) && window.localStorage.hasOwnProperty(verProperty) && version == window.localStorage.getItem(verProperty)) {
            returnData = JSON.parse(window.localStorage.getItem(dataProperty));
        } else {
            $.ajax({
                url: url,
                type: "get",
                async: false,
                dataType: "json",
                cache: false,
                success: function(data) {
                    window.localStorage.setItem(verProperty, version);
                    window.localStorage.setItem(dataProperty, JSON.stringify(data));
                    returnData = data;
                },
            });
        }
    } else {
        $.ajax({
            url: url,
            type: "get",
            async: false,
            dataType: "json",
            cache: true,
            success: function(data) {
                returnData = data;
            },
        });
    }
    return returnData;
}

function removeLocalCahce() {
    for (var i in arguments) {
        window.localStorage.removeItem(arguments[i]);
    }
    window.location.reload();
}

function getPicUrl(type, id) {
    var url = "";
    switch (type) {
        case "servant":
            url = "http://file.fgowiki.fgowiki.com/fgo/head/" + numLenFormat(id, 3) + ".jpg";
            break;
        case "craft":
            url = "http://fgowiki.com/fgo/equip/" + numLenFormat(id, 3) + ".jpg";
            break;
        case "item":
            url = "http://file.fgowiki.fgowiki.com/fgo/material/" + itemsPath[id] + ".jpg";
            break;
        case "skill":
            url = "http://file.fgowiki.fgowiki.com/mobile/images/Skill/" + skillsPath[id] + ".png";
            break;
        case "others":
            url = "resources/others/" + id + ".png";
            break;
        default:
            url = "resources/others/0.jpg";
            break;
    }
    return url;
}

function numSeparator(num, len) {
    var result = "";
    var l = Math.pow(10, len);
    while (num / l >= 1) {
        result = ',' + num.toString().slice(-len) + result;
        num = parseInt(num / l);
    }
    if (num >= 1) {
        result = num + result;
    }
    return result;
}
