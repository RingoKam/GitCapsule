let gitFolderInfo = require('../library/git_folder_info');

export class GitFolderInfoService {

    GetGitFolders(directory) {
        return gitFolderInfo.GitFolders(directory); 
    }

    GetFileInfo(directory){
        return gitFolderInfo.GetFileInfo(directory); 
    }
}