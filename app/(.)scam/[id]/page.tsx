"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ArrowDownCircle, ArrowUp, ArrowUpCircleIcon, ArrowUpCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const ScamModal = () => {
    const router = useRouter();
    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent>
                <Card className="border-none">
                    <CardHeader>
                        <div className="flex gap-1">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <button>
                                            <ArrowUpCircle className="w-6 h-6 hover:text-green-600" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs italic">Upvote</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <button>
                                            <ArrowDownCircle className="w-6 h-6 hover:text-red-600" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs italic">Downvote</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 space-y-0">
                        <div className="flex justify-center max-h-64">
                            <Image src="/examplescam2.jpg" alt="example1" height={150} width={150} className="h-auto w-auto object-cover transition-all hover:scale-105" />
                        </div>
                        <div>
                            <CardTitle className="truncate hover:text-clip max-w-24">Scam APK</CardTitle>
                            <CardDescription>
                                Ini scam yang mudah
                            </CardDescription>
                            <div className="pt-4 flex flex-col">
                                <Label>Categories</Label>
                                <div className="pt-2 gap-2 grid grid-cols-4 justify-center">
                                    <Badge variant="outline">APK</Badge>
                                    <Badge variant="destructive">APK</Badge>
                                    <Badge variant="secondary">APK</Badge>
                                    <Badge>APK</Badge>
                                    <Badge>APK</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default ScamModal;