---
layout: post
title: Switch to different role using aws-cli
date: 2019-10-11 10:32:20 +0300
description: How to switch to different IAM role using aws-cli. # Add post description (optional)
img:  # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [aws, aws-cli, iam, mac]
---

If you ended up on this post you might be struggling to change the IAM role using aws-cli(for any reason) and found this post! i might be able to help here as i had same frustration some time back :) 

### Problem :
From aws console i can login to my account and i can switch role to **dev** to access aws resources related to **dev** environment, all looks good here. Now i want to access **dev** resources from my local as i need to run my tests against **dev** resources, as usual i ran the tests with my default credentials (configured using aws-cli) and they fail straight away with error **no access to resource**, this is because my **default** role will not have access to **dev** resources. ok i now know the problem and the solution is simple change roles, BUT its not that simple as i tried 10 different ways to change role to **dev**. Below is the solution worked for me. 

### Solution :
1. Open credentials file **~/.aws/credentials**

2. It should already have default profile section with access/secret keys [if not use `aws configure` to configure secrets]

3. Add **AssumeRole** section and a **dev** profile section in credentials file 

    ```
    [default] 
    aws_access_key_id = abc123 
    aws_secret_access_key = abc123 

    [dev]              // new profile but credentials are same as default  
    aws_access_key_id = abc123 
    aws_secret_access_key = abc123 

    [AssumeRole]                   // new section 
    role_arn = arn:aws:iam::1235634:role/dev-arm  
    source_profile = dev
    ```

4. Open config file **~/.aws/config**

5. Add **dev** profile to config file

    ```
    [default] 
    region = eu-west-1 
    
    [profile dev] // this is new profile 
    region = eu-west-1 
    ```

6. Run a sample command like `aws iam list-users --profile dev`. if your configuration is correct and you are lucky you will see users listed and you can connect to resources in **dev** role. 

- Remember you have to run all commands with `--profile dev` to tell aws-cli to use the role. if you don't want to use it always [WHICH I DON'T PREFER as you might mess with dev resources like i do!] you can run `export AWS_DEFAULT_PROFILE=dev`. now you can run commands like `aws iam list-users` with out `--profile dev`
