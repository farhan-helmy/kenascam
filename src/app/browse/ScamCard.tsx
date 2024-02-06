import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CircleIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function ScamCard() {
	return (
		<Card className="group relative">
			<CardHeader className="grid items-start gap-4 space-y-0">
				<div className="space-y-1">
					<div className="flex max-h-64 justify-center">
						<Image
							alt="example1"
							className="h-auto w-auto rounded-xl object-cover transition-all hover:scale-105"
							height={150}
							src="/examplescam2.jpg"
							width={200}
						/>
					</div>
					<CardTitle className="max-w-24 truncate pt-4 hover:text-clip">
						ScamScamScamScamScamScamScamScamScamScamScamScamScam
					</CardTitle>
					<CardDescription>Ini scam yang mudah</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between text-sm text-muted-foreground relative overflow-hidden">
					<div className="flex items-center">
						<CircleIcon className="mr-1 h-3 w-3 fill-red-400 text-red-400" />
						APK
					</div>
					<p className="transition-transform group-hover:translate-y-6">
						Uploaded on April 2023
					</p>
					<p className="text-blue-500 absolute right-0 -bottom-6 transition-transform group-hover:-translate-y-6 group-hover:duration-300">
						Click to explore
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
