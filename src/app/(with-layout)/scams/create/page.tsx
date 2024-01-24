import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CreateScamForm from '@/containers/scams/create-page/CreateScamForm';

export default function CreateScamPage() {
  return (
    <main className="flex flex-grow items-center justify-center px-4">
      <Card className="w-full sm:max-w-3xl">
        <CardHeader>
          <CardTitle>Add scam</CardTitle>
          <CardDescription>
            Help us to create awareness to Malaysian people about online scam. Or any other type of scams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateScamForm />
        </CardContent>
      </Card>
    </main>
  );
}
