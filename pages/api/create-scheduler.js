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
            url: 'x6789',
            eventName: req.body.eventName,
            days: req.body.days,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
        })
        .catch((err) => {
            res.status(400).send(err)
        })
    // res.status(200).json({ name: 'CREATING' })
}
