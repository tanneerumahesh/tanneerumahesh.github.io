---
layout: post
title: TeamCity - Do not run a build while another build is in progress 
date: 2019-10-29 12:38:20 +0300
description: TeamCity - Do not run a build while another build is in progress. # Add post description (optional)
img:  # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [TeamCity]
---

### Problem
I came across this issue in TeamCity today where as part of CI my automation tests are running against dev environment and sometimes tests are failing because deployment build triggered while test build is in progress. in this case my tests will fail because site will be down for few mins as part of deployment. So I need a way to tell TeamCity that do not run deployment build while automation test build is in progress.   

### Solution
To solve this problem I need to configure builds in a way that one build should not run while other build is in progress. Apparently it's not that straight forward in TC [at least for me!], I tried different ways but what worked for me is locking builds using shared resources. Below are the steps to configure this.

1.Create a shared resource at project level : **Project -> Shared Resources -> Add a shared resource**

2.Add a Resource name and select **Resource with quota** from resource type 

3.Enter 1 in resource quota field 

4.Save resource 

![alt text](/assets/img/tc-save-resource.png)

5.Navigate to Deployment build configuration  

6.Go to Build **Features -> Add build feature -> Shared resources -> Add Lock** 

7.Select resource name created above and select **Write Lock** in lock type 

8.Save Lock

![alt text](/assets/img/tc-save-lock.png)

9.Repeat steps 5-8 for automation tests build 

DONE :  only one of these builds will run at a time now. 

 