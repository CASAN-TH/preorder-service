'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PreorderSchema = new Schema({

    orderno: {
        type: String,
    },
    orderstatus: {
        type: Boolean,
        default: false
    },
    team_id: {
        type: String,
    },
    customer: {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        tel: {
            type: String
        },
        address: {
            type: [
                {
                    houseno: {
                        type: String
                    },
                    village: {
                        type: String
                    },
                    street: {
                        type: String
                    },
                    subdistrict: {
                        type: String
                    },
                    district: {
                        type: String
                    },
                    province: {
                        type: String
                    },
                    zipcode: {
                        type: String
                    }
                }
            ]
        },
    },
    items: {
        type: [
            {
                name: {
                    type: String
                },
                option: {
                    type: [
                        {
                            name: {
                                type: String
                            },
                            value: {
                                type: [
                                    {
                                        name: {
                                            type: String
                                        },
                                        qty: {
                                            type: Number
                                        }
                                    }
                                ]
                            },

                        }
                    ]
                },
                price: {
                    type: Number
                },
                totalqty:{
                    type: Number
                },
                amount: {
                    type: Number
                }
            }
        ]
    },
    totalamount: {
        type: Number
    },
    user_id: {
        type: String
    },
    paymenttype: {
        type: {
            name: {
                type: String
            }
        }

    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Preorder", PreorderSchema);