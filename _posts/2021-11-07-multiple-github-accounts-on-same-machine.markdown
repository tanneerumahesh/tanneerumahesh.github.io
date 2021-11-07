---
layout: post
title: How to add multiple github accounts (like personal and work or [multiple work accounts]) on same machine
date: 2021-11-07 18:32:20 +0300
description: Adding multiple github accounts on same machine
img: # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [git, github]
---

### Problem :

There might be cases where we need to work with multiple github repos from different github accounts on same machine (like personal and work [or multiple work accounts]). we should be able to do this easily by configuring ssh configs.

### Solution :

1.  Create new ssh keys for the accounts you want to work with

    - navigate to `.ssh` folder
    - run `ssh-keygen -t ed25519 -C "test-user@test-site.com"` to generate public and private keys [**this needs to be done for all accounts**]
    - add a filename related to account which can be easily identified

2.  Update ssh config with details created in above step

    - open `config` file in `.ssh` folder
    - add the following sections for each account (if we have three accounts we need to add three host sections with different host names)

      ```
      Host hostName {any name related to account}
              HostName github.com
              User git
          IdentityFile ~/.ssh/{private file name created in above step [file without .pub extension]}
          AddKeysToAgent yes
          PreferredAuthentications publickey
          UseKeychain yes
          IdentitiesOnly yes
      ```

3.  Add key to ssh agent (so that we don't need to enter password with git actions)

    - `ssh-add -K {private file name created in step 1 [file without .pub extension]}`

4.  Add public key to github account

    - navigate to `.ssh` folder
    - open public key file [file with `.pub` extension] related to account
    - copy the content of the file to clipboard
    - navigate to github account
    - click on `settings`
    - click on `SSH and GPG keys`
    - click on `add key`
    - paste the content of the file to clipboard
    - click on `add key`
    - click on `save`

5.  Add github account to individual git repos

    - open git config in repo (`config` file in `.git` folder)
    - add/update following section with host name related to account added in step 2

      ```
      [remote "origin"]
          url = git@{hostNameRelatedToAccount}:{githubAccount}/{repoName}.git
          fetch = +refs/heads/*:refs/remotes/origin/*
      ```

    - add/update following section with username and email related to account

            ```
            [user]
                name = {username related to account}
                email = {user email related to account}
            ```

All done! we should be able to use logins from different github accounts on same machine. 
