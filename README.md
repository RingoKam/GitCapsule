![gitcapsules](https://github.com/RingoKam/GitCapsules/blob/master/screenshots/logo.png "GitCapsule")
# Git Capsules ![electron](https://img.shields.io/badge/ELECTRON-1.4.14-blue.svg) ![Angular](https://img.shields.io/badge/ANGULAR-1.6.1-red.svg) ![nedb](https://img.shields.io/badge/nedb-1.8.0-lightgrey.svg)
------
Stuck on building an application that has dependency on **multiple repos** with **predefined folder structure**? Wants to bundle your **git repositories** and **redeploy** it on to another pc? Git Capsules can help!  

### Git Capsules is a small desktop application that can read your Git repositories and reproduce them on another machine with the same folder structure.

Features:
•	It gives you the ability to select your Git Repos Folder and create a bash script based on the Repo [master origin] URL and commit Id. The Bash script can be run on any machine and will… 
1.	Recreate the same folder structure and clone repos (if they doesn’t exist)
2.	Stash changes (if a repo exists and contains uncommitted changes) 
3.	Checkout a detached head at the designated Commit Id
•	Every bash script generated can be saved as JSON and recreated. Next time you need another build with the same repos but with different commit, just refresh and Export. See example Below.  


##### Redeploy your git env in a flash in 3 simple steps:
1. [Select your git repos directory. it can be a root directory of multiple git repos.](#open-git-repos-directory)  
2. [Checked off git repos you wish to export/copy, Fill out bash file info  on the right.](#select-git-repos)
3. [run generated bash script on to another pc.](#run-bash-script)
##### Updated your git repos? need to create bash script with updated repos again? No problem!
1. [Recreate or Update Bash](#recreate-or-update-bash)
------
## Open Git Repos Directory
![step1](https://github.com/RingoKam/GitCapsules/blob/master/screenshots/step1gif.gif)
Click create and select your git projects directory. It can be a root directory of all your git repos or just 1. Git Capsules will retrieve all valid git repos with [Remote Origin] and display on screen with folder name and current commit. 

## Select Git Repos
![step2](https://github.com/RingoKam/GitCapsules/blob/master/screenshots/step2gif.gif)
Select the git repos you wish to export/save. Checked off commit will be included in bash script. Fill out the bash script info form.

<dl>
<dt>
Capsules (dropdown)
</dt>
<dd>
Collection of repos. If no repos are selected, app would not save a record. 
</dd>
<dt>
Filename (textfield)
</dt>
<dd>
Name of Bash File.
</dd>
<dt>
ExportLocation (dialog)
</dt>
<dd>
export location of bash file.
</dd>
<dt>
Comment(textarea)
</dt>
<dd>
Optional, comment will display when user open bash script. 
</dd>
</dl>

## run bash script
![step3](https://github.com/RingoKam/GitCapsules/blob/master/screenshots/step3gif.gif)
Open bash file. Press enter. wola! Bash will...
1. Clone (if repo doesnt exist) 
2. Stash your local changes (if repo exist)
3. Checkout the commit you specified in the app. 
4. A report will be generated at the end.

------

## Recreate or Update Bash
![ManageScreen](https://github.com/RingoKam/GitCapsules/blob/master/screenshots/recreate.gif)
Select bash script you wish to update/re-create. Click on the refresh button. It will refresh and grab current commit you are on. Follow [step2 and step3 from then](#select-git-repos), file out form, export and run bash script. 
