# Changelog 

## 0.2.1 - 2023-03-04

- Update all dependencies, esp. ky to use pinned esm.sh version of v110, to not get errors with deno.lockfile when using this library

## 0.2.0 - 2022-10-17 

- Make page prop in DopplerResponse optional (to fit with secrets response, which seem to not have a page prop in response)
- Create correct type for doppler secrets from api and add it to all relevant functions
- Add `getSecretsMap` shortcut function for easier secrets access from the outside!

## 0.1.2 - 2022-10-15 

- Refactor all import paths inside the lib code to not use the import map 
  (seems broken when using this module outside of this repos)

## 0.1.1 - 2022-10-15 

- Fix syntax highlighting in Readme.md

## 0.1.0 - 2022-10-15 

First release, Implements functions from doppler api: 

- getConfigs
- getSecrets
- retrieveSecret/getSecret