Скрипта за затемнување. Види http://skopjehacklab.github.io/blackout-mk/

Дополнителни опции за тестирање на скриптата може да се подесат со глобални променливи, како во следниот пример:

    <script type="text/javascript">
       blackout_on = [2013, 5, 3] // само еден ден [година, месец, ден], или
       blackout_on = undefined; // без датум (секој ден)
       blackout_once = true; // само еднаш за секоја сесија.
       blackout_serious = true; // стави го на false да се тргнува со клик
    </script>
    <script type="text/javascript"
        src="http://skopjehacklab.github.io/blackout-mk/blackout-mk.js">
    </script>

Ако сакаш да го менуваш кодот на сајтов, инсталирај [node.js](http://nodejs.org) па пиши

    npm install

Кога едитираш фајл, едитирај ја .tmpl.html варијантата доколку постои. После тоа пушти

    make

за да ги избилдаш .hml варијантите
