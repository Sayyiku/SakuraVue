export function pullWeather() {
    window.WIDGET = {
        "CONFIG": {
            "modules": "01234",
            "background": "5",
            "tmpColor": "ffc97a",
            "tmpSize": "14",
            "cityColor": "ffc97a",
            "citySize": "14",
            "aqiColor": "ffc97a",
            "aqiSize": "14",
            "weatherIconSize": "22",
            "alertIconSize": "16",
            "padding": "10px 10px 10px 10px",
            "shadow": "0",
            "language": "auto",
            "fixed": "false",
            "vertical": "center",
            "horizontal": "center",
            //密钥
            "key": "c8a7d069fa674552983a13225cfefc5f"
        }
    };
    (function (d) {
        var c = d.createElement('link')
        c.rel = 'stylesheet'
        c.href = 'https://widget.heweather.net/simple/static/css/he-simple.css?v=1.4.0'
        var s = d.createElement('script')
        s.src = 'https://widget.heweather.net/simple/static/js/he-simple.js?v=1.4.0'
        var sn = d.getElementsByTagName('script')[0]
        sn.parentNode.insertBefore(c, sn)
        sn.parentNode.insertBefore(s, sn)
    })(document);
}