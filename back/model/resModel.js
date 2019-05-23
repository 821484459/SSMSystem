class BaseModel {
    constructor(data, message) {
        // 传入的data是个对象类型，message是字符串类型，但如果第一个就传字符串也要兼容
        // 因为失败的时候只传message不传data
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            // 对象
            this.data = data
        }
        if (message) {
            // 消息
            this.message = message
        }
    }
}


class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message) //执行父类的构造函数
        this.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1
        
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}