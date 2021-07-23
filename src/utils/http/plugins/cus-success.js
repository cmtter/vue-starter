import { Message } from 'element-ui'

function Plugin(response, orgReponse, message) {
    if (message) {
        Message.success(`${message}`)
    }
    return response
}

export default {
    name: 'success',
    fn: Plugin
};