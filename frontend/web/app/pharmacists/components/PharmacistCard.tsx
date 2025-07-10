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
        <Card className="">
            <CardHeader>
                <CardTitle>
                    {pharmacist.name}
                    <span className="ml-2">
                        {pharmacist.email === user?.email ? <Badge variant={"secondary"} className="bg-green-200">Logged in</Badge> : null}
                    </span>
                </CardTitle>
                <CardAction>
                    <Button variant={"ghost"} className="cursor-pointer" onClick={() => router.push(`/pharmacists/${pharmacist.id}`)} size={"icon"}><ArrowRight></ArrowRight></Button>
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
