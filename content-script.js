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
                // check current labels
                const current_labels = document.querySelector('.pull-request__sidebar .label-field .content').innerText;
                if(current_labels === '未设置') {
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
                            return labelName === 'document';
                        });
                        if (label) {
                            window.clearInterval(handler);
                            label.click();

                            pullMilestone();
                        }
                    }, 300);
                }
                else {
                    pullMilestone();
                }
            };

            const pullMilestone = function () {
                const fields = document.querySelector('.pull-request__sidebar .milestone-field');
                const current_milestone = fields.querySelector('.content').innerText.trim();
                if(current_milestone === '未关联') {
                    const field = fields.children[1];
                    if (field.children.length === 0) {
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
                }
            };
            
            pullRequestLabel();
        } else {
            // 判断是新建还是已存在 Issue
            const isNew = document.querySelector('.issue-field-list .issue-field-first') === null;
            const issue_fields = [...document.querySelectorAll('.issue-field-list .issue-field')];
            const issue_worker = issue_fields.find(v => {
                const worker = v.querySelector('.issue-field-label').textContent;
                return worker === '负责人' || worker === 'Assignees';
            });
            const issue_labels = document.querySelector('.issue-field-list .issue-field.sidebar-labels-item');
            const issue_milestone = document.querySelector('.issue-field-list .issue-field.milestone');
            const issue_branch = document.querySelector('.issue-field-list .issue-field.branch');
            const issue_date = document.querySelector('.issue-field-list .issue-field.date');
            
            const doWork = function (field, issue_item, defaultValue, callback) {
                let content = '';
                if (issue_item === issue_date) {
                    const nv = [...issue_item.querySelectorAll('.left input')].map(v => v.value === '').length > 0;
                    if (nv) {
                        content = '未设置'
                    }
                }
                else {
                    content = issue_item.querySelector('.left .default').innerText.replace('\n', '').trim();
                }
                if (isNew || defaultValue.indexOf(content) > -1) {
                    const right = field.querySelector('.issue-field-action');
                    right.click();
                }
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
                doWork(issue_worker, issue_worker, ['未设置', 'Not set'], () => {                    
                    const assignee = document.querySelector('.issue-field .issue-collaborators .item[data-text="Argo"] .btn-set-assignee');
                    return {item: assignee, invoke: labelsWork};
                });
            };

            const labelsWork = function () {
                doWork(issue_labels, issue_labels, ['未设置', 'Not set'], () => {
                    const assignee = document.querySelector('.issue-field-list .issue-field div[title="feature"]');
                    return {item: assignee, invoke: milestonesWork};
                });
            };

            const milestonesWork = function () {
                doWork(issue_milestone, issue_milestone, ['未关联', 'No related milestones'], function () {
                    const assignee = document.querySelector('.issue-field-list .milestone [data-program]');
                    return {item: assignee, invoke: branchesWork};
                });
            };

            const branchesWork = function () {
                doWork(issue_branch, issue_branch, ['未关联', 'No related branch'], function () {
                    let assignee = document.querySelector('.issue-field-list .issue-field div[data-value="refs/heads/main"]');
                    if (assignee === null) {
                        assignee = document.querySelector('.issue-field-list .issue-field div[data-value="refs/heads/master"]');
                    }
                    return {item: assignee, invoke: planedWork};
                });
            };

            const planedWork = function () {
                doWork(issue_date, issue_date, ['未设置'], function () {
                    const assignee = document.querySelector('.datetimepicker-days .today');
                    return {item: assignee, invoke: null};
                });
            }

            assigneesWork();
        }
    };
})();