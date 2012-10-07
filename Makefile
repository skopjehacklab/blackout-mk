all:
	node build.js blackout-mk.tmpl.js > blackout-mk.js
	node build.js index.tmpl.html > index.html
	node build.js more.tmpl.html > more.html

