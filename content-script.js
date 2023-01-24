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

            const pullRequestLabel = function () {
                const field = document.querySelector('.pull-request__sidebar .label-field .label-dropdown');
                if (field) {
                    field.click();
                } else {
                    pullMilestone();
                }
                const handler = window.setInterval(function () {
                    const labels = [...field.querySelectorAll('.item[data-value]')];
                    const label = labels.find(v => {
                       const labelName = v.querySelector('.label').innerText.trim();
                       return labelName == 'document';
                    });
                    if (label) {
                        window.clearInterval(handler);
                        label.click();

                        pullMilestone();
                    }
                }, 300);
            };

            const pullMilestone = function () {
                const fields = document.querySelector('.pull-request__sidebar .milestone-field');
                const field = fields.children[1];
                if (field.children.length == 0) {
                    fields.children[0].children[1].click();
                }

                const handler = window.setInterval(function () {
                    const label = fields.querySelectorAll('.scrolling > .item');
                    if (label.length > 1) {
                        window.clearTimeout(handler);
                        const index = label.length - 1;
                        label[index].click();
                    }
                }, 300);
            };
            
            pullRequestLabel();
        } else {
            const issue_fields = [...document.querySelectorAll('.issue-field-list .issue-field')];
            const issue_worker = issue_fields.find(v => {
                const worker = v.querySelector('.issue-field-label').textContent;
                return worker === '负责人' || worker === 'Assignees';
            });
            const issue_labels = document.querySelector('.issue-field-list .issue-field.sidebar-labels-item');
            const issue_milestone = document.querySelector('.issue-field-list .issue-field.milestone');
            const issue_branch = document.querySelector('.issue-field-list .issue-field.branch');
            const issue_date = document.querySelector('.issue-field-list .issue-field.date');
            
            const doWork = function (field, callback) {
                const right = field.querySelector('.issue-field-action');
                right.click();

                const handler = window.setInterval(function () {
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
            
            const assigneesWork = function () {
                doWork(issue_worker, () => {
                    const assignee = document.getElementById('issue-user-554725').querySelector('.btn-set-assignee');
                    return {item: assignee, invoke: labelsWork};
                });
            };

            const labelsWork = function () {
                doWork(issue_labels, () => {
                    const assignee = document.querySelector('.issue-field-list .issue-field div[title="feature"]');
                    return {item: assignee, invoke: milestonesWork};
                });
            };

            const milestonesWork = function () {
                doWork(issue_milestone, function () {
                    const assignee = document.querySelector('.issue-field-list .milestone [data-program]');
                    return {item: assignee, invoke: branchesWork};
                });
            };

            const branchesWork = function () {
                doWork(issue_branch, function () {
                    let assignee = document.querySelector('.issue-field-list .issue-field div[data-value="refs/heads/main"]');
                    if (assignee === null) {
                        assignee = document.querySelector('.issue-field-list .issue-field div[data-value="refs/heads/master"]');
                    }
                    return {item: assignee, invoke: planedWork};
                });
            };

            const planedWork = function () {
                doWork(issue_date, function () {
                    const assignee = document.querySelector('.datetimepicker-days .today');
                    return {item: assignee, invoke: null};
                });
            }

            assigneesWork();
        }
    };
})();