const dataStore = require('../library/datastore');
const nameStore = require('../library/capsule_name_store');

export default {
    url: '/home?capsulename',
    component: 'home',
    params: {
        dbRecords: [],
        dbCapsuleNames: [],
        capsulename: ""
    },
    resolve: {
        dbRecords: () => {
            return dataStore.find({});
        },
        dbCapsuleNames: () => {
            return nameStore.find({});
        },
        capsulename: function($transition$) {
            return $transition$.params().capsulename
        }
    }
}