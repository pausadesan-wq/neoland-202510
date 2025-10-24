![BASH image](https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Gnu-bash-logo.svg/1200px-Gnu-bash-logo.svg.png)

# BASH

Commands in BASH terminal.

## pwd

Path to working directory.

```sh
$ pwd
/Users/b00tc4mp/workspace
```

## ls

List files and folders (directories).

```sh
$ ls
Desktop		Downloads	Movies		Pictures	workspace
Documents	Library		Music		Public
```

## ls -l

List files and folders with details.

```sh
$ ls -l
total 0
drwx------@  4 b00tc4mp  staff   128 Oct 22 17:01 Desktop
drwx------@  4 b00tc4mp  staff   128 Oct 17 13:03 Documents
drwx------+  8 b00tc4mp  staff   256 Oct 22 17:01 Downloads
drwx------@ 88 b00tc4mp  staff  2816 Oct 10 18:51 Library
drwx------   5 b00tc4mp  staff   160 Oct 22 16:58 Movies
drwx------+  4 b00tc4mp  staff   128 Oct 16 10:50 Music
drwx------+  5 b00tc4mp  staff   160 Oct 21 18:50 Pictures
drwxr-xr-x+  4 b00tc4mp  staff   128 Sep 30 18:51 Public
drwxr-xr-x  11 b00tc4mp  staff   352 Oct 22 21:32 workspace
```

## mkdir folder-name

Creates a folder with the provided name.

```sh
$ mkdir workspace
```

## touch file-name

Creates and empty file with the given name.

```sh
$ touch readme.txt
```

## chmod rwx file-name/folder-name

Updates permissions in given file or folder.

```sh
$ chmod 700 readme.txt
```

## nano file-name

Opens a given file in the Nano editor.

```sh
$ nano readme.txt
```

## rm file-name

Removes a given file from system.

```sh
$ rm readme.txt
```

## rmdir folder-name

Removes a given folder when is empty.

```sh
$ rmdir temp
```

### cd folder-name

Changes from current folder to the given folder path.

```sh
$ cd workspace
```

### ls -a

Shows visible and hidden files and folders in given path.

```sh
$ ls -a
.       ..      .git    staff
```