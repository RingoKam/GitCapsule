const dataStore = require('../library/datastore');
const nameStore = require('../library/capsule_name_store');

export default {
    url: '/manage?dbRecords',
    component: 'manage',
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