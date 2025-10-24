![Git image](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1200px-Git-logo.svg.png)

# Git - The Stupid Content Tracker

Git commands in terminal.

## git init

Initializes a local folder as a repository.

```sh
$ git init
Initialized Git repository in /Users/b00tc4mp/workspace/neoland-202510/.git/
```

## git remote add origin repo-address

Connects the local repository to its origin in GitHub.

```sh
$ git remote add origin https://github.com/manuelbarzi/neoland-202510
```

## git pull

Pulls all the changes from remote (origin) repository.

```sh
$ git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=<remote>/<branch> master
```

## git branch -a

Shows all the branches in the repository.

```sh
$ git branch -a
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
```

## git switch branch-name

Changes the branch to the given one.

```sh
$ git switch main
Already on 'main'
Your branch is up to date with 'origin/main'.
```

## git branch

Shows the local branches.

```sh
$ git branch   
* main
```

## git status

Shows the status of files in local repo.

```sh
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        staff/

nothing added to commit but untracked files present (use "git add" to track)
```

## git add content-name

Adds content to staging.

```sh
$ git add staff
```

## git config setting

Configures settings in local git.

```sh
$ git config user.email "manuelbarzi@gmail.com"
$ git config user.name "Manuel Barzi"
```

## git commit -m message

Consolidates the changes in local repository.

```sh
$ git commit -m "add bash and git docs"
```

## git push

Pushes the changes from local to remote repository (origin).

```sh
$  git push
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 10 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (9/9), 2.05 KiB | 2.05 MiB/s, done.
Total 9 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/manuelbarzi/neoland-202510
   c0018b0..b123f3d  main -> main
```

## git log

Shows commits history ordered descending by time.

```sh
$ git log
git log
commit bf5f69e979cdd9fec2a4d7ba1c8410a6d9acb602 (HEAD -> main, origin/main, origin/HEAD)
Author: Manuel Barzi <manuelbarzi@gmail.com>
Date:   Thu Oct 23 22:04:50 2025 +0200

    add git commit and git push commands to git doc

commit b123f3d3f8d81e2afbbb63eda8e080a45308dfa7
Author: Manuel Barzi <manuelbarzi@gmail.com>
Date:   Thu Oct 23 21:52:11 2025 +0200

    add bash and git docs

commit c0018b0a7fcd2974422226e792bbc4c080df6e91
Author: manuelbarzi <manuelbarzi@gmail.com>
Date:   Thu Oct 23 20:10:57 2025 +0200

    Initial commit
```