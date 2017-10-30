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
