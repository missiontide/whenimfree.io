import knex from "knex";
import dbConfig from "./knexfile";

let cachedConnection;

export const getDatabaseConnector = () => {
    if (cachedConnection) {
        console.log("Cached Connection");
        return cachedConnection;
    }
    const configByEnvironment = dbConfig[process.env.NODE_ENV || "development"];

    if (!configByEnvironment) {
        throw new Error(
            `Failed to get knex configuration for env:${process.env.NODE_ENV}`
        );
    }
    console.log("New Connection");
    const connection = knex(configByEnvironment);
    cachedConnection = connection;
    return connection;
};