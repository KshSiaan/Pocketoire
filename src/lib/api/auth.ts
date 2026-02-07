import { ApiResponse } from "@/types/base";
import { howl } from "../utils";
import { UserType } from "@/types/global";


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