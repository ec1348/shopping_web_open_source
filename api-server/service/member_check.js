module.exports = class Check {
    checkEmail(email) {
        const re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
        const result = re.test(email)
        return result
    }
}