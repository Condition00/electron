"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { getAuthToken, setAuthToken } from "@/lib/auth";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const created = searchParams.get("created") === "1";

    useEffect(() => {
        if (getAuthToken()) {
            router.replace('/account');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Login failed");
            }

            if (!data?.token) {
                throw new Error("Authentication token was not returned");
            }

            setAuthToken(data.token);
            router.push("/account");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-around min-h-screen bg-color5">
            <form
                className="w-full max-w-md bg-white border-2 border-white rounded-md p-6"
                onSubmit={handleSubmit}
            >
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="electron@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FieldDescription>Enter your email address</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="*******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-800"
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <FieldDescription>Enter your password</FieldDescription>
                        </Field>

                        {error ? <p className="text-sm text-red-600">{error}</p> : null}

                        <Field>
                            {created ? (
                                <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                                    Account created successfully. Please log in.
                                </p>
                            ) : null}
                            <Link href="/signup">
                                <FieldDescription>Create an account ?</FieldDescription>
                            </Link>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </form>
        </div>
    );
}