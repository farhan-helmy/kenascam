import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function ScamPage({
    params: { id },
}: {
    params: { id: string };
}) {
    return (
        <div className="flex items-center h-screen">
            <div className="border border-white rounded-lg">
                Scam ID {id}
            </div>
        </div>
    );
}
