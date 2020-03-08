---
layout: post
title: Api automation testing using postman 
date: 2020-03-05 20:38:20 +0300
description: Automating api testing using postman # Add post description (optional)
img:  # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [postman, automation, api]
---

### WHY? 

Because its easy to automate api testing using postman :)

NOTE: I would choose postman for automation if my APIs are simple and validations doesn't involve any complex validations or connecting to other systems. 

### HOW?

Lets make it simple (really simple!), we are going to use `https://jsonplaceholder.typicode.com/todos/1` as our test api which returns below response and we are going to automate testing this response
```
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
``` 

#### Test Api manually 

1. Open postman ([install postman](https://www.postman.com/downloads/) if not already installed)

2. Go to `Collections` tab and create a new collection

    ![alt text](/assets/img/postman-automation/postnam-automation-1.png)

3. Click on Add requests, add `Request name` and save it

    ![alt text](/assets/img/postman-automation/postnam-automation-2.png)

4. Go to created request tab and add a get request to https://jsonplaceholder.typicode.com/todos/1. click on `send` and we should see the response as below

    ![alt text](/assets/img/postman-automation/postnam-automation-3.png)

    
Now we manually tested api and all looks good with status code and response, lets see if we can add some assertions programmatically because we don't want to check all attributes manually all the time!

#### Add programmatic assertions 

1. Adding Assertions programmatically

    - Navigate to `Tests` section, this is where we can add assertions to our request response

    - There will be few useful snippets in `SNIPPETS` section, clicking on a snippet will create sample code

    - Lets say I want an assertion for status code then I can click on `Status code` snippet which will generate sample code for this assertion and we can modify this code as needed

    ![alt text](/assets/img/postman-automation/postnam-automation-4.png)

2. Lets not be lazy and add another assertion to check the schema and values in response :)

    - To do this we need to get response into a json object and we can use `Response body : JSON value check` snippet to generate a sample code for me. 

    ![alt text](/assets/img/postman-automation/postnam-automation-5.png)

    - From generated code my response object is in jsonData and I should be able to add assertions on fields in response as below

    ![alt text](/assets/img/postman-automation/postnam-automation-6.png)

    - Save the request

3. Now whenever we send request all tests will be executed after response received, navigate to test results tab to see test results
   
    ![alt text](/assets/img/postman-automation/postnam-automation-7.png)

4. Ok all good so far but what happens when a test fail?  lets change the userId value to `2` in assertion `pm.expect(jsonData.userId).to.eql(2);` and send request. expected is 2 and actual is 1 in this case so test should be failed and we should see failed test in results

    ![alt text](/assets/img/postman-automation/postnam-automation-8.png)


All good and all Done ?  Not yet! We can create tests for our requests and run them from postman now, BUT we don’t want to do this manually! Here comes our friend [newman](https://www.npmjs.com/package/newman) to help us. [newman](https://www.npmjs.com/package/newman) is a command-line collection runner for postman and we can use [newman](https://www.npmjs.com/package/newman) to run our postman collections from command line.

#### Automate test runs

1. Install [newman](https://www.npmjs.com/package/newman) using `npm install -g newman`

2. Export collection (collection will be exported as json file)
   
    ![alt text](/assets/img/postman-automation/postnam-automation-9.png)

3. From command-line / terminal navigate to folder where the collection is exported and run `newman run {exported collection}.json`

    ![alt text](/assets/img/postman-automation/postnam-automation-10.png)


That’s it! You should be able to run this when ever there are changes on api or configure it as part of CI.


Oh the final bit! What if your boss asks you to send the report of your test results? Instead of sending results from command-line it will be useful if we can send some kind of html report, We have another friend to help us here [newman-reporter-htmlextra](https://www.npmjs.com/package/newman-reporter-htmlextra)

#### Generate HTML report

1. Install [newman-reporter-htmlextra](https://www.npmjs.com/package/newman-reporter-htmlextra) using `npm install -g newman-reporter-htmlextra`

2. From command-line / terminal navigate to folder where the collection is exported and run `newman run {exported collection}.json -r htmlextra` to generate html report (you can use `--reporter-htmlextra-export` attribute if you want to export it to a specific path, by default report will be created in same folder)

    ![alt text](/assets/img/postman-automation/postnam-automation-11.png)

3. You can see beautiful html report generated like below

    ![alt text](/assets/img/postman-automation/postnam-automation-12.png)

