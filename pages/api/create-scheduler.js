// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConfig from "../../db/knexfile";

export default function handler(req, res) {


    // res.status(200).json({
    //     cookies: req.cookies,
    //     query: req.query,
    //     body: req.body,
    // })
    const db = require('knex')(dbConfig['development'])
    db('scheduler')
        .insert({
            url: req.body.url,
            eventName: req.body.eventName,
            days: req.body.days,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
        })
        .then(() => {
            res.redirect('/' + req.body.url)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
        .finally(() => {db.destroy();})
    // res.status(200).json({ name: 'CREATING' })
}
