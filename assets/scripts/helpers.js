// get a warp string & convert it back for easy use
function getWarpDetails(coords) {
    // gives us MAPNAME, POSx:POSy
    val = warps[coords].split('=');
    // where this tile should place the character
    placeChar = val[1].split(':');

    return {
        mapName: val[0],
        place_character: {
            x: parseInt(placeChar[0]),
            y: parseInt(placeChar[1]),
        }
    }
}

// helper function - mebe pushed to a seperate file?
function getFilename(path) {

    segments = path.split('/');
    filename = segments[segments.length - 1];

    return filename;
}

// turn pixels into grid co-ords
function getGridCoords(x, y) {
    x = x / CONFIG.tile.width;
    y = y / CONFIG.tile.height;

    return [parseInt(x), parseInt(y)];
}


// Game Trace Func, also outputs to firebug console
function dump(msg) {
    msg = '['+new Date().format('HH:mm:ss')+'] '+msg; // prefix msg with date
    ele = jQuery('#trace');
    if (ele && CONFIG.debug > 0) {
        var lines = ele.html();
        var lineList;
        begin = '<ul><li>';
        middle = '</li><li>';
        end = '</li></ul>';

        if (lines.length > 0) {
            lineList = lines.substring(begin.length, lines.length - end.length).split(middle);
            while (lineList.length >= 35) {
                lineList.shift();
            }
            lineList.push(msg);
        } else {
            lineList = [msg];
        }

        ele.html(begin +lineList.join(middle) +end);
    }

    if (CONFIG.toConsole) {
        console.log(msg);
    }
}

// nabbed off interwebs somewhere...crap
Date.prototype.format = function (format, utc){
    return formatDate(this, format, utc);
};
function formatDate(date, format, utc){
    var MMMM = ['\x00', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var MMM = ['\x01', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dddd = ['\x02', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var ddd = ['\x03', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    function ii(i, len) { var s = i + ' '; len = len || 2; while (s.length < len) s = '0' + s; return s; }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, '$1' + y);
    format = format.replace(/(^|[^\\])yy/g, '$1' + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, '$1' + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, '$1' + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, '$1' + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, '$1' + ii(M));
    format = format.replace(/(^|[^\\])M/g, '$1' + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, '$1' + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, '$1' + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, '$1' + ii(d));
    format = format.replace(/(^|[^\\])d/g, '$1' + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, '$1' + ii(H));
    format = format.replace(/(^|[^\\])H/g, '$1' + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, '$1' + ii(h));
    format = format.replace(/(^|[^\\])h/g, '$1' + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, '$1' + ii(m));
    format = format.replace(/(^|[^\\])m/g, '$1' + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, '$1' + ii(s));
    format = format.replace(/(^|[^\\])s/g, '$1' + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, '$1' + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, '$1' + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, '$1' + f);

    var T = H < 12 ? 'AM' : 'PM';
    format = format.replace(/(^|[^\\])TT+/g, '$1' + T);
    format = format.replace(/(^|[^\\])T/g, '$1' + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, '$1' + t);
    format = format.replace(/(^|[^\\])t/g, '$1' + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? 'Z' : tz > 0 ? '+' : '-';
    if (!utc)
    {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ':' + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, '$1' + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], 'g'), dddd[day]);
    format = format.replace(new RegExp(ddd[0], 'g'), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], 'g'), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], 'g'), MMM[M]);

    format = format.replace(/\\(.)/g, '$1');

    return format;
};
