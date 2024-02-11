'use server'

import { createClient } from '@clickhouse/client'

const client = createClient({
    host: process.env.CLICKHOUSE_HOST,
    password: process.env.CLICKHOUSE_PASSWORD,
    clickhouse_settings: {
        async_insert: 1,
        wait_for_async_insert: 1,
    },
})

export const upVote = async (scamId: string) => {

    const result = await client.query({
        query: `ALTER TABLE scam UPDATE upvote = upvote + 1 WHERE scamId = ${scamId}`,
    })

    console.log(result)
}