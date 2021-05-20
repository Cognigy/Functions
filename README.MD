# Introduction

This repository contains multiple examples that show how to work with Functions.

## Overview

This repository contains the source code of existing [Functions](https://docs.cognigy.com/docs/cognigy-functions-1) which can be used as blueprints for further developments. Therefore, all of them are provided under the [MIT license](./LICENSE).

You are free to add a new Function by creating a feature branch or suggest changes on already published modules.


## Approval Process

If you want us to approve your code, please note the following approval process:

1. Add a `README.md` to your Function and describe it in detail.
2. Check your code for hardcoded passwords, tokens or outdated JavaScript/TypeScript usage (e.g. `var foo;`).
3. Create a new Pull Request for your Function feature branch.
4. Send all information and data, which are required to use the code, to the following E-Mail address:
    - support at cognigy.com

**Important:** \
Please note, that Cogngiy does not provide enterprise support for developed Functions. This repository is licensed under MIT, in which the community is responsible for the shared code. If you found a bug or want to improve yet developed functionalities, please don't hesitate to create a branch.

### Create a new Function or fix a bug

In order to create a new Function, please create a new feature branch:

- `git checkout -b feature/<your-feature>`

If you want to fix an existing one, please create a bug branch:

- `git checkout -b bug/<module-name>`

---

Every Transformer example contains a ``function.ts`` file, whose contents can simply be copied into the Function of the specified Endpoint. Every Function also contains its own README.MD file with more details about the specific example.
