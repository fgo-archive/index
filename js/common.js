function numLenFormat(num, length) {
    var s = Array(length).join(0) + num;
    return s.slice(-length);
}

function readJson(url, timeProperty, dataProperty) {
    var readData;
    var currTimeStamp = Date.parse(new Date()) / 1000;
    if (window.localStorage && window.localStorage.hasOwnProperty(dataProperty) && window.localStorage.hasOwnProperty(timeProperty)) {
        var lastTimeStamp = window.localStorage.getItem(timeProperty);
        //1星期内直接读本机缓存
        if (currTimeStamp - lastTimeStamp < 604800) {
            return JSON.parse(window.localStorage.getItem(dataProperty));
        }
    }
    $.ajax({
        url: url,
        type: "get",
        async: false,
        dataType: "json",
        cache: false,
        success: function(data) {
            window.localStorage.setItem(timeProperty, currTimeStamp);
            window.localStorage.setItem(dataProperty, JSON.stringify(data));
            readData = data;
        },
    });
    return readData;
}

function removeLocalCahce() {
    for (var i in arguments) {
        window.localStorage.removeItem(arguments[i]);
    }
    window.location.reload();
}
