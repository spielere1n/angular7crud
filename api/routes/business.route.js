const express = require('express');
const router = express.Router();

let Business = require('../models/Business');

router.route('/add')
    .post((req, res) => {
        let business = new Business(req.body);

        business.save()
            .then(business => {
                res.status(200).json({'business': 'business in added successfully'});
            })
            .catch(err => {
                res.status(400).send('unable to save to database');
            });
    });

router.route('/')
    .get((req, res) => {
        Business.find((err, businesses) => {
            if(err) {
                console.log(err);
            } else {
                res.json(businesses);
            }
        });
    });

router.route('/edit/:id')
    .get((req, res) => {
        let id = req.params.id;

        Business.findById(id, (err, business) => {
            res.json(business);
        });
    });

router.route('/update/:id')
    .post((req, res) => {
        Business.findById(req.params.id, (err, next, business) => {
            if(!business) {
                return next(new Error('Could not load Document'));
            } else {
                business.person_name = req.body.person_name;
                business.business_name = req.body.business_name;
                business.business_gst_number = req.body.business_gst_number;

                business.save()
                    .then(business => {
                        res.json('Update complete');
                    })
                    .catch(err => {
                        res.status(400).send('unable to update the database');
                    });
            }
        });
    });

router.route('/delete/:id')
    .get((req, res) => {
        Business.findByIdAndRemove({_id: req.params.id}, (err, business) => {
            if(err) {
                res.json(err);
            } else {
                res.json('Successfully removed');
            }
        });
    });

module.exports = router;