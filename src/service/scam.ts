'use server';

import type { CreateScamSchema } from '@/zod/schemas/scamForm';

type CategoriesResponse = {
  id: string;
  name: string;
  value: string;
};

type Categories = {
  label: string;
  value: string;
};

export type Image = {
  id: string;
  url: string;
  scamId: string;
};

type ScamToTag = {
  scamId: string;
  tagId: string;
};

export type Comments = {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
};

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
  upvotes: number;
  downvotes: number;
};

export const getScam = async (id: string): Promise<Scam> => {
  const response = await fetch(`${process.env.BACKEND_URL}/scam/${id}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  // console.log("response", await response.json())

  return await response.json();
};

export const getScams = async (): Promise<Scam[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/scam`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return await response.json();
};

export const createScam = async (data: CreateScamSchema) => {
  // console.log(process.env.BACKEND_URL)
  const response = await fetch(`${process.env.BACKEND_URL}/scam`, {
    body: JSON.stringify(data),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return await response.json();
};

export const deleteScam = async ({ id, adminSecret }: { id: string, adminSecret: string }) => {
  const res = await fetch(`${process.env.BACKEND_URL}/scam/${id}/remove`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ adminSecret }),
    method: 'POST',
  });

  console.log(res);

  return {
    success: true
  }
}

export const getTags = async (): Promise<Categories[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/tag`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const resData = (await response.json()) as CategoriesResponse[];

  return resData.map(category => {
    return {
      label: category.name,
      value: category.value,
    };
  });
};

export const voteScam = async ({ id, action }: { id: string; action: 'upvote' | 'downvote' }) => {

  const response = await fetch(`${process.env.BACKEND_URL}/scam/${id}?action=${action}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return await response.json();
};

export const commentScam = async ({
  nickname,
  content,
  scamID,
}: {
  nickname: string;
  content: string;
  scamID: string;
}) => {
  // console.log(nickname, content, scamID);
  const response = await fetch(`${process.env.BACKEND_URL}/scam/${scamID}/comment`, {
    body: JSON.stringify({
      nickname,
      content,
    }),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return await response.json();
};
