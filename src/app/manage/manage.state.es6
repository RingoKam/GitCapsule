const dataStore = require('../library/datastore');

export default {
    url: '/manage?dbRecords',
    component: 'manage',
    params: {
        dbRecords: []
    },
    resolve: {
        dbRecords: () => {
            return dataStore.find({}); 
        }
    }
}
