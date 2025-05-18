
"use client"
import { toast } from "sonner";

type MyToastProps = {
    title: string,
    state: "success" | "info" | "warning" | "error",
};
export default function myToast({ title, state }: MyToastProps) {
    switch (state) {
        case "success":
            toast.success(title, {
                invert: true,
                style: {
                    fontFamily: "var(--font-geist-sans)"
                }, position: 'bottom-center'
            },);
            break;
        case "info":
            toast.info(title, {
                invert: true,
                style: {
                    fontFamily: "var(--font-geist-sans)"
                }, position: 'bottom-center'
            },);
            break;
        case "error":
            toast.error(title, {
                invert: true,
                style: {
                    fontFamily: "var(--font-geist-sans)"
                }, position: 'bottom-center'
            },);
            break;
        case "warning":
            toast.warning(title, {
                invert: true,
                style: {
                    fontFamily: "var(--font-geist-sans)"
                }, position: 'bottom-center'
            },);
            break;
        default:
            break;
    }
}
