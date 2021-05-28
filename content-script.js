(function () {
    var _continue = false;
    var mo = new MutationObserver(function (mutationsList, observer) {

    });

    mo.observe(document, {
        childList: true,
        subtree: true
    });

    console.log('Gitee Issue auto fill has been registered');
})();