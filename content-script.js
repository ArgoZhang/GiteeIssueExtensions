(function() {
    window.onload = function() {
        console.log('Gitee Issue auto fill has been registered');

        // 判断是 PR 还是 Issue
        var isPR = window.location.href.indexOf('/pulls/') > 0 || window.location.href.indexOf('/pull/') > 0;

        // doWork
        if (isPR) {
            var field = document.querySelector('.pull-request__sidebar .auto-processing > :not(.checked) > label[for="pull_request_prune_branch"]');
            if (field) {
                field.click();
            }
            pullRequestLabel();
        } else {
            assigneesWork();
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
            var label = fields.querySelector('[data-value="56189147"]');
            if (label) {
                window.clearInterval(handler);
                label.click();

                pullMilestone();
            }
        }, 300);
    };

    var pullMilestone = function() {
        var fields = document.querySelector('.pull-request__sidebar .milestone-field');
        var field = fields.children[1];
        if (field.children.length == 0) {
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

    var assigneesWork = function() {
        dowork(0, function() {
            var assignee = document.getElementById('issue-user-554725').querySelector('.btn-set-assignee');
            return { item: assignee, invoke: labelsWork };
        });
    };

    var labelsWork = function() {
        doWork(1, function() {
            var assignee = document.querySelector('.issue-field-list .issue-field div[title="feature"]');
            return { item: assignee, invoke: milestonesWork };
        });
    };

    //var projectsWork = function() {
    //    dowork(2, function() {
    //        var assignee = document.querySelector('.issue-field-list .issue-field div[data-value="70539"]');
    //        return { item: assignee, invoke: milestonesWork };
    //    });
    //};

    var milestonesWork = function() {
        doWork(2, function() {
            var assignee = document.querySelector('.issue-field-list .milestone [data-program]');
            return { item: assignee, invoke: branchesWork };
        });
    };

    var branchesWork = function() {
        doWork(3, function() {
            var assignee = document.querySelector('.issue-field-list .issue-field div[data-value="refs/heads/main"]');
            if (assignee === null) {
                assignee = document.querySelector('.issue-field-list .issue-field div[data-value="refs/heads/master"]');
            }
            return { item: assignee, invoke: planedWork };
        });
    };

    var planedWork = function() {
        doWork(4, function() {
            var assignee = document.querySelector('.datetimepicker-days .today');
            return { item: assignee, invoke: null };
        });
    }

    var doWork = function(filter, callback) {
        var fields = document.querySelectorAll('.issue-field-list .issue-field');
        var right = fields[index].querySelector('.issue-field-action');
        right.click();

        var handler = window.setInterval(function() {
            var data = callback();
            if (data.item) {
                window.clearInterval(handler);
                data.item.click();
                if (data.invoke != null) {
                    data.invoke();
                }
            }
        }, 300);
    }
})();