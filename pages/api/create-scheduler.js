// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConfig from "../../db/knexfile";

export default async function handler(req, res) {
    const db = require('knex')(dbConfig['development'])
    const data = await db('scheduler')
        .insert({
            url: req.body.url,
            eventName: req.body.eventName,
            days: req.body.days,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
        })
        .then(() => {
            // redirect to newly created url
            return res.redirect('/' + req.body.url)
        })
        .catch((err) => {
            return res.status(400).send(err)
        })
        .finally(() => {db.destroy();})
}
