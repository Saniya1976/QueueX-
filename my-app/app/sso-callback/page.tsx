"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

export default function SSOCallback() {
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const [redirecting, setRedirecting] = useState(true)

    useEffect(() => {
        if (!isLoaded) return
        if (!user) return

        // Fetch user type from your DB or Clerk publicMetadata
        const userType = user.publicMetadata?.role || "customer"

        if (userType === "company") {
            router.replace("/company-home")
        } else {
            router.replace("/home")
        }
    }, [isLoaded, user, router])

    return <div>{redirecting ? "Redirecting..." : null}</div>
}
