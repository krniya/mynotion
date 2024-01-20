// import { Client } from "pg";

// // Replace these values with your PostgreSQL connection details
// const DB_HOST = "folder-postgres-service"; // Use the Cluster IP or Service DNS
// const DB_PORT = "5432"; // Default is 5432
// const DB_NAME = "folder";
// const DB_USER = "admin";
// const DB_PASSWORD = "password";

// const client = new Client({
//     host: DB_HOST,
//     port: parseInt(DB_PORT, 10),
//     database: DB_NAME,
//     user: DB_USER,
//     password: DB_PASSWORD,
// });

// async function createTable() {
//     // Define the SQL query to create a sample table
//     const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS sample_table (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100),
//         age INT
//     );
//   `;

//     // Execute the query
//     await client.query(createTableQuery);

//     // Disconnect from the database
//     await client.end();
// }

// async function insertData(name: string, age: number) {
//     await client.connect();

//     // Define the SQL query to insert data into the sample table
//     const insertQuery = `
//     INSERT INTO sample_table (name, age)
//     VALUES ($1, $2);
//   `;

//     // Execute the query with the provided data
//     await client.query(insertQuery, [name, age]);

//     // Disconnect from the database
//     await client.end();
// }

// async function fetchData() {
//     await client.connect();

//     // Define the SQL query to fetch data from the sample table
//     const selectQuery = "SELECT * FROM sample_table;";

//     // Execute the query
//     const result = await client.query(selectQuery);

//     // Display the fetched data
//     console.log(result.rows);

//     // Disconnect from the database
//     await client.end();
// }

// // Uncomment the following lines to create a table, insert data, and fetch data
// createTable()
//     .then(() => insertData("John Doe", 30))
//     .then(() => insertData("Jane Smith", 25))
//     .then(() => fetchData());

import { Pool } from "pg";

async function connectToPostgres() {
    const pool = new Pool({
        user: "admin",
        password: "Password",
        host: "folder-postgres-srv", // Change to your PostgreSQL server address
        port: 5432, // Change to the NodePort assigned to your service
        database: "folder",
    });

    const client = await pool.connect();
    return { pool, client };
}

async function createTable(client: any) {
    // Example: Create a table
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS example_table (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
    `;

    await client.query(createTableQuery);
}

async function insertData(client: any, name: string) {
    // Example: Insert data into the table
    const insertQuery = "INSERT INTO example_table (name) VALUES ($1);";
    await client.query(insertQuery, [name]);
}

async function fetchData(client: any) {
    // Example: Fetch data from the table
    const selectQuery = "SELECT * FROM example_table;";
    const result = await client.query(selectQuery);
    return result.rows;
}

async function main() {
    const { pool, client } = await connectToPostgres();

    try {
        await createTable(client);

        // Example: Insert and fetch data
        await insertData(client, "John Doe");
        await insertData(client, "Jane Doe");

        const records = await fetchData(client);
        console.log("Records in the table:", records);
    } finally {
        // Release the client back to the pool
        client.release();

        // Close the pool when the application exits
        await pool.end();
    }
}

main();
