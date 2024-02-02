'use server';

import type { CreateScamSchema } from '@/zod/schemas/scamForm'

export const createScam = async (data: CreateScamSchema) => {
    console.log(process.env.BACKEND_URL)
    const response = await fetch(`${process.env.BACKEND_URL}/scam`, {
        body: JSON.stringify(data),
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })

    return await response.json()
}