"use client"

import {
    CircleIcon,
    PlusCircledIcon,
    GitHubLogoIcon,
    DiscordLogoIcon
} from "@radix-ui/react-icons"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Suspense, useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { bungee } from "../fonts"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import UploadForm from "@/components/ui/upload-form"

function ScamCard() {
    return (
        <Card>
            <CardHeader className="grid items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <div className="flex justify-center max-h-64">
                        <Image src="/examplescam2.jpg" alt="example1" height={150} width={200} className="h-auto w-auto object-cover transition-all hover:scale-105" />
                    </div>
                    <CardTitle className="truncate hover:text-clip max-w-24">ScamScamScamScamScamScamScamScamScamScamScamScamScam</CardTitle>
                    <CardDescription>
                        Ini scam yang mudah
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <CircleIcon className="mr-1 h-3 w-3 fill-red-400 text-red-400" />
                        APK
                    </div>
                    <div className="text-sm">Uploaded on April 2023</div>
                </div>
            </CardContent>
        </Card>
    )
}

const formSchema = z.object({
    scamName: z.string().min(1, {
        message: "Scam name must be at least 1 characters.",
    }),
    description: z.string().min(1, {
        message: "Description must be at least 1 characters.",
    }),
})

function AddScamForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            scamName: "",
            description: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Add scam</DialogTitle>
                <DialogDescription>
                    Help us to create awareness to Malaysian people about online scam. Or any other type of scams
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="scamName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Scam name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Online scam..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Name of the scam eg: &quot;APK scam, Online scam&quot;.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="This scam is related to..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Explain a little bit about the scam.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="">
                        <FormLabel>Picture</FormLabel>
                       <UploadForm />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default function Browse() {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 1000)

    }, [])
    return (
        <>
            <div className="w-full flex justify-between p-4 sticky top-0">
                <div className="flex flex-row items-center justify-center">
                    <button className={`md:text-2xl pr-4 ${bungee.className}`}>
                        Kena Scam
                    </button>
                    <GitHubLogoIcon className="w-6 h-6 mr-4" />
                    <DiscordLogoIcon className="w-6 h-6" />
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircledIcon className="mr-2" />
                                Scam
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <AddScamForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="flex items-center justify-center md:px-52 xl:px-52 px-8 pt-4">
                <div className="md:grid-cols-3 grid gap-4">
                    <Link href="/scam/123" passHref>
                        <ScamCard />
                    </Link>
                    <ScamCard />
                    <ScamCard />
                    <ScamCard />
                    <ScamCard />
                    <ScamCard />
                    <ScamCard />
                </div>
            </div>
        </>
    )
}
