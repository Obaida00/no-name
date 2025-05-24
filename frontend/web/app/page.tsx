"use client"
import AuthToggler from "@/components/authToggler";



export default function Home() {

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-[400px]">
        <AuthToggler></AuthToggler>
      </div>
    </div>
  );
}
