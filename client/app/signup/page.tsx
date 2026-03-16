"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

            <div className="w-full md:w-2/3 bg-white flex items-center justify-center min-h-screen">
                <form className="md:w-105 w-90 text-black font-poppins" onSubmit={handleSubmit}>
                    <h2 className="md:text-2xl text-xl font-semibold text-center mb-10">CREATE YOUR ACCOUNT</h2>

                    <div className="flex flex-col mb-4">
                        <label className="md:text-sm text-xs text-zinc-600 mb-2" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="bg-zinc-200 rounded-md p-3 text-xs md:text-sm"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="md:text-sm text-xs text-zinc-600 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-zinc-200 rounded-md p-3 text-xs md:text-sm"
                            placeholder="electron@gmail.com"
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="md:text-sm text-xs text-zinc-600 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="bg-zinc-200 rounded-md p-3 text-xs md:text-sm"
                            placeholder="********"
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="md:text-sm text-xs text-zinc-600 mb-2" htmlFor="country">
                            Country/Region
                        </label>
                        <select
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="bg-zinc-200 rounded-md p-3 text-xs md:text-sm"
                        >
                            <option>India</option>
                            <option>USA</option>
                            <option>UK</option>
                        </select>
                    </div>

                    <div className="flex flex-col mb-2">
                        <label className="md:text-sm text-xs text-zinc-600 mb-2" htmlFor="dob">
                            Date of Birth
                        </label>
                        <input
                            id="dob"
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="bg-zinc-200 rounded-md p-3 text-xs md:text-sm"
                        />
                    </div>

                    <p className="text-xs text-zinc-500 mt-2">You need your date of birth to reset your password.</p>

                    {error ? <p className="text-sm text-red-600 mt-4">{error}</p> : null}

                    <Button className="w-full mt-8 h-11" type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Agree and Continue"}
                    </Button>

                    <Button variant="link" className="text-sm text-zinc-600 text-center mt-2 w-full" type="button">
                        <Link href="/login">Already have an account?</Link>
                    </Button>
                </form>
            </div>
        </div>
    );
}
