export default {
    url: '/create?capsuleid',
    component: 'create',
    params: {
        capsuleid: ""
    },
    resolve: {
        capsuleid: function($transition$) {
            return $transition$.params().capsuleid
        }
    }
}