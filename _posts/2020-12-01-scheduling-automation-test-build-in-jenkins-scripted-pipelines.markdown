---
layout: post
title: Scheduling automation test builds in jenkins
date: 2020-12-01 15:32:20 +0300
description: Scheduling automation test build in jenkins
img:  # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [jenkins, ci]
---

### What :
We need to schedule builds in CI pipelines when we want to run automation tests on a schedule basis, this is straight forward if we want to do it through UI for ci tools but when it comes to Jenkins `scripted pipelines` we need to add some code (couple of lines!) to do it. 

### How :


1. Define schedules: we can define schedules using `pipelineTriggers` property with [corn format](https://en.wikipedia.org/wiki/Cron)

    ```
    Example: 

    // this will trigger builds at 7 AM, 12 PM, 4 PM (we can add as many as we can!)
    def scheduledTriggers = [pipelineTriggers([cron('0 7 * * * \n 0 12 * * * \n 0 16 * * *')])]
        
    ```

2. Add pipeline triggers to properties: we need to pass schedules defined above tp `properties` so that schedules will be picked up by jenkins

    ```
    Example: 

    // this will trigger builds at 7 AM, 12 PM, 4 PM (we can add as many as we can!)
    def scheduledTriggers = [pipelineTriggers([cron('0 7 * * * \n 0 12 * * * \n 0 16 * * *')])]
        
    properties([scheduledTriggers])
    ```

### FAQs

- How can i add a trigger in declarative pipelines ?
   
    - using `triggers` property
   
    ```
    Example: 

    triggers {
        cron('0 7 * * * \n 0 12 * * * \n 0 16 * * *')
    }
    ```

- I don't know much about corn Jobs ?

    - we can use [https://crontab.guru/](https://crontab.guru/) to understand corn schedules and create schedules