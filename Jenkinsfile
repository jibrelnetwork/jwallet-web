builder(
        jUnitReportsPath: 'junit-reports',
        coverageReportsPath: 'coverage-reports',
        buildTasks: [
                [
                        name: 'Linters',
                        type: 'lint',
                        method: 'inside',
                        buildStage: 'build',
                        command: [
                                // 'npm run lint:css', // TODO: enable CSS linting
                                'npm run lint:js',
                        ],
                ],
                [
                        name: 'Tests',
                        type: 'test',
                        method: 'inside',
                        buildStage: 'build',
                        jUnitPath: '/usr/src/app/reports/unit-tests',
                        coveragePath: '/usr/src/app/reports/coverage',
                        environment: [
                                NODE_ENV: 'production',
                        ],
                        command: [
                                'npm run test:unit',
                        ],
                ],
        ],
)
