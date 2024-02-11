'use server'

import { createClient } from '@clickhouse/client'

// const client = createClient({
//     host: process.env.CLICKHOUSE_HOST,
//     password: process.env.CLICKHOUSE_PASSWORD,
// })

export const upVote = async (scamId: string) => {
    console.log(process.env.CLICKHOUSE_HOST, process.env.CLICKHOUSE_PASSWORD)
    // const result = await client.query({
    //     query: `INSERT INTO votes (id, count)
    //     VALUES (${scamId}, 1)
    //     ON DUPLICATE KEY UPDATE count = count + 1;`
    // })
    // console.log(result)
}