all: unpack items render

unpack:
	unzip prat.zip > /dev/null

items:
	node makeitems.js > items.json

render: 
	./render.sh

clean:
	rm -rf items.json out prat
