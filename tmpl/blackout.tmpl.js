(function (){
    var blackoutHtmlString = '$$blackout.html$$';
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
	SopaBlackout.CONTINUE_TEXT = "$$continue.html$$";
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
            var clickToContinue = create('p', {paddingTop: '250px', color: '#fff', "font-size":"18px"});
            clickToContinue.innerHTML = SopaBlackout.CONTINUE_TEXT;
			blackout.appendChild(clickToContinue); 
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
