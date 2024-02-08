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

export type Image = {
    id: string;
    url: string;
    scamId: string;
}

type ScamToTag = {
    scamId: string;
    tagId: string;
}

export type Comments = {
    id: string;
    nickname: string;
    content: string;
    createdAt: string;
}

export type Scam = {
    id: string;
    name: string;
    description: string;
    platform: string;
    scammerInfo: string;
    isApproved: boolean;
    images: Image[];
    comments: Comments[];
    scamToTags: ScamToTag[];
    createdAt: string;
    updatedAt: string;
}

export const getScam = async (id: string): Promise<Scam> => {
    const response = await fetch(`${process.env.BACKEND_URL}/scam/${id}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })

    // console.log("response", await response.json())

    return await response.json()
}

export const getScams = async (): Promise<Scam[]> => {
    const response = await fetch(`${process.env.BACKEND_URL}/scam`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })

    return await response.json()
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

export const getTags = async (): Promise<Categories[]> => {
    const response = await fetch(`${process.env.BACKEND_URL}/tag`, {
        cache: 'no-store',
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