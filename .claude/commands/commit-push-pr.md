---
allowed-tools: Bash(git checkout:*), Bash(git add:*), Bash(git status:*), Bash(git push:*), Bash(git commit:*), Bash(git branch:*)
description: Commit and push to feature branch
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`

## Your task

Based on the above changes:

1. Create a new feature branch with an appropriate name based on the changes (e.g. `feat/add-course-category`)
2. Checkout to that branch
3. Create a single commit with an appropriate message and description
4. Push the feature branch to origin
5. You have the capability to call multiple tools in a single response. You MUST do all of the above in a single message. Do not use any other tools or do anything else. Do not send any other text or messages besides these tool calls.

## Commit message rules

- Do NOT include the "🤖 Generated with Claude Code" line, the "Co-Authored-By: Claude <noreply@anthropic.com>" trailer, or any other attribution/license/signature footer in the commit message.
- The commit message must contain ONLY the summary line and description of the actual code changes — nothing else appended.
