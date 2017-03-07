let template = ({
    "core": {
        'check_callback' : true,
        'data': [],
        "themes": {
            "variant": "large"
        }
    },
    "checkbox": {
        "keep_selected_style": false
    },
    "plugins": ["wholerow", "checkbox"]
});

function treeStruct(tree, filePathObj, index, gitFolder) {
    if (filePathObj[index]) {
        let position = tree.findIndex(el => el.text == filePathObj[index]);
        if (position < 0 && index < filePathObj.length) {
            const newObj = {
                "text": filePathObj[index],
                "icon": "ti-folder",
                "children": []
            }
            var length = tree.push(newObj);
            position = length - 1;
        }
        if (index < filePathObj.length) {
            index++;
            treeStruct(tree[position].children, filePathObj, index, gitFolder);
        }
    } else if (index === filePathObj.length && gitFolder) {
        const url = gitFolder.config["remote \"origin\""] ? gitFolder.config["remote \"origin\""].url : "Repo is not store on remote"
        tree.push({
            "text": gitFolder.file.name,
            "icon": "icon-112",
            //"a_attr":  {"class": "git-folder"}, 
             "li_attr":  {"class": "git-folder"}, 
            "children": [{
                "text": "URL: " + url,
                "icon": "ti-link",
                "a_attr":  {"class": "git-url"}, 
                "state": {"disabled": true}
            }, {
                "text": "Branch: " + gitFolder.repoInfo.branch,
                "icon": "icon-11",
                "a_attr":  {"class": "git-branch"}, 
                "state": {"disabled": true}
            }, {
                "text": "SHA: " + gitFolder.repoInfo.sha,
                "icon": "icon-052",
                "a_attr":  {"class": "git-sha"}, 
                "state": {"disabled": true}
            }, {
                "text": "Date: " + gitFolder.repoInfo.committerDate,
                "icon": "ti-calendar",
                "a_attr":  {"class": "git-date"}, 
                "state": {"disabled": true}
            }, {
                "text": "Commit Message: " + gitFolder.repoInfo.commitMessage,
                "icon": "ti-info-alt",
                "a_attr":  {"class": "git-msg"}, 
                "state": {"disabled": true}
            }]
        });
    }
};

function CreateTreeStruct(gitFolder) {
    let trees = []; 
    for (let i = 0; i < gitFolder.length; i++) {
        let filePathObj = (gitFolder[i].repoInfo.root).split("\\");
        filePathObj.pop();
        treeStruct(trees, filePathObj, 0, gitFolder[i]);
    }
    return trees; 
}

exports.Create = (gitFolder) => {
    let trees = CreateTreeStruct(gitFolder); 
    template.core.data = trees;
    return template;
};

exports.GetAllSelected = (selector) => {
        //let tree = $(selector).jstree(true);
        //let selectedIds = [];
        // let selectedIds = $('.git-folder[aria-selected=true]'); 
        // $.each($('.git-folder[aria-selected=true]'), (index, ele) => {
        //     const treeObjs = tree.get_node(ele.id); 
        //     $.each(treeObjs.children, (index2, children) => {
        //         var x = children.text;
        //     })
        // })
        // console.log(selectedIds);
        //return temp; 
}