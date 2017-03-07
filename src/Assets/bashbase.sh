# Special Thanks to Stephen Simon :)

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
	printf '%*.*s' 0 $((padlength - ${#string} - 3 - ${#padchar})) "$pad"
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

echo "   ____  _  _     ____                           _        ";
echo "  / ___|(_)| |_  / ___| __ _  _ __   ___  _   _ | |  ___  ";
echo " | |  _ | || __|| |    / _\` || '_ \ / __|| | | || | / _ \ ";
echo " | |_| || || |_ | |___| (_| || |_) |\__ \| |_| || ||  __/ ";
echo "  \____||_| \__| \____|\__,_|| .__/ |___/ \__,_||_| \___| ";
echo "                             |_|                          ";
