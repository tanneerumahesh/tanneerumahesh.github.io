---
layout: post
title: Handling proxy issue while installing cypress through NPM
date: 2020-01-02 11:32:20 +0300
description: Handling proxy issue while installing cypress through NPM
img:  # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [cypress, proxy, npm]
---



### Problem  
If you are under a corporate proxy some times that proxy might not allow you to download cypress through npm install and cypress can fail with below error.

```
Installing Cypress (version: 3.4.1) 
×  Downloading Cypress     
   → Cypress Version: 3.4.1 
    Unzipping Cypress       
    Finishing Installation  
The Cypress App could not be downloaded. 
Does your workplace require a proxy to be used to access the Internet? If so, you must configure the HTTP_PROXY environment variable before downloading Cypress. Read more: https://on.cypress.io/proxy-configuration 
Otherwise, please check network connectivity and try again: 
---------- 
URL: https://download.cypress.io/desktop/3.4.1?platform=win32&arch=x64 
Error: tunneling socket could not be established, cause=write EPROTO 16676:error:1408F10B:SSL routines:ssl3_get_record:wrong version number:c:\ws\deps\openssl\openssl\ssl\record\ssl3_record.c:332: 
---------- 
Platform: win32 (10.0.16299) 
Cypress Version: 3.4.1 
```

### Solution
- As a permanent solution talk to your infracture /security teams! And ask them to add cypress domain to proxy white list.

- As a temparory solution
    1. Download the zipfile manually by accessing link [https://download.cypress.io/desktop/3.4.1?platform=win32&arch=x64] from browser
    2. Set downloaded file as environment variable for CYPRESS_INSTALL_BINARY using 'export CYPRESS_INSTALL_BINARY=/C/Users/dh206377/Desktop/Tools/cypress.zip'
    3. Run `npm i` now and cypress should be installed successfully. 
