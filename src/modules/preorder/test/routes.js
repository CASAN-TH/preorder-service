'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Preorder = mongoose.model('Preorder');

var credentials,
    token,
    mockup;

describe('Preorder CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            orderno: "order001",
            orderstatus: false,
            team_id: 'teamid01',
            customer: {
                firstname: 'casan',
                lastname: 'casann',
                tel: '022225555',
                address: [
                    {
                        houseno: "55/7",
                        village: "casa-city",
                        street: "lumlukka Road",
                        subdistrict: "บึงคำพร้อย",
                        district: "lumlukka",
                        province: "phathumthani",
                        zipcode: "12150"
                    }
                ]
            },
            items: [
                {
                    name: 'ลิปติก',
                    option: [
                        {
                            name: 'สี',
                            value: [{
                                name: '#01',
                                qty: 2,
                            }],
                        }
                    ],
                    price: 100,
                    amount: 200
                }
            ],
            totalamount: 200,
            user_id: "user001",
            paymenttype:
            {
                name: "ปลายทาง"
            }
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Preorder get use token', (done)=>{
        request(app)
        .get('/api/preorders')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res)=>{
            if (err) {
                return done(err);
            }
            var resp = res.body;
            done();
        });
    });

    it('should be Preorder get by id', function (done) {

        request(app)
            .post('/api/preorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/preorders/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.orderno, mockup.orderno);
                        assert.equal(resp.data.customer.firstname, mockup.customer.firstname);
                        assert.equal(resp.data.customer.lastname, mockup.customer.lastname);
                        assert.equal(resp.data.customer.tel, mockup.customer.tel);

                        assert.equal(resp.data.customer.address[0].houseno, mockup.customer.address[0].houseno);
                        assert.equal(resp.data.customer.address[0].village, mockup.customer.address[0].village);
                        assert.equal(resp.data.customer.address[0].street, mockup.customer.address[0].street);
                        assert.equal(resp.data.customer.address[0].subdistrict, mockup.customer.address[0].subdistrict);
                        assert.equal(resp.data.customer.address[0].district, mockup.customer.address[0].district);
                        assert.equal(resp.data.customer.address[0].province, mockup.customer.address[0].province);
                        assert.equal(resp.data.customer.address[0].zipcode, mockup.customer.address[0].zipcode);

                        assert.equal(resp.data.items[0].name, mockup.items[0].name);
                        assert.equal(resp.data.items[0].option[0].name, mockup.items[0].option[0].name);
                        assert.equal(resp.data.items[0].option[0].value[0].name, mockup.items[0].option[0].value[0].name);
                        assert.equal(resp.data.items[0].option[0].value[0].qty, mockup.items[0].option[0].value[0].qty);
                        assert.equal(resp.data.items[0].price, mockup.items[0].price);
                        assert.equal(resp.data.items[0].amount, mockup.items[0].amount);
                        assert.equal(resp.data.totalamount, mockup.totalamount);
                        assert.equal(resp.data.user_id, mockup.user_id);
                        assert.equal(resp.data.paymenttype.name, mockup.paymenttype.name);
                        done();
                    });
            });

    });

    it('should be Preorder post use token', (done)=>{
        request(app)
            .post('/api/preorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.orderno, mockup.orderno);
                assert.equal(resp.data.customer.firstname, mockup.customer.firstname);
                assert.equal(resp.data.customer.lastname, mockup.customer.lastname);
                assert.equal(resp.data.customer.tel, mockup.customer.tel);

                assert.equal(resp.data.customer.address[0].houseno, mockup.customer.address[0].houseno);
                assert.equal(resp.data.customer.address[0].village, mockup.customer.address[0].village);
                assert.equal(resp.data.customer.address[0].street, mockup.customer.address[0].street);
                assert.equal(resp.data.customer.address[0].subdistrict, mockup.customer.address[0].subdistrict);
                assert.equal(resp.data.customer.address[0].district, mockup.customer.address[0].district);
                assert.equal(resp.data.customer.address[0].province, mockup.customer.address[0].province);
                assert.equal(resp.data.customer.address[0].zipcode, mockup.customer.address[0].zipcode);

                assert.equal(resp.data.items[0].name, mockup.items[0].name);
                assert.equal(resp.data.items[0].option[0].name, mockup.items[0].option[0].name);
                assert.equal(resp.data.items[0].option[0].value[0].name, mockup.items[0].option[0].value[0].name);
                assert.equal(resp.data.items[0].option[0].value[0].qty, mockup.items[0].option[0].value[0].qty);
                assert.equal(resp.data.items[0].price, mockup.items[0].price);
                assert.equal(resp.data.items[0].amount, mockup.items[0].amount);
                assert.equal(resp.data.totalamount, mockup.totalamount);
                assert.equal(resp.data.user_id, mockup.user_id);
                assert.equal(resp.data.paymenttype.name, mockup.paymenttype.name);
                done();
            });
    });

    it('should be preorder put use token', function (done) {

        request(app)
            .post('/api/preorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    orderno: "order05",
                    orderstatus: false,
                    team_id: 'teamid05',
                    customer: {
                        firstname: 'casan02',
                        lastname: 'casann02',
                        tel: '022228888',
                        address: [
                            {
                                houseno: "55/1",
                                village: "casa-city01",
                                street: "lumlukka old Road",
                                subdistrict: "บึงคำพร้อย01",
                                district: "lumlukka01",
                                province: "phathumthani01",
                                zipcode: "12130"
                            }
                        ]
                    },
                    items: [
                        {
                            name: 'แป้งพับ',
                            option: [
                                {
                                    name: 'ขนาด',
                                    value: [{
                                        name: 'M',
                                        qty: 1,
                                    }],
                                }
                            ],
                            price: 250,
                            amount: 250
                        }
                    ],
                    totalamount: 250,
                    user_id: "user005",
                    paymenttype:
                    {
                        name: "โอนเงินผ่านธนาคาร"
                    }
                }
                request(app)
                    .put('/api/preorders/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.orderno, update.orderno);
                        assert.equal(resp.data.customer.firstname, update.customer.firstname);
                        assert.equal(resp.data.customer.lastname, update.customer.lastname);
                        assert.equal(resp.data.customer.tel, update.customer.tel);

                        assert.equal(resp.data.customer.address[0].houseno, update.customer.address[0].houseno);
                        assert.equal(resp.data.customer.address[0].village, update.customer.address[0].village);
                        assert.equal(resp.data.customer.address[0].street, update.customer.address[0].street);
                        assert.equal(resp.data.customer.address[0].subdistrict, update.customer.address[0].subdistrict);
                        assert.equal(resp.data.customer.address[0].district, update.customer.address[0].district);
                        assert.equal(resp.data.customer.address[0].province, update.customer.address[0].province);
                        assert.equal(resp.data.customer.address[0].zipcode, update.customer.address[0].zipcode);

                        assert.equal(resp.data.items[0].name, update.items[0].name);
                        assert.equal(resp.data.items[0].option[0].name, update.items[0].option[0].name);
                        assert.equal(resp.data.items[0].option[0].value[0].name, update.items[0].option[0].value[0].name);
                        assert.equal(resp.data.items[0].option[0].value[0].qty, update.items[0].option[0].value[0].qty);
                        assert.equal(resp.data.items[0].price, update.items[0].price);
                        assert.equal(resp.data.items[0].amount, update.items[0].amount);
                        assert.equal(resp.data.totalamount, update.totalamount);
                        assert.equal(resp.data.user_id, update.user_id);
                        assert.equal(resp.data.paymenttype.name, update.paymenttype.name);
                        done();
                    });
            });

    });

    it('should be preorder delete use token', function (done) {

        request(app)
            .post('/api/preorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/preorders/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be preorder get not use token', (done)=>{
        request(app)
        .get('/api/preorders')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    it('should be preorder post not use token', function (done) {

        request(app)
            .post('/api/preorders')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be preorder put not use token', function (done) {

        request(app)
            .post('/api/preorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/preorders/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be preorder delete not use token', function (done) {

        request(app)
            .post('/api/preorders')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/preorders/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Preorder.deleteMany().exec(done);
    });

});