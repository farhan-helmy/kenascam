'use server';

import type { CreateScamSchema } from '@/zod/schemas/scamForm'

type CategoriesResponse = {
    id: string
    name: string
    value: string
}

type Categories = {
    label: string
    value: string
}

export const createScam = async (data: CreateScamSchema) => {
    // console.log(process.env.BACKEND_URL)
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

export const getCategories = async (): Promise<Categories[]> => {
    const response = await fetch(`${process.env.BACKEND_URL}/categories`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })

    const resData = await response.json() as CategoriesResponse[]

    return resData.map(category => {
        return {
            label: category.name,
            value: category.value
        }
    })
}