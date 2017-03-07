const dataStore = require('../library/datastore');
const capsuleNameStore = require('../library/capsule_name_store');

export default {
    template: require("./home.html"),
    controller: homeController,
    controllerAs: "model"
}

function homeController() {

    var model = this;

    model.$onInit = function () {
        GetCapsuleData();
        GetCapsuleNameData();
    };

    model.$onChanges = function (changesObj) {};
    model.$onDestory = function () {};

    model.onUpdateCapsuleName = (name) => {
        capsuleNameStore.insertdb(name).then((d) => {
            GetCapsuleNameData();
        })
    }

    model.onUpdateCapules = (obj) => {
        dataStore.insertdb(obj).then((d) => {
            GetCapsuleData();
        })
    }

    function GetCapsuleData() {
        dataStore.find({}).then((data) => {
            model.Capsules = data;
        }).catch((err) => {
            console.log(err)
        });
    }

    function GetCapsuleNameData() {
        capsuleNameStore.find({}).then((data) => {
            model.CapsuleName = data;
        });
    }
}
