---
layout: post
title: Setup cucumberJS in VS Code (with navigation to steps and step definitions generation)
date: 2021-11-09 11:32:20 +0300
description: Setup cucumberJS in VS Code (with navigation to steps and step definitions generation)
img: # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [VS Code, cucumberJS, Gherkin]
---

### Problem :

While using cucumberJS in VS Code we have to navigate to the step definition file (from steps in features) and generate the step definitions (rather than writing steps defs manually to save time!). while this is all possible it is not very straight forward to setup.  


### Solution :

1.  Install Cucumber extensions 

    - Install [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) extension to support cucumber JS actions
    - Install [Cuke Step Definition Generator](https://marketplace.visualstudio.com/items?itemName=muralidharan92.cuke-step-definition-generator) extension to generate step definitions from feature files.

2.  Add bellow settings to VS Code workspace settings.json file (`note: it seems there is a bug with extension where settings in user's settings are not loaded correctly. so we need to add bellow settings to VS Code workspace settings.json file`)

    ```json
    {
        "cucumberautocomplete.steps": [
            "steps/*.ts",
            "hooks/*.ts"
        ],
        "cucumberautocomplete.syncfeatures": "features/*feature",
        "cucumberautocomplete.strictGherkinCompletion": false,
        "cucumberautocomplete.smartSnippets": true,
        "cucumberautocomplete.stepsInvariants": true
    }
    ```
    - update paths in `cucumberautocomplete.steps` with relative paths to your steps/hooks folders
    - update paths in `"cucumberautocomplete.syncfeatures"` with relative paths to your features folders 

3.  restart VS Code

    - To navigate to step definitions from feature files use `CTRL(or CMD) + click` on step in feature file.
    - To generate step definitions from feature files, select step and click on `Generate step definitions` link on top right 

    


