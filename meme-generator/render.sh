rm -rf out
mkdir out
node tmpl.js template.svg items.json
cd out
for f in *.svg
do
    o=`echo "$f" | sed 's/svg/png/'`
    convert "$f" "$o"
done
rm *.svg
cd ..
