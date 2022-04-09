(function() {
    window.onload = function() {
        console.log('Gitee Issue auto fill has been registered');

        // 判断是 PR 还是 Issue
        var isPR = window.location.href.indexOf('/pulls/');

        // dowork
        if (isPR) {
            var field = document.querySelector('.pull-request__sidebar .auto-processing > :not(.checked) > label[for="pull_request_prune_branch"]');
            if (field) {
                field.click();
            }
            pullRequestLabel();
        } else {
            assigneesWork(0);
        }
    };

    var pullRequestLabel = function() {
        var fields = document.querySelector('.pull-request__sidebar .label-field');
        var field = fields.children[1];
        if (field.children.length === 0) {
            fields.children[0].children[1].click();
        } else {
            pullMilestone();
        }
        var handler = window.setInterval(function() {
            var label = fields.querySelector('[data-value="35630651"]');
            if (label) {
                window.clearTimeout(handler);
                label.click();

                pullMilestone();
            }
        }, 300);
    };

    var pullMilestone = function() {
        var fields = document.querySelector('.pull-request__sidebar .milestone-field');
        var field = fields.children[1];
        if (field.children[0].getAttribute('data-value') === "0") {
            fields.children[0].children[1].click();
        }

        var handler = window.setInterval(function() {
            var label = fields.querySelectorAll('.scrolling > .item');
            if (label.length > 1) {
                window.clearTimeout(handler);
                var index = label.length - 1;
                label[index].click();
            }
        }, 300);
    };

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

            planedWork(index + 4);
        });
    };

    var planedWork = function(index) {
        dowork(index, function() {
            var label = document.querySelector('.datetimepicker-days .today');
            label.click();
        });
    }

    var dowork = function(index, callback) {
        var fields = document.querySelectorAll('.issue-field-list .issue-field');
        var right = fields[index].querySelector('.issue-field-action');
        right.click();

        var handler = window.setTimeout(function() {
            window.clearTimeout(handler);
            callback();
        }, 300);
    }
})();