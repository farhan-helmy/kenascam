import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { createScamSchema } from '@/zod/schemas/scamForm';
import { getResponseInit } from '@/utils/response-init';
import { prisma } from '@/db/db';

// Todo: temporary srcs
const srcs = ['/examplescam1.jpg', '/examplescam2.jpg'];

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();

  const result = createScamSchema.safeParse(body);
  if (!result.success) {
    let zodErrors = {};
    result.error.issues.forEach(issue => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json(
      {
        errors: zodErrors,
      },
      getResponseInit(StatusCodes.BAD_REQUEST)
    );
  }

  const { description, name } = result.data;

  try {
    await prisma.scam.create({
      data: {
        description,
        name,
        src: srcs[Math.floor(Math.random() * srcs.length)],
      },
    });

    // Todo: add revalidateTag

    return NextResponse.json(
      {
        errors: null,
      },
      getResponseInit(StatusCodes.CREATED)
    );
  } catch (error) {
    console.log(error);
    // Todo: proper error handling
    return NextResponse.json(
      {
        errors: {
          server: 'database error',
        },
      },
      getResponseInit(StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}
