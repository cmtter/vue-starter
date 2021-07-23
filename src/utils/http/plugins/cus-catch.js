import { Message } from 'element-ui'

function Plugin(error, cus) {
    if (!cus) {
        const { message = '发生未知错误' } = error || {}
        Message.error(`${message}`)
    } else {
        if (typeof cus.args[0] === 'function') {
            cus.args[0](error)
        }
    }
    return error
}

export default {
    name: 'catch',
    fn: Plugin
};