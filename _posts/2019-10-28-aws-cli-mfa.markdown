---
layout: post
title: Using MFA with aws cli to switch roles 
date: 2019-10-28 12:38:20 +0300
description: Using MFA with aws cli to switch roles. # Add post description (optional)
img:  # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [aws, aws-cli, iam, mfa, mac]
---

### Problem :
If we have MFA(multi factor authentication) setup enabled on AWS console then we need to generate temporary access/secret keys and session token with MFA to access aws services through aws cli. lets see how we can do it!.   

### Solution :
1. Get MFA device arn from AWS console 
   - Click on account name  -> click on **My security credentials** 
   ![alt text](/assets/img/aws_sec_creds.png)

2. Get device ARN from 'Assigned MFA Device' section in 'Multi-factor authentication (MFA)' section 
    ![alt text](/assets/img/aws_mfa.png)

3. Run below command to get temp credentials  [by replacing arn and token code] 
```
aws sts assume-role --role-arn {Role ARN} --role-session-name {Session name}  --serial-number {MFA device ARN from above step} --token-code {token code} 
```
Note: duration can be set between 900 and 129600 using --duration-seconds 129600 [this might vary based on role configuration. ] 

4. Above command should output access/secret/session tokens which should look like below 
```
{ 
    "Credentials": { 
        "AccessKeyId": "ASIA56SNEE5Y3SEU4K6S", 
        "SecretAccessKey": "0R/eUqKTavYUKm6dMXiASQP5hwygaxJCi/FrfvXe", 
        "SessionToken": "FQoGZXIvYXdzEHcaDAwcmHZVDwstu1jUnCL1AYJJF8WY98Xw4vQ/bWvU5bfHqjtgp0ras2JSD9TBKdtdLjnMcSDweK4pwkMPVmKjSLBVqfh0t/p5WKJsKTvmhiEoUBiy7gzaBGfOC8Ue+XG+6SYt1N7etbYJ/5+F4xPFfns36dCAy1KULTD+7FH9/Wt4tHK5xetFSmD+jgf2z5H3uHhkR4khd7OAdN1mp+YOLoHZfYpV3FgdmOozFtXKi2YWg7IK+2BQj2N2A/2kaCizE29UMWAEVZhO/8tE4kf/q/XrvWt1+SAb/7nZRUhw1Qu5vfpvEzvkMOfYSE0YNZbs/5Cy4MXZ5A9g00OpHcytAOZ8Sga1KL65nO0F", 
        "Expiration": "2019-10-16T14:35:58Z" 
    }, 
    "AssumedRoleUser": { 
        "AssumedRoleId": "FRESCVHHNBGFFF45FRS:testRole", 
        "Arn": "arn:aws:sts::65764765765:assumed-role/AccessToTestDev/testRole" 
    } 
} 
``` 
<br>
5. Use access and secret keys from above step to connect to AWS resources  
    - Note:  keep in mind that there is an expiration for session token so when token expired we need to refresh the token again 