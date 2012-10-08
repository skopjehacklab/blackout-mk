all: al mk

mk: mkjs mkindex mkmore 
	
mkjs: mk/continue.html mk/blackout.html tmpl/blackout.tmpl.js
	node build.js --partialdir mk tmpl/blackout.tmpl.js > blackout-mk.js

mkindex: mk/content.html tmpl/index.tmpl.html
	node build.js --partialdir mk tmpl/index.tmpl.html > index.html

mkmore: mk/content.html tmpl/more.tmpl.html
	node build.js --partialdir mk tmpl/more.tmpl.html > more.html


al: aljs alindex almore 
	
aljs: al/continue.html al/blackout.html tmpl/blackout.tmpl.js
	node build.js --partialdir al tmpl/blackout.tmpl.js > blackout-al.js

alindex: al/content.html tmpl/index.tmpl.html
	node build.js --partialdir al tmpl/index.tmpl.html > al/index.html

almore: al/content.html tmpl/more.tmpl.html
	node build.js --partialdir al tmpl/more.tmpl.html > al/more.html


