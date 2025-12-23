---
title: "GitHub Wiki Publishing Workflow Setup"
category: "configuration"
tags: ["github-actions", "wiki", "ci-cd", "authentication"]
date: "2024-12-23"
solved_by: "Cursor AI"
severity: "high"
---

# GitHub Wiki Setup Guide

This guide explains how to set up the automated Wiki publishing workflow for this repository.

## Problem

The "Publish Docs to Wiki" GitHub Actions workflow requires authentication to push content to the repository wiki. By default, the `GITHUB_TOKEN` provided by GitHub Actions doesn't have write access to wikis, resulting in a 403 permission error.

## Solution

Follow these steps to configure the workflow properly:

### Step 1: Enable and Initialize the Wiki

1. Navigate to your repository on GitHub
2. Go to the **Settings** tab
3. Scroll down to the **Features** section
4. Enable **Wikis** if not already enabled
5. Click on the **Wiki** tab in your repository
6. Click **Create the first page**
7. Add any content (even a placeholder) and save the page

This initializes the wiki repository, which is required for the workflow to function.

### Step 2: Create a Personal Access Token (PAT)

1. Go to your GitHub settings: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Give it a descriptive name (e.g., "Wiki Publishing Token")
4. Set an expiration date (or choose "No expiration" if appropriate)
5. Select the following scope:
   - ✅ **repo** (Full control of private repositories)
6. Click **Generate token**
7. **Copy the token immediately** (you won't be able to see it again)

### Step 3: Add the Token as a Repository Secret

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Set the name as: `WIKI_TOKEN`
5. Paste the Personal Access Token you created in Step 2
6. Click **Add secret**

### Step 4: Verify the Setup

Once the token is configured:

1. Make any change to files in the `docs/` directory
2. Commit and push to the `main` branch
3. Go to **Actions** tab and watch the "Publish Docs to Wiki" workflow run
4. If successful, your wiki will be updated with the latest documentation

## How It Works

The workflow automatically:

1. Checks out your repository code
2. Checks out the wiki repository using the `WIKI_TOKEN`
3. Syncs content from the `docs/` directory to the wiki
4. Renames `docs/README.md` to `Home.md` (the wiki landing page)
5. Commits and pushes changes to the wiki repository

## Troubleshooting

### "Wiki repository not found or not initialized"

Make sure you've completed Step 1 and created at least one page in the wiki via the GitHub UI.

### "Permission denied" or "403 error"

Check that:
- The `WIKI_TOKEN` secret exists and is named correctly
- The Personal Access Token has the `repo` scope
- The token hasn't expired

### Changes not appearing in the wiki

- Check the Actions tab for workflow run details
- Verify that your changes are in the `docs/` directory
- Ensure you're pushing to the `main` branch

## Security Notes

- Personal Access Tokens have broad permissions - store them securely
- Consider using tokens with expiration dates and renew them periodically
- Repository secrets are encrypted and only accessible to workflows
- Never commit tokens directly in your code or configuration files

## Alternative: Fine-Grained PAT

For better security, you can use a Fine-Grained Personal Access Token:

1. Go to https://github.com/settings/tokens?type=beta
2. Click **Generate new token**
3. Set repository access to only the specific repository
4. Under "Repository permissions", set:
   - Contents: Read and write
   - Metadata: Read-only
5. Generate and add as the `WIKI_TOKEN` secret as described above
