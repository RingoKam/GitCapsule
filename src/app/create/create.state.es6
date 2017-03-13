const dataStore = require('../library/datastore');

export default {
    url: '/create?capsuleid',
    component: 'create',
    params: {
        capsuleid: "",
        gitFolders: []
    },
    resolve: {
        capsuleid: function ($transition$) {
            return $transition$.params().capsuleid
        },
        gitFolders: function ($transition$) {
            if ($transition$.params().capsuleid) {
                return dataStore.find({
                    _id: $transition$.params().capsuleid
                })
            }
        }
    }
}