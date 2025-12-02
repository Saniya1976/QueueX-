"use client"

import { useState } from "react"
import { useSignIn, useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Mail, Loader2, CheckCircle2, ArrowLeft, Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuthModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

type UserType = "company" | "customer" | null

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [activeTab, setActiveTab] = useState("signin")
    const [showVerification, setShowVerification] = useState(false)
    const [pendingEmail, setPendingEmail] = useState("")
    const [userType, setUserType] = useState<UserType>(null)
    const [showUserTypeSelection, setShowUserTypeSelection] = useState(true)

    const { signIn, setActive, isLoaded: signInLoaded } = useSignIn()
    const { signUp, isLoaded: signUpLoaded } = useSignUp()
    const router = useRouter()

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setEmail("")
            setPassword("")
            setVerificationCode("")
            setError("")
            setSuccess("")
            setIsLoading(false)
            setShowVerification(false)
            setPendingEmail("")
            setUserType(null)
            setShowUserTypeSelection(true)
        }
        onOpenChange(newOpen)
    }

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        setError("")
        setSuccess("")
        setShowVerification(false)
        setVerificationCode("")
    }

    const handleUserTypeSelect = (type: UserType) => {
        setUserType(type)
        setShowUserTypeSelection(false)
    }

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!signInLoaded) return
    
        setIsLoading(true)
        setError("")
        setSuccess("")
    
        try {
            const result = await signIn.create({
                identifier: email,
                password,
            })
    
            if (result.status === "complete") {
                if (setActive) {
                    await setActive({ session: result.createdSessionId })
                }
                setSuccess("Successfully signed in!")
                setTimeout(() => {
                    onOpenChange(false)
                    if (userType === "company") {
                        router.push("/company-home")
                    } else {
                        router.push("/home")
                    }
                    router.refresh()
                }, 1000)
            } else if (result.status === "needs_second_factor") {
                setError("Two-factor authentication required")
            }
        } catch (err: any) {
            setError(err.errors?.[0]?.message || "Failed to sign in")
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!signUpLoaded) return
    
        setIsLoading(true)
        setError("")
        setSuccess("")
    
        try {
            const result = await signUp.create({
                emailAddress: email,
                password,
            })
    
            if (result.status === "complete") {
                if (setActive) {
                    await setActive({ session: result.createdSessionId })
                }
                setSuccess("Account created successfully!")
                setTimeout(() => {
                    onOpenChange(false)
                    if (userType === "company") {
                        router.push("/company-home")
                    } else {
                        router.push("/home")
                    }
                    router.refresh()
                }, 1000)
            } else {
                await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
                setPendingEmail(email)
                setShowVerification(true)
                setSuccess("Verification code sent to your email!")
            }
        } catch (err: any) {
            setError(err.errors?.[0]?.message || "Failed to sign up")
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!signUpLoaded) return
    
        setIsLoading(true)
        setError("")
        setSuccess("")
    
        try {
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            })
    
            if (result.status === "complete") {
                if (setActive) {
                    await setActive({ session: result.createdSessionId })
                }
                setSuccess("Email verified! Welcome to QueueX!")
                setTimeout(() => {
                    onOpenChange(false)
                    if (userType === "company") {
                        router.push("/company-home")
                    } else {
                        router.push("/home")
                    }
                    router.refresh()
                }, 1500)
            } else {
                setError("Invalid verification code. Please try again.")
            }
        } catch (err: any) {
            setError(err.errors?.[0]?.message || "Failed to verify email")
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleGoogleSignIn = async () => {
        if (!signInLoaded) return
    
        setIsLoading(true)
        setError("")
    
        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback", // temporary landing page
                redirectUrlComplete: "/",     // fallback
            })
        } catch (err: any) {
            setError(err.errors?.[0]?.message || "Failed to sign in with Google")
            setIsLoading(false)
        }
    }
    
    const handleGoogleSignUp = async () => {
        if (!signUpLoaded) return
    
        setIsLoading(true)
        setError("")
    
        try {
            await signUp.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            })
        } catch (err: any) {
            setError(err.errors?.[0]?.message || "Failed to sign up with Google")
            setIsLoading(false)
        }
    }
    

    const handleBack = () => {
        if (showVerification) {
            setShowVerification(false)
            setVerificationCode("")
            setError("")
            setSuccess("")
        } else {
            setShowUserTypeSelection(true)
            setUserType(null)
            setError("")
            setSuccess("")
        }
    }

    return (
        <>
            <div id="clerk-captcha" style={{ display: "none" }} />
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="!max-w-5xl !w-[95vw] p-0 gap-0 border-0 shadow-2xl bg-white rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 h-auto max-h-[90vh] md:max-h-[600px] !translate-x-[-50%] !translate-y-[-50%]">
                    {/* Left Side - Image */}
                    <div className="hidden md:block relative w-full h-full min-h-[500px]">
                        <Image
                            src="/queue.jpg"
                            alt="Queue"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Mobile Image */}
                    <div className="md:hidden relative w-full h-48">
                        <Image
                            src="/queue.jpg"
                            alt="Queue"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Right Side - Auth Form */}
                    <div className="w-full flex items-center justify-center p-6 md:p-8 overflow-y-auto">
                        {showUserTypeSelection ? (
                            // User Type Selection
                            <div className="w-full max-w-sm">
                                <div className="text-center mb-6">
                                    <DialogTitle className="text-xl font-semibold mb-0.5">
                                        <span className="text-emerald-600">Queue</span>
                                        <span className="text-gray-900">X</span>
                                    </DialogTitle>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Choose your account type
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => handleUserTypeSelect("company")}
                                        className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition-colors">
                                                <Building2 className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-semibold text-sm text-gray-900">Company</h3>
                                                <p className="text-xs text-gray-500">Create and manage queues</p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleUserTypeSelect("customer")}
                                        className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition-colors">
                                                <Users className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-semibold text-sm text-gray-900">Customer</h3>
                                                <p className="text-xs text-gray-500">Join queues and track position</p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ) : showVerification ? (
                            <div className="w-full max-w-sm">
                                <div className="text-center mb-5">
                                    <DialogTitle className="text-xl font-bold mb-0.8">
                                        <span className="text-emerald-800 font-bold">Queue</span>
                                        <span className="text-gray-900 font-bold">X</span>
                                    </DialogTitle>
                                    <p className="text-xs text-gray-500">
                                        {pendingEmail}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-center">
                                        <InputOTP
                                            maxLength={6}
                                            value={verificationCode}
                                            onChange={setVerificationCode}
                                            disabled={isLoading}
                                        >
                                            <InputOTPGroup className="gap-1.5">
                                                <InputOTPSlot index={0} className="w-9 h-10 border-gray-300 rounded-lg" />
                                                <InputOTPSlot index={1} className="w-9 h-10 border-gray-300 rounded-lg" />
                                                <InputOTPSlot index={2} className="w-9 h-10 border-gray-300 rounded-lg" />
                                                <InputOTPSlot index={3} className="w-9 h-10 border-gray-300 rounded-lg" />
                                                <InputOTPSlot index={4} className="w-9 h-10 border-gray-300 rounded-lg" />
                                                <InputOTPSlot index={5} className="w-9 h-10 border-gray-300 rounded-lg" />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>

                                    {error && (
                                        <div className="text-xs text-red-600 text-center bg-red-50 py-1.5 rounded-lg">
                                            {error}
                                        </div>
                                    )}

                                    {success && (
                                        <div className="text-xs text-emerald-600 text-center bg-emerald-50 py-1.5 rounded-lg flex items-center justify-center gap-1.5">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {success}
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleVerification}
                                        disabled={isLoading || verificationCode.length !== 6}
                                        className="w-full h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium text-sm rounded-lg"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                Verifying...
                                            </>
                                        ) : (
                                            "Verify"
                                        )}
                                    </Button>

                                    <button
                                        onClick={handleBack}
                                        className="w-full text-xs text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1.5 py-2"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        Back
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-w-sm">
                                <div className="text-center mb-5">
                                    <DialogTitle className="text-xl font-semibold mb-0.5">
                                        <span className="text-emerald-600">Queue</span>
                                        <span className="text-gray-900">X</span>
                                    </DialogTitle>
                                    <p className="text-xs text-gray-500">
                                        {userType === "company" ? "Company Account" : "Customer Account"}
                                    </p>
                                </div>

                                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                                    <TabsList className="grid w-full grid-cols-2 h-9 bg-gray-100 p-0.5 rounded-lg mb-4">
                                        <TabsTrigger
                                            value="signin"
                                            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-medium h-8"
                                        >
                                            Sign In
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="signup"
                                            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-medium h-8"
                                        >
                                            Sign Up
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="signin" className="space-y-3 mt-0">
                                        <div className="space-y-3">
                                            <Input
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm rounded-lg"
                                            />

                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="h-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm rounded-lg"
                                            />

                                            {error && (
                                                <div className="text-xs text-red-600 text-center bg-red-50 py-1.5 rounded-lg">
                                                    {error}
                                                </div>
                                            )}

                                            {success && (
                                                <div className="text-xs text-emerald-600 text-center bg-emerald-50 py-1.5 rounded-lg flex items-center justify-center gap-1.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    {success}
                                                </div>
                                            )}

                                            <Button
                                                onClick={handleEmailSignIn}
                                                disabled={isLoading}
                                                className="w-full h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium text-sm rounded-lg"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                        Signing in...
                                                    </>
                                                ) : (
                                                    "Sign In"
                                                )}
                                            </Button>
                                        </div>

                                        <div className="relative py-2">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200" />
                                            </div>
                                            <div className="relative flex justify-center text-xs">
                                                <span className="bg-white px-2 text-gray-500">or</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleGoogleSignIn}
                                            disabled={isLoading}
                                            variant="outline"
                                            className="w-full h-10 border-gray-300 hover:bg-gray-50 font-medium text-sm rounded-lg"
                                        >
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            Google
                                        </Button>

                                        <button
                                            onClick={handleBack}
                                            className="w-full text-xs text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1.5 py-2"
                                        >
                                            <ArrowLeft className="w-3.5 h-3.5" />
                                            Change account type
                                        </button>
                                    </TabsContent>

                                    <TabsContent value="signup" className="space-y-3 mt-0">
                                        <div className="space-y-3">
                                            <Input
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm rounded-lg"
                                            />

                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="h-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 text-sm rounded-lg"
                                            />

                                            {error && (
                                                <div className="text-xs text-red-600 text-center bg-red-50 py-1.5 rounded-lg">
                                                    {error}
                                                </div>
                                            )}

                                            {success && (
                                                <div className="text-xs text-emerald-600 text-center bg-emerald-50 py-1.5 rounded-lg flex items-center justify-center gap-1.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    {success}
                                                </div>
                                            )}

                                            <Button
                                                onClick={handleEmailSignUp}
                                                disabled={isLoading}
                                                className="w-full h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium text-sm rounded-lg"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                        Creating...
                                                    </>
                                                ) : (
                                                    "Create Account"
                                                )}
                                            </Button>
                                        </div>

                                        <div className="relative py-2">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200" />
                                            </div>
                                            <div className="relative flex justify-center text-xs">
                                                <span className="bg-white px-2 text-gray-500">or</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleGoogleSignUp}
                                            disabled={isLoading}
                                            variant="outline"
                                            className="w-full h-10 border-gray-300 hover:bg-gray-50 font-medium text-sm rounded-lg"
                                        >
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            Google
                                        </Button>

                                        <button
                                            onClick={handleBack}
                                            className="w-full text-xs text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1.5 py-2"
                                        >
                                            <ArrowLeft className="w-3.5 h-3.5" />
                                            Change account type
                                        </button>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}