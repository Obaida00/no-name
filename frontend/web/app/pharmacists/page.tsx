
"use client";
import { useState, useEffect } from "react";
import { User } from "@/contexts/UserContext";
import myToast from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddPharmacistsButton from "./components/AddPharmacistsButton";
import EditPharmacistButton from "./[id]/edit/components/EditPharmacistButton";

// Simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-slate-500"></div>
  </div>
);

// Error message component
const ErrorMessage = ({ message }: { message: string; }) => (
  <div className="text-center text-red-500">
    <p className="text-lg">{message}</p>
  </div>
);

// Pharmacist card component
const PharmacistCard = ({ pharmacist }: { pharmacist: User }) => (
  <Card className="px-2">
    <CardHeader>
      <CardTitle>{pharmacist.name}</CardTitle>
      <CardDescription>{pharmacist.email}</CardDescription>
        <EditPharmacistButton id={pharmacist.id}/>
    </CardHeader>
  </Card>
);

export default function Pharmacists() {
  const [pharmacists, setPharmacists] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchPharmacists = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type" : "application/json"
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          myToast({ title: "Permission denied, please log in", state: "error" });
          router.replace("/");
        }
        const errorText =  response.statusText;
        myToast({ title: errorText, state: "error" });
      }

      const data = await response.json();
      console.log(data);

      setPharmacists(data.users || []);
    } catch (error) {
      console.log(error);
      setPharmacists([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPharmacists();
  }, []);

  return (

    <div className="min-h-screen w-full flex flex-col p-6 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Pharmacists</h1>
        <AddPharmacistsButton />

      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && pharmacists.length === 0 && (
        <div className="text-center">
          <p className="text-lg text-gray-500">No pharmacists available</p>
        </div>
      )}
      {!loading && !error && pharmacists.length > 0 && (
        <div className="grid gap-4 w-full max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pharmacists.map((pharmacist) => (
            <PharmacistCard key={pharmacist.id} pharmacist={pharmacist} />
          ))}
        </div>
      )}
    </div>

  );
}