
"use client";
import { useState, useEffect } from "react";
import { User } from "@/contexts/UserContext";
import myToast from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import AddPharmacistsButton from "./components/AddPharmacistsButton";
import PharmacistCard from "./components/PharmacistCard";
import LoadingSpinner from "./components/LoadingSpinner";

const ErrorMessage = ({ message }: { message: string; }) => (
  <div className="text-center text-red-500">
    <p className="text-lg">{message}</p>
  </div>
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
        <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pharmacists.map((pharmacist) => (
            <PharmacistCard key={pharmacist.id} pharmacist={pharmacist} />
          ))}
        </div>
      )}
    </div>

  );
}