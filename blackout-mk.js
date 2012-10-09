(function (){
    var blackoutHtmlString = '<div class="blackout-script-div" style="color:#bbb; margin: auto; max-width:45em; font-family: Georgia, serif !important; font-size: 16px;">     <h1 style="font-size:1.5em; background-color:transparent; border:none; color:#bbb;">&#1042;&#1072;&#1082;&#1072; &#1116;&#1077; &#1080;&#1079;&#1075;&#1083;&#1077;&#1076;&#1072; &#1084;&#1072;&#1082;&#1077;&#1076;&#1086;&#1085;&#1089;&#1082;&#1080;&#1086;&#1090; &#1080;&#1085;&#1090;&#1077;&#1088;&#1085;&#1077;&#1090; &#1072;&#1082;&#1086; &#1089;&#1077; &#1074;&#1086;&#1074;&#1077;&#1076;&#1077; &#1085;&#1086;&#1074;&#1080;&#1086;&#1090; &#1079;&#1072;&#1082;&#1086;&#1085;          &#1079;&#1072; &#1086;&#1076;&#1075;&#1086;&#1074;&#1086;&#1088;&#1085;&#1086;&#1089;&#1090; &#1079;&#1072; &#1085;&#1072;&#1074;&#1088;&#1077;&#1076;&#1072; &#1080; &#1082;&#1083;&#1077;&#1074;&#1077;&#1090;&#1072;</h1>          <p style="color:#bbb;">&#1044;&#1086;&#1079;&#1085;&#1072;&#1112;&#1090;&#1077; &#1087;&#1086;&#1074;&#1077;&#1116;&#1077;:     <a style="color:#8cf;" href="http://skopjehacklab.github.com/blackout-mk/more.html">&#1064;&#1090;&#1086; &#1079;&#1085;&#1072;&#1095;&#1080; &#1086;&#1074;&#1072;?</a>     </p>     <p style="color:#bbb;">&#1050;&#1086;&#1085;&#1090;&#1072;&#1082;&#1090;&#1080;&#1088;&#1072;&#1112; &#1075;&#1080; &#1085;&#1072;&#1076;&#1083;&#1077;&#1078;&#1085;&#1080;&#1090;&#1077;:     <a style="color:#8cf;" href="http://www.sobranie.mk/ext/contact.aspx">         sobranie.mk     </a>     <img src="http://status.spodeli.org/log?tag=test" style="width:1px; height:1px;">     </p> </div> ';
	var root = this;

	var SopaBlackout = function(){};
	var	addEvent = function(obj, type, fn, ref_obj){
		if (obj.addEventListener){
			obj.addEventListener(type, fn, false);
		}else if (obj.attachEvent){
			obj["e"+type+fn] = fn;
			obj[type+fn] = function(){
				obj["e"+type+fn](window.event,ref_obj);
			};
			obj.attachEvent("on"+type, obj[type+fn]);
		}
	};
	// Thanks http://javascript.nwbox.com/IEContentLoaded/
	// for this
	var IEContentLoaded = function(w, fn) {
		var d = w.document, done = false,
		init = function () {
			if (!done) {
				done = true;
				fn();
			}
		};
		(function () {
			try {
				d.documentElement.doScroll('left');
			} catch (e) {
				setTimeout(arguments.callee, 50);
				return;
			}
			init();
		})();
		d.onreadystatechange = function() {
			if (d.readyState == 'complete') {
				d.onreadystatechange = null;
				init();
			}
		};
	}
	var onDomReady = function(fn){
		if (document.addEventListener){
			document.addEventListener('DOMContentLoaded', fn, false);
		}else{
			IEContentLoaded(window, fn);
		}
	};
	var getStyle = function(e, prop){
		if (e.currentStyle){
			return e.currentStyle[prop];
		}else if (document.defaultView && document.defaultView.getComputedStyle){
			return document.defaultView.getComputedStyle(e, "")[prop];
		}else{
			return e.style[prop];
		}
	};
	var findPos = function(obj){
		var curleft = 0;
		var curtop = 0;
		if (obj.offsetParent){
			do{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			}while(obj = obj.offsetParent);
		}
		return [curleft, curtop];
	};
	var txt = function(s){
		return document.createTextNode(s);
	};
	var create = function(e, props){
		var elem = document.createElement(e);
		var props = props !== null ? props : {};
		for (var key in props){
			if (key == 'href'){
				elem.href = props[key];
			}else{
				elem.style[key] = props[key];
			}
		}
		l = arguments.length;
		for (var i=2; i<l; i++){
			elem.appendChild(arguments[i]);
		}
		return elem;
	};
	var getOpts = function(){
		var ret = {};
		for (var key in SopaBlackout.DEFAULTS){
			var k = 'blackout_' + key;
			ret[key] = (typeof window[k] === 'undefined') ? SopaBlackout.DEFAULTS[key] : window[k];
		}
		return ret;
	};
	var dateMatches = function(spec){
		spec.push(false); spec.push(false); spec.push(false);
		var today = new Date();
		if ((spec[0] !== false && today.getFullYear() !== spec[0]) || 
				(spec[1] !== false && today.getMonth() + 1 !== spec[1]) ||
				(spec[2] !== false && today.getDate() !== spec[2])){
			return false;
		}
		return true;
	};

	SopaBlackout.VERSION = '0.2.0';
	SopaBlackout.MIN_HEIGHT = 100;
	SopaBlackout.HEADER_TEXT = "Ова е изгледот на македонскиот интернет под законот ЗАКОН_ОВДЕ";
	SopaBlackout.CONTINUE_TEXT = "(&#1082;&#1083;&#1080;&#1082;&#1085;&#1080; &#1079;&#1072; &#1076;&#1072; &#1087;&#1088;&#1086;&#1076;&#1086;&#1083;&#1078;&#1080;&#1096;) ";
	SopaBlackout.ZINDEX = Math.pow(2, 31) - 2;
	SopaBlackout.DEFAULTS = {
		'id': false,
		'serious': false,
        'once': false,
		'on': [2012,10,09]
	};
	SopaBlackout.blackout = function(opts){
		var obj;
		var body = document.body;
		if (opts['id'] === false){
			obj = body;
            height = Math.max(body.scrollHeight ? body.scrollHeight : 0, body.clientHeight ? body.clientHeight : 0);
			//height = "100%";
		}else{
			obj = document.getElementById(opts['id']);
			var height = parseInt(getStyle(obj, 'height'), 10);
			height = height > SopaBlackout.MIN_HEIGHT ? height : SopaBlackout.MIN_HEIGHT;
		}
		var offsets = findPos(obj);

		var blackout = create('div', {
                position: ('ontouchstart' in document.documentElement ? 'absolute' : 'fixed'),
				top: offsets[1],
                left: offsets[0],
				width: '100%',
				height: height + "px",
                minHeight:"100%",
				backgroundColor: 'black',
				textAlign: 'center',
				paddingTop: '10px',
				zIndex: SopaBlackout.ZINDEX,
				color: '#999'},
			create('h1', {color: '#999'}, txt(SopaBlackout.HEADER_TEXT)),
			create('p', null,
				txt("Чувај го вебот отворен. "),
			create('a', {href: "https://nash.link.do/nadleznite"}, txt("контактирај ги надлежните")),
				txt(" или "),
				create('a', {href: "http://nash.link.do/doznajpoveke"}, txt("дознај повеќе")))
		);
        if (blackoutHtmlString.length > 10) blackout.innerHTML = blackoutHtmlString;
        if (opts['once']) {
            if (document.cookie.indexOf('blackoutonce=1') >= 0) return;
            else document.cookie = 'blackoutonce=1';
        }
		if (opts['serious'] !== true){
			blackout.appendChild(create('p', {paddingTop: '250px', color: '#fff', "font-size":"18px"}, txt(SopaBlackout.CONTINUE_TEXT)));
			addEvent(blackout, 'click', function(e){
				body.removeChild(blackout);
			});
		}
		body.appendChild(blackout);
	};
	SopaBlackout.go = function(){
		var opts = getOpts();
		if (opts['on'] !== false && !dateMatches(opts['on'])){
			return;
		}
		SopaBlackout.blackout(opts);
	};

	onDomReady(SopaBlackout.go);
}).call(this);
