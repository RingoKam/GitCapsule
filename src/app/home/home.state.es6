const dataStore = require('../library/datastore');
const nameStore = require('../library/capsule_name_store');

export default {
    url: '/home',
    component: 'home',
    params: {
        dbRecords: [],
        dbCapsuleNames: []
    },
    resolve: {
        dbRecords: () => {
            return dataStore.find({});
        },
        dbCapsuleNames: () => {
            return nameStore.find({});
        }
    }
}