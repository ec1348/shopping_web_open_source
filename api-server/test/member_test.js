process.env.NODE_ENV = "test" 
const app = require('../app')
const db = require('../models/connection_db')

const chai = require('chai')
const chaiHttp = require('chai-http')

const onTime = require('../utils/time')

// Assertion
chai.should()
chai.use(chaiHttp)

describe('Register API', function(){
    before(()=> {
        db.query("DELETE FROM member_info WHERE name = 'testdata1'")
    })

    it('Should successfully register', function(){
        chai.request(app)
            .post('/api/member')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                name : 'testdata1',
                email : 'test@gmail.com',
                password : 'adfjadfadfcagh',
                create_date : onTime()
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.result.should.have.property('status').eql('Register successfully')
            })
    })
    it('Should fail the register if the email is registered', function(){
        chai.request(app)
            .post('/api/member')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                name : 'testdata1',
                email : 'testEmail@gmail.com',
                password : 'adfjadfadfcagh',
                create_date : onTime()
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.result.should.have.property('err').eql('The email address has registered.')
            })
    })
})

describe('Login API', () =>{
    it('Should Login Successfully.', () => {
        chai.request(app)
            .post('/api/member/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                name : 'testdata',
                email : 'testEmail@gmail.com',
                password : 'adfjadfadfcagh'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.should.have.header('token')
            })
    })
    it('Should return error message if email is not registered.', () => {
        chai.request(app)
            .post('/api/member/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                name : 'testdata',
                email : 'notRegistered@gmail.com',
                password : 'adfjadfadfcagh'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.result.should.have.property('err').eql('Email is not registered')
            })
    })
    it('Should return error message if password is wrong.', () => {
        chai.request(app)
            .post('/api/member/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                name : 'testdata',
                email : 'testEmail@gmail.com',
                password : 'adfjadfadfcah'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.result.should.have.property('err').eql('Please enter the correct password')
            })
    })
})