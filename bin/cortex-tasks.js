#!/usr/bin/env node

/*
* Copyright 2018 Cognitive Scale, Inc. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the “License”);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an “AS IS” BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

const chalk = require('chalk');
const program = require('../src/commander');

const { withCompatibilityCheck } = require('../src/compatibility');

const {
    ListTasks,
    TaskLogs,
    CancelTask,
    DescribeTask
} = require('../src/commands/tasks');

program.description('Work with Cortex Jobs');


// List Tasks
program
    .command('list <jobId>')
    .description('List task definitions within a job definition')
    .option('--no-compat', 'Ignore API compatibility checks')
    .option('--color [on/off]', 'Turn on/off colors for JSON output.', 'on')
    .option('--profile [profile]', 'The profile to use')
    .option('--json', 'Output results using JSON')
    .option('--query [query]', 'A JMESPath query to use in filtering the response data. Ignored if output format is not JSON.')
    .action(withCompatibilityCheck((jobId, options) => {
        try {
            new ListTasks(program).execute(jobId, options);
        }
        catch (err) {
            console.error(chalk.red(err.message));
        }
    }));

// Get Tasks logs
program
    .command('logs <jobId> <taskId>')
    .description('Get Tasks logs')
    .option('--no-compat', 'Ignore API compatibility checks')
    .option('--color [on/off]', 'Turn on/off colors for JSON output.', 'on')
    .option('--profile [profile]', 'The profile to use')
    .option('--json', 'Output results using JSON')
    .option('--query [query]', 'A JMESPath query to use in filtering the response data. Ignored if output format is not JSON.')
    .action(withCompatibilityCheck((jobId, taskId, options) => {
        try {
            new TaskLogs(program).execute(jobId, taskId, options);
        }
        catch (err) {
            console.error(chalk.red(err.message));
        }
    }));

// Cancel task
program
    .command('cancel <jobId> <taskId>')
    .description('Cancel a task')
    .option('--no-compat', 'Ignore API compatibility checks')
    .option('--color [on/off]', 'Turn on/off colors for JSON output.', 'on')
    .option('--profile [profile]', 'The profile to use')
    .option('--json', 'Output results using JSON')
    .option('-m, --message <message>', 'Cancellation message')
    .action(withCompatibilityCheck((jobId, taskId, options) => {
        try {
            new CancelTask(program).execute(jobId, taskId, options);
        }
        catch (err) {
            console.error(chalk.red(err.message));
        }
    }));

// Describe task
program
    .command('describe <jobId> <taskId>')
    .description('Describe a task definition')
    .option('--no-compat', 'Ignore API compatibility checks')
    .option('--color [on/off]', 'Turn on/off colors for JSON output.', 'on')
    .option('--profile [profile]', 'The profile to use')
    .option('--json', 'Output results using JSON')
    .option('--query [query]', 'A JMESPath query to use in filtering the response data. Ignored if output format is not JSON.')
    .action(withCompatibilityCheck((jobId, taskId, options) => {
        try {
            new DescribeTask(program).execute(jobId, taskId, options);
        }
        catch (err) {
            console.error(chalk.red(err.message));
        }
    }));

program.parse(process.argv);
