# Running tests

## Unit

TBD

## Functional

Functional tests run via [webdriver.io](http://webdriver.io/). It connects to 
[BrowserStack](https://www.browserstack.com/) instance using 
[BrowserStackLocal Application](https://www.browserstack.com/local-testing) 
on your local machine or using [Jenkins Plugin](https://www.browserstack.com/automate/jenkins) 
on CI server.

To run the tests you need to:

1. Start the server. You can use webpack development server or Docker container – 
whatever fits your needs the most

2. Start BrowserStack connector for local testing

3. Specify environment variables:
    ```
    BROWSERSTACK_USERNAME=username
    BROWSERSTACK_ACCESS_KEY=secretkey
    ```

4. Start the testing with `npm run test:functional`

You can also specify additional variables:
```
# local machine IP by default
TEST_SERVER_HOST=jibrel.network
# 3000 by default
TEST_SERVER_PORT=80
```

We have also special suite for smoke tests only. You can run it with `npm run test:smoke`.
