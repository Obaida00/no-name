import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "@/components/ui/card";
import { User, useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function PharmacitsCard({ pharmacist }: { pharmacist: User }) {
    const router = useRouter();
    const { user } = useUser();
    return (
        ///TODO: Add transition to the card one way or another bc common css transition is not working here.
        <Card className="cursor-pointer hover:scale-x-[1.01] hover:scale-y-[1.01]" onClick={() => router.push(`/pharmacists/${pharmacist.id}`)}>
            <CardHeader>
                <CardTitle>
                    {pharmacist.name}
                    <span className="ml-2">
                        {pharmacist.id === user?.id ? <Badge variant={"secondary"} className="bg-green-100 text-green-800">Current</Badge> : null}
                    </span>
                </CardTitle>
                <CardAction>
                    <Button variant={"ghost"} className="cursor-pointer"  size={"icon"}><ArrowRight></ArrowRight></Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    {pharmacist.email}
                </CardDescription>
            </CardContent>
        </Card>
    )
}
