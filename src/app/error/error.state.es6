export default {
    url: '/error',
    component: 'error',
     params: {
        error: {}
    },
    resolve: {
        error: function($transition$) {
            return $transition$.params().error
        }
    }
}