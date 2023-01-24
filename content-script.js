(function() {
    window.onload = function() {
        console.log('Gitee Issue auto fill has been registered');

        // 判断是 PR 还是 Issue
        const isPR = window.location.href.indexOf('/pulls/') > 0 || window.location.href.indexOf('/pull/') > 0;

        // doWork
        if (isPR) {
            const field = document.querySelector('.pull-request__sidebar .auto-processing > :not(.checked) > label[for="pull_request_prune_branch"]');
            if (field) {
                field.click();
            }
            pullRequestLabel();
        } else {
            assigneesWork();
        }
    };

    const pullRequestLabel = function() {
        const fields = document.querySelector('.pull-request__sidebar .label-field');
        const field = fields.children[1];
        if (field.children.length === 0) {
            fields.children[0].children[1].click();
        } else {
            pullMilestone();
        }
        const handler = window.setInterval(function() {
            const label = fields.querySelector('[data-value="56189147"]');
            if (label) {
                window.clearInterval(handler);
                label.click();

                pullMilestone();
            }
        }, 300);
    };

    const pullMilestone = function() {
        const fields = document.querySelector('.pull-request__sidebar .milestone-field');
        const field = fields.children[1];
        if (field.children.length == 0) {
            fields.children[0].children[1].click();
        }

        const handler = window.setInterval(function() {
            const label = fields.querySelectorAll('.scrolling > .item');
            if (label.length > 1) {
                window.clearTimeout(handler);
                const index = label.length - 1;
                label[index].click();
            }
        }, 300);
    };

    const assigneesWork = function() {
        doWork(0, function() {
            const assignee = document.getElementById('issue-user-554725').querySelector('.btn-set-assignee');
            return { item: assignee, invoke: labelsWork };
        });
    };

    const labelsWork = function() {
        doWork(1, function() {
            const assignee = document.querySelector('.issue-field-list .issue-field div[title="feature"]');
            return { item: assignee, invoke: milestonesWork };
        });
    };

    //const projectsWork = function() {
    //    dowork(2, function() {
    //        const assignee = document.querySelector('.issue-field-list .issue-field div[data-value="70539"]');
    //        return { item: assignee, invoke: milestonesWork };
    //    });
    //};

    const milestonesWork = function() {
        doWork(2, function() {
            const assignee = document.querySelector('.issue-field-list .milestone [data-program]');
            return { item: assignee, invoke: branchesWork };
        });
    };

    const branchesWork = function() {
        doWork(3, function() {
            let assignee = document.querySelector('.issue-field-list .issue-field div[data-value="refs/heads/main"]');
            if (assignee === null) {
                assignee = document.querySelector('.issue-field-list .issue-field div[data-value="refs/heads/master"]');
            }
            return { item: assignee, invoke: planedWork };
        });
    };

    const planedWork = function() {
        doWork(4, function() {
            const assignee = document.querySelector('.datetimepicker-days .today');
            return { item: assignee, invoke: null };
        });
    }

    const doWork = function(filter, callback) {
        const fields = document.querySelectorAll('.issue-field-list .issue-field');
        const right = filter().querySelector('.issue-field-action');
        right.click();

        const handler = window.setInterval(function() {
            const data = callback();
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