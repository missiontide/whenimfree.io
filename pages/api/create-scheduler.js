import dbConfig from "../../db/knexfile";
import cuid from "cuid";

export default async function handler(req, res) {
    const uniqueURL = await createUniqueURL()

    const db = require('knex')(dbConfig['development'])
    const data = await db('scheduler')
        .insert({
            url: uniqueURL,
            eventName: req.body.eventName,
            days: req.body.days,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
        })
        .then(() => {
            // redirect to newly created url
            return res.redirect('/' + uniqueURL)
        })
        .catch((err) => {
            return res.status(400).send(err)
        })
        .finally(() => {db.destroy();})
}


// Creates a unique URL using cuid slug.
// Checks database if there is already a scheduler with that url
// If so, recalls function to generate new url and tries again
async function createUniqueURL() {
    const db = require('knex')(dbConfig['development'])
    const url = cuid.slug();
    const scheduler = await db('scheduler')
        .select({
            id: 'id',
        }).where({
            url: url,
        }).catch((err) => {
            console.log(err)
        }).finally(() => {db.destroy()})

    if (scheduler.length === 0) {
        return url;
    } else {
        return createUniqueURL();
    }
}
