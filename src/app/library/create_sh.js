const Q = require('q');
const pkg = require('../../../package');
const _ = require('lodash');

const base = `# Special Thanks to Stephen Simon :)

intUpdated=0;
intCloned=0;
intStashes=0;
intNewDirs=0;

#This function has no purpose other than making the output pretty.
function padOutput()
{
	local color="$1"
	local string="$2"
	local padchar="$3"
	if [ ! "$3" ]; then
		padchar="**"
	fi
	local pad=$(printf '%0.1s' " "{1..76})
	local padlength=80
	if [ "$3" = "--" ]; then
		pad=$(printf '%0.1s' "-"{1..76})
		string="$2 "
	fi
	tput setaf $color;
	printf '%s' "$padchar "
	if [ "$color" != "5" ]; then
		tput setaf 7;
	fi
	printf '%s' "$string"
	printf '%*.*s' 0 $((padlength - \${#string} - 3 - \${#padchar})) "$pad"
	tput setaf $color;
	printf '%s\n' "$padchar"
}

# function that outputs 80 *'s in yellow, putting any arg flips it to change the 
# background to yellow instead.
function Line() 
{
	if [ "$1" ]; then
		tput sgr 1;
	else
		tput sgr 0;
	fi
	tput setaf 3; 
	echo "********************************************************************************"
}

function resetColor()
{
	if [ "$1" ]; then
		tput sgr $1;
	else
		tput sgr 0;
	fi
	if [ "$2" ]; then
		tput setaf $2;
	else
		tput setaf 7;
	fi
}

function PullCode()
{
	tput sgr 0;
	local url=$1
	local dir=$2
	local proj=$3
	local sha=$4

	echo
	echo 
	Line 1
	padOutput "3" "$dir/$proj"
	Line 1
	echo
	resetColor 0 2

	if [ ! -d "/$root/$dir/$proj" ]; then
		echo /$root/$dir/ 
		mkdir -p /$root/$dir/
		cd /$root/$dir/
		padOutput "3" "CLONING" "--"
		git clone $url
		((intCloned++))
	else
		padOutput "3" "/$root/$dir/$proj already exists.  No need to clone." " "
		echo
	fi 
	echo
	padOutput "3" "CHANGING DIRECTORY" "--"
	cd /$root/$dir/$proj
	pwd
	((intUpdated++))
	if ! git diff-files --quiet --ignore-submodules --
	then
		echo
		resetColor 1 5
		padOutput "5" "STASHING CHANGES" "--"
		resetColor 1 2
		datenow=$(date +%Y_%m_%d_%H_%M_%S)
		git stash save "$proj$datenow" 
		((intStashes++))
	fi
	
	echo
	padOutput "3" "RESETTING" "--"
	resetColor
	git reset --hard

	echo
	padOutput "3" "FETCHING" "--"
	resetColor
	git fetch

	echo
	resetColor
	padOutput "3" "PULLING" "--"
	resetColor
	git pull

	echo
	resetColor
	padOutput "3" "Checkout" "--"
	resetColor
	git checkout $sha

	# if [ "$isStashed" = true ]; then
	# 	echo
	# 	resetColor 0 5
	# 	padOutput "5" "APPLYING STASH" "--"
	# 	resetColor
	# 	git stash apply
	# 	isStashed=false
	# fi
}

function Summary()
{
	echo
	resetColor 1 2
	echo "********************************************************************************"
	padOutput "2" "                         --FINAL REPORT--                           "
	resetColor 1 2
	echo "********************************************************************************"
	padOutput "2" "Git User:                $username"
	padOutput "2" "Root:                    $root"
	padOutput "2" "Repos Cloned:            $intCloned"
	padOutput "2" "Directories Created:     $intNewDirs"
	padOutput "2" "Repos Updated:           $intUpdated"
	padOutput "2" "Repos Stashed:           $intStashes"
	resetColor 1 2
	echo "********************************************************************************"
	padOutput "2" "Version: $version"
	resetColor 1 2
	echo "********************************************************************************"
	echo
	resetColor
	read -p "Press [enter] to exit."
	echo
	exit 0
}
`;

function createLogo() {
	var text = ""; 
	text += Writewithbreaktag('echo "   ____  _  _     ____                           _        ";');
	text += Writewithbreaktag('echo "  / ___|(_)| |_  / ___| __ _  _ __   ___  _   _ | |  ___  ";');
	text += Writewithbreaktag('echo " | |  _ | || __|| |    / __ || \'_ \\ / __|| | | || | / _ \\ ";');
	text += Writewithbreaktag('echo " | |_| || || |_ | |___| (_| || |_) |\\__ \\| |_| || ||  __/ ";');
	text += Writewithbreaktag('echo "  \\____||_| \\__| \\____|\\__,_|| .__/ |___/ \\__,_||_| \\___| ";');
	text += Writewithbreaktag('echo "                             |_|                          ";');
	return text;
}

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

function GetLogo() {
	let text = "";
	text += ""
}

function GetProject(projects) {
	let text = Writewithbreaktag("echo -e '\033[1mFollowing Git Repository will be created/updated in your directory.\033[0m'");
	text += Writewithbreaktag("echo -e '\033[1mIMPORTANT! Changes not committed will be stashed.\033[0m'");
	text += Writewithbreaktag("echo '================================================================================'");

	const longestStringLength = _.last(_.sortBy(projects, (proj) => {
		return proj.name.length
	})).name.length;

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
	let text = Writewithbreaktag("echo Version: $version");
	text += Writewithbreaktag("echo");
	return text;
}

exports.createScript = (directory, selectedGitFolders, name, comment) => {
	let codeFile = base;
	codeFile += createLogo(); 
	//assuming root is same for now.. 
	// codeFile += CreatePullCodeFunction();
	codeFile += InitializeLocalVariable(selectedGitFolders[0].file.root);
	codeFile += WriteVersionNum();
	if (comment) {
		codeFile += CreateComment(comment);
	}
	codeFile += GetProject(selectedGitFolders.map((e) => {
		if (e.file.name && e.repoInfo.root)
			return {
				name: e.file.name,
				dir: e.repoInfo.root
			}
	}));
	// codeFile += GetUsername();
	codeFile += PullCode(selectedGitFolders);
	const fileName = directory + "\\" + name + ".sh";
	return {
		fileName,
		codeFile
	}
}