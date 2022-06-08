// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConfig from "../../db/knexfile";

export default async function handler(req, res) {
    const db = require('knex')(dbConfig['development'])
    const data = await db('availability')
        .insert({
            scheduler_id: req.body.scheduler_id,
            name: req.body.name,
            selectedIntervals: req.body.selectedIntervals,
        })
        .then(() => {
            // redirect to newly created url
            return res.status(201).send()
        })
        .catch((err) => {
            return res.status(400).send(err)
        })
        .finally(() => {db.destroy();})
}
