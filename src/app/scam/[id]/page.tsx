export default function ScamPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="flex h-screen items-center">
      <div className="rounded-lg border border-white">Scam ID {id}</div>
    </div>
  );
}
