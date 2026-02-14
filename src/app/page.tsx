"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Instagram, Sparkles } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState<"form" | "loading" | "result">("form");
  const [name, setName] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [gender, setGender] = useState<"m" | "f">("m");
  const [error, setError] = useState("");

  const submitUser = useMutation(api.users.submitUser);
  const [submittedGender, setSubmittedGender] = useState<"m" | "f" | null>(null);
  
  const oppositeGender = submittedGender 
    ? (submittedGender === "m" ? "f" : "m")
    : (gender === "m" ? "f" : "m");
    
  const randomMatch = useQuery(api.users.getRandomOpposite, { gender: oppositeGender });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name.trim() || !instagramId.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setStep("loading");
    setSubmittedGender(gender);

    try {
      await submitUser({
        name,
        instagramId,
        gender,
      });

      await new Promise((resolve) => setTimeout(resolve, 2500));
      
      setStep("result");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setStep("form");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        {step === "form" && (
          <>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-700 bg-clip-text text-transparent">
                Find Your Match
              </CardTitle>
              <CardDescription className="text-gray-500">
                Enter your details and find someone special
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Your Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-rose-500 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-gray-700 font-medium">Instagram ID</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="instagram"
                      placeholder="@username"
                      value={instagramId}
                      onChange={(e) => setInstagramId(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-rose-500 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-gray-700 font-medium">Your Gender</Label>
                  <Select
                    value={gender}
                    onValueChange={(value) => setGender(value as "m" | "f")}
                  >
                    <SelectTrigger className="h-12 border-gray-200 focus:border-rose-500 focus:ring-rose-500">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m">Male</SelectItem>
                      <SelectItem value="f">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all hover:scale-[1.02]"
                >
                  Find My Match
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {step === "loading" && (
          <CardContent className="py-16 text-center">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full animate-ping opacity-20" />
                <div className="absolute inset-2 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full animate-pulse opacity-40" />
                <div className="absolute inset-4 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full animate-bounce" />
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-700 mb-2">Finding your perfect match...</p>
            <p className="text-gray-500">Searching through profiles</p>
          </CardContent>
        )}

        {step === "result" && (
          <>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                It's a Match!
              </CardTitle>
              <CardDescription className="text-gray-500">
                Here's your random match
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {step === "result" && randomMatch ? (
                <div className="space-y-4">
                  <div className="relative mx-auto w-32 h-32 mb-4">
                    <img
                      src={`https://cataas.com/cat?${Date.now()}`}
                      alt="Match profile"
                      className="w-full h-full rounded-full object-cover border-4 border-rose-200 shadow-lg"
                    />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{randomMatch.name}</p>
                  <a
                    href={`https://instagram.com/${randomMatch.instagramId.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold"
                  >
                    <Instagram className="w-5 h-5" />
                    {randomMatch.instagramId}
                  </a>
                  <Button
                    onClick={() => {
                      setStep("form");
                      setSubmittedGender(null);
                    }}
                    className="w-full h-12 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-semibold shadow-lg"
                  >
                    Find Another Match
                  </Button>
                </div>
              ) : step === "result" ? (
                <div className="py-8">
                  <p className="text-gray-600 mb-4">No matches found yet!</p>
                  <p className="text-gray-500 text-sm mb-6">Be the first to join and find your match</p>
                  <Button
                    onClick={() => {
                      setStep("form");
                      setSubmittedGender(null);
                    }}
                    className="w-full h-12 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-semibold"
                  >
                    Try Again
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
