import type { Metadata } from 'next';
import ScamDetails from './ScamDetails';
import { getScam } from '@/service/scam';

function transformFormat(input: string): string {
  if (input.includes('-')) {
    const words = input.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ').toUpperCase();
  } else {
    return input.toUpperCase();
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata | undefined> {
  const data = await getScam(params.id);

  const imageUrl =
    data.images.length !== 0
      ? `https://d8f7wymmosp6f.cloudfront.net/${data.images[0].url}`
      : 'https://d8f7wymmosp6f.cloudfront.net/kenascamcover.png';
  const tags = data.scamToTags.map(tag => transformFormat(tag.tagId));
  const joinedTags = tags.join(',');

  const ogImage = `https://${process.env.APP_ENV === 'development' ? 'staging.' : ''}kenascam.xyz/og?title=${data.name}&description=${data.description}&authorName=anonymous&authorImage=${imageUrl}&tags=${joinedTags}`;
  return {
    title: `KenaScam | ${data.name}`,
    description: data.description,
    openGraph: {
      title: data.name,
      description: data.description,
      type: 'website',
      url: `https://staging.kenascam.xyz/scam/${params.id}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `KenaScam | ${data.name}`,
      description: data.description,
      images: [
        {
          url: ogImage,
        },
      ],
    },
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  const adminSecret = process.env.ADMIN_SECRET;

  return (
    <>
      <ScamDetails id={params.id} adminSecret={adminSecret as string} />
    </>
  );
};

export default Page;
