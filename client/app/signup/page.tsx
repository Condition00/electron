"use client"

import {Button} from "@/components/ui/button";
import Link from 'next/link';
import { useState } from "react";
import signUp from "@/components/signUp";

export default function page() {
    const [showAccount, setShowAccount] = useState(false);
    const [Priyakshi, setPriyakshi] = useState(false);

    function handleShowAccount() {
        setShowAccount(true);
    }
    return(
        <>
        {showAccount && (signUp())}

        {!showAccount && (
            <div className= "flex items-center min-h-screen bg-color3">

            {/*Left Side*/}
            <div className= "hidden w-1/3 md:flex bg-color2 items-center justify-center min-h-screen">
                <div className= "text-center text-white font-poppins">
                    <h2 className= "lg:text-2xl text-lg font-light tracking-widest">
                        GET TECHY WITH
                    </h2>
                    <h1 className= "lg:text-5xl text-3xl font-black lg:mt-4 mt-2">
                        ELECTRON
                    </h1>

                </div>

            </div>
            {/*Right Side*/}
            <div className= "w-full md:w-2/3 bg-white flex items-center justify-center min-h-screen ">
                <div className= "md:w-105 w-90 text-black font-poppins">
                    <h2 className= "md:text-2xl text-xl font-semibold text-center mb-10 ">
                        CREATE YOUR ACCOUNT

                    </h2>
                    <div className="flex flex-col mb-8">
                        <label className = "md:text-sm text-xs text-zinc-600 mb-2">
                            Country/Region
                        </label>

                        <select className= "bg-zinc-200 rounded-md p-3 text-xs md:text-sm">
                            <option>India</option>
                            <option>USA</option>
                            <option>UK</option>
                        </select>
                    </div>
                    {/*Date of Birth*/}
                    <div className= "flex flex-col mb-2">

                        <label className= "md:text-sm text-xs text-zinc-600 mb-2">
                            Date of Birth
                        </label>

                        <div className= "flex gap-3">
                            <input placeholder="month" className="bg-zinc-200 rounded-md p-3 w-1/3 text-xs md:text-sm"/>
                            <input placeholder="date" className="bg-zinc-200 rounded-md p-3 w-1/3 text-xs md:text-sm"/>
                            <input placeholder="year" className="bg-zinc-200 rounded-md p-3 w-1/3 text-xs md:text-sm"/>
                        </div>


                    </div>

                    <p className="text-xs text-zinc-500 mt-2">
                        You need your date of birth to reset your passwords
                    </p>

                    {/*Button*/}
                    <Button className="w-full mt-10 h-11" onClick={handleShowAccount}>
                        Agree and Continue
                    </Button>

                    {/*Sing in */}
                    <Button variant="link" className="text-sm text-zinc-600 text-center mt-2">
                        <Link href="/login">Already have an account?</Link>
                    </Button>

                </div>

            </div>

        </div>)
        }
        </>
    )
}
