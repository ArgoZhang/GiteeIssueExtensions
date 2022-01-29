(function() {
    window.onload = function() {
        console.log('Gitee Issue auto fill has been registered');

        // dowork
        assigneesWork(0);
    };

    var dowork = function(index, callback) {
        var fields = document.querySelectorAll('.issue-field-list .issue-field');
        var right = fields[index].querySelector('.issue-field-action');
        right.click();

        var handler = window.setTimeout(function() {
            window.clearTimeout(handler);
            callback();
        }, 300);
    }

    var assigneesWork = function(index) {
        dowork(index, function() {
            var assignee = document.getElementById('issue-user-554725').querySelector('.btn-set-assignee');
            assignee.click();

            labelsWork(++index);
        });
    };

    var labelsWork = function(index) {
        dowork(index, function() {
            var label = document.querySelector('.issue-field-list .issue-field div[title="feature"]');
            label.click();

            projectsWork(++index);
        });
    };

    var projectsWork = function(index) {
        dowork(index, function() {
            var label = document.querySelector('.issue-field-list .issue-field div[data-value="70539"]');
            label.click();

            milestonesWork(++index);
        });
    };

    var milestonesWork = function(index) {
        dowork(index, function() {
            var label = document.querySelector('.issue-field-list .milestone [data-program]');
            label.click();

            branchesWork(++index);
        });
    };

    var branchesWork = function(index) {
        dowork(index, function() {
            var label = document.querySelector('.issue-field-list .issue-field div[data-value="refs/heads/main"]');
            if (label === null) {
                label = document.querySelector('.issue-field-list .issue-field div[data-value="refs/heads/master"]');
            }
            label.click();

            planedWork(++index);
        });
    };

    var planedWork = function(index) {
        dowork(index, function() {
            var label = document.querySelector('.datetimepicker-days .today');
            label.click();
        });
    }
})();