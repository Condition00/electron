"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE_URL } from "@/lib/api";

export default function Page() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("India");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                    country,
                    dateOfBirth,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Signup failed");
            }

            window.localStorage.setItem("electron_user_email", data.user.email);
            router.push("/account");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center min-h-screen bg-color3">
            <div className="hidden w-1/3 md:flex bg-color2 items-center justify-center min-h-screen">
                <div className="text-center text-white font-poppins">
                    <h2 className="lg:text-2xl text-lg font-light tracking-widest">GET TECHY WITH</h2>
                    <h1 className="lg:text-5xl text-3xl font-black lg:mt-4 mt-2">ELECTRON</h1>
                </div>
            </div>

            <div className="w-full md:w-2/3 bg-color5 flex items-center justify-center min-h-screen">
                <Card className="md:w-105 w-90 border-0 bg-transparent shadow-none">
                    <CardHeader className="text-center">
                        <CardTitle className="md:text-2xl text-xl font-semibold text-black">CREATE YOUR ACCOUNT</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="text-black font-poppins" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <Label htmlFor="fullName" className="md:text-sm text-xs text-black mb-2">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        placeholder="John Doe"
                                        className="bg-zinc-100 text-xs md:text-sm text-black"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="email" className="md:text-sm text-xs text-black mb-2">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="electron@gmail.com"
                                        className="bg-zinc-100 text-xs md:text-sm text-black"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="password" className="md:text-sm text-xs text-black mb-2">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        placeholder="********"
                                        className="bg-zinc-100 text-xs md:text-sm text-black"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="country" className="md:text-sm text-xs text-black mb-2">
                                        Country/Region
                                    </Label>
                                    <Select value={country} onValueChange={setCountry}>
                                        <SelectTrigger className="w-full bg-zinc-100 text-black text-xs md:text-sm">
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Country</SelectLabel>
                                                <SelectItem value="India">India</SelectItem>
                                                <SelectItem value="USA">USA</SelectItem>
                                                <SelectItem value="UK">UK</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="dob" className="md:text-sm text-xs text-black mb-2">
                                        Date of Birth
                                    </Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="bg-zinc-100 text-xs md:text-sm text-black"
                                    />
                                </div>

                                <p className="text-xs text-zinc-500">You need your date of birth to reset your password.</p>

                                {error && <p className="text-sm text-red-600">{error}</p>}

                                <Button className="w-full mt-8 h-11" type="submit" disabled={loading}>
                                    {loading ? "Creating account..." : "Agree and Continue"}
                                </Button>

                                <Button variant="link" className="text-sm text-black w-full p-0 h-auto" type="button">
                                    <Link href="/login">Already have an account?</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
