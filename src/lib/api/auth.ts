import type { ApiResponse } from "@/types/base";
import { howl } from "../utils";
import type { UserType } from "@/types/global";


export async function loginApi(body: { email: string; password: string;}):Promise<ApiResponse<{
    user: UserType
    token: string
  }>> {
    return howl("/auth/login",{
        method:"POST",
        body
    })
}

export async function signupApi(body: {name:string; email: string; password: string;}):Promise<ApiResponse<{
    user: {
      id: number
      name: string
      email: string
      status: string
      verified: boolean
    }
  }>> {
    return howl("/auth/register",{
        method:"POST",
        body
    })
}

export async function verifyOtpApi(body: {email: string; otp: string;}):Promise<ApiResponse<{
      id: number
      name: string
      email: string
      status: string
      verified: boolean
  }>> {
    return howl("/auth/email/verify-otp",{
        method:"POST",
        body
    })
}
export async function forgotVerifyOtpApi(body: {email: string; otp: string;}):Promise<ApiResponse<{
      email: string
      password_reset_token: string
  }>> {
    return howl("/auth/forgot-password/verify-otp",{
        method:"POST",
        body
    })
}

export async function forgotApi(body: {email: string;}):Promise<ApiResponse<unknown>> {
    return howl("/auth/forgot-password",{
        method:"POST",
        body
    })
}

export async function updateForgotPasswordApi(body: {
    email: string;
    password_reset_token: string;
    password: string;
    password_confirmation: string;
}): Promise<ApiResponse<unknown>> {
    return howl("/auth/forgot-password/update-password", {
        method: "POST",
        body,
    });
}

export async function exchangeGoogleTokenApi(body: {
    token: string;
}): Promise<ApiResponse<{ token: string }>> {
    return howl("/auth/google/exchange-token", {
        method: "POST",
        body,
    });
}
