module.exports = class Test {
    testFun(req, res, next) {
        res.json({
            requsetBody: req.body
        })
    }
}