var isInternetExplorer8AndOlder = function() {
    var rv = false;

    if ( navigator.appName === 'Microsoft Internet Explorer' ) {
        var ua = navigator.userAgent;
        var re  = new RegExp( "MSIE ([0-9]{1,}[\.0-9]{0,})" );
        if ( re.exec(ua) !== null ) {
            rv = parseFloat( RegExp.$1 );
            rv = rv < 9;
        }
    }
    return rv;
};