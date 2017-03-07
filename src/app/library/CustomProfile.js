const path = require('path');
const nedb = require('nedb');
const remote = require('electron').remote;
const app = remote.app;

const db = new nedb({
    filename: path.join(app.getAppPath(), '/setting/usersettings.db'),
    autoload: true
});

if (!db.find({})) {
    SetPrimaryPalette("red");
    SetAccentPalette("deep-orange");
    SetBackGroundPalette("grey");
    SetWarnPalette("red"); 
}

exports.GetCurrentSettiong = () =>  {
    db.find({}).then();
}

exports.SetPrimaryPalette = (color) => {
    update({
        setting: "PrimaryPalette"
    }, {
        color: color
    })
}

exports.SetAccentPalette = (color) => {
    update({
        setting: "AccentPalette"
    }, {
        color: color
    })
}

exports.SetBackGroundPalette = (color) => {
    update({
        setting: "BackgroundPalette"
    }, {
        color: color
    })
}

exports.SetWarnPalette = (color) => {
    update({
        setting: "WarnPalette"
    }, {
        color: color
    })
}

function update(query, update, options, callback) {
    var deferred = Q.defer();
    db.update(query, update, options, (err, replaced) => {
        if (err) deferred.reject(new Error(err));
        deferred.resolve(replaced);
    });
    return deferred.promise;
}