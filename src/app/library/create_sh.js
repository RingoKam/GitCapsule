const Q = require('q');
const pkg = require('../../../package');
const _ = require('lodash');  

function Writewithbreaktag(string) {
    return string + "\n";
};

function InitializeLocalVariable(root) {
    let text = "";
    // text += Writewithbreaktag("username=\"USER INPUT\"");
    text += Writewithbreaktag(`root=\"${root.replace(/\W/g, '')}\"`);
    text += Writewithbreaktag(`version="${pkg.name} ${pkg.version}"`);
    return text;
}

function CreateComment(comment) {
    let text = "";
    let commentsArray = comment.match(new RegExp('.{1,' + 70 + '}', 'g'));
    text += Writewithbreaktag("echo '********************************************************************************'");
    text += Writewithbreaktag("echo '**                                --COMMENT--                                 **'");
    text += Writewithbreaktag("echo '********************************************************************************'");
    for (var index in commentsArray) {
        text += Writewithbreaktag(`padOutput "7" "${commentsArray[index]}"`);
    }
    text += Writewithbreaktag("echo '********************************************************************************'");
    return text;
}

function PullCode(selectedGitFolders) {
    let text = "";
    for (let i = 0; i < selectedGitFolders.length; i++) {
        let dir = ParseDirectory(selectedGitFolders[i].file.dir);
        text += Writewithbreaktag(`PullCode \"${selectedGitFolders[i].config["remote \"origin\""].url}\" \"${dir}\" \"${selectedGitFolders[i].file.base}\" \"${selectedGitFolders[i].repoInfo.sha}\"`);
        // text += Writewithbreaktag("PullCode \"$username@sourcecontrol.amtrustservices.com:" + selectedGitFolders[i].config["remote \"origin\""].url.split(":").pop() + "\" " + "\"" + dir + "\" " + "\"" + selectedGitFolders[i].file.base + "\" " + "\"" + selectedGitFolders[i].repoInfo.sha + "\"");
    }
    return text;
}

function ParseDirectory(directory) {
    let array = directory.split("\\");
    let dir = "";
    for (let i = 1; i < array.length; i++) {
        dir += array[i]
        if (i != array.length - 1)
            dir += "/";
    }
    return dir;
}

function GetProject(projects) {
    let text = Writewithbreaktag("echo -e '\033[1mFollowing Git Repository will be created/updated in your directory.\033[0m'");
    text += Writewithbreaktag("echo -e '\033[1mIMPORTANT! Changes not committed will be stashed.\033[0m'");
    text += Writewithbreaktag("echo '================================================================================'"); 

    const longestStringLength = _.last(_.sortBy(projects, (proj) => {return proj.name.length })).name.length; 

   projects.forEach((project) => {
        let padding = Array(1 + longestStringLength - project.name.length).join("-");  
        text += Writewithbreaktag(`echo "${project.name} ${padding}-> ${project.dir}"`);
    }); 
    text += Writewithbreaktag("echo '================================================================================'"); 
    text += Writewithbreaktag("read -p \"Press enter to continue...\"");
    return text;
}

// function GetUsername() {
//     let text = "";
//     text += Writewithbreaktag("echo")
//     text += Writewithbreaktag("read -p \"Enter your GIT username, then press enter: \" username")
//     return text;
// }

function WriteVersionNum() {
    let text =  Writewithbreaktag("echo Version: $version");
    text += Writewithbreaktag("echo");
    return text;
}

exports.createScript = (directory, selectedGitFolders, name, comment) => {
    // let codeFile = CreateGitCapsuleLogo();
    //assuming root is same for now.. 
    // codeFile += CreatePullCodeFunction();
    let codeFile = InitializeLocalVariable(selectedGitFolders[0].file.root);
    codeFile += WriteVersionNum();  
    if (comment) {
        codeFile += CreateComment(comment);
    }
    codeFile += GetProject(selectedGitFolders.map((e) => {
        if(e.file.name && e.repoInfo.root)
            return { name: e.file.name, dir: e.repoInfo.root }
    }));
    // codeFile += GetUsername();
    codeFile += PullCode(selectedGitFolders);
    const fileName = directory + "\\" + name + ".sh";
    return {
        fileName,
        codeFile
    }
}