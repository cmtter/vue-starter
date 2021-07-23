import createError from 'axios/lib/core/createError'

function Plugin(response) {
    // const { data, config, status, request } = response
    const err = window._jappconfig_.resolveHttpException(response)
    if (err) {
        //创建异常
        throw createError(err.message, response.config, err.code, err.request, response)
    }
    return response
}
export default {
    name: 'plugin-&-whitchException',
    fn: Plugin
};
