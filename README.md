Скрипта за затемнување. Види http://skopjehacklab.github.com/blackout-mk

Дополнителни опции за тестирање на скриптата може да се подесат со глобални променливи, како во следниот пример:
            
    <script type="text/javascript">
       blackout_on = [2012,10,10] // само еден ден [година, месец, ден], или
       blackout_on = false; // без датум     
       blackout_serious = false; // за тестирање (се тргнува со клик)
    </script>
    <script type="text/javascript" 
        src="//skopjehacklab.github.com/blackout-mk/blackout-mk.js">
    </script>

Ако сакаш да го хакираш сајтов, инсталирај [node.js](http://nodejs.org) па пиши

    npm install

Кога едитираш фајл, едитирај ја .tmpl.html варијантата доколку постои. После тоа пушти

    make

за да ги избилдаш .hml варијантите
