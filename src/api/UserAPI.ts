import React from "react";
import { UserModel } from "../models/UserModel";
import { KEY_TOKEN } from "../service/LocalStorageService";


export async function getMyInfo(url: string): Promise<UserModel | null> {
  try {
    const token = localStorage.getItem(KEY_TOKEN); // Lấy token từ localStorage
    if (!token) throw new Error("No token found");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Gửi token trong header
      },
    });

    if (!response.ok) throw new Error("Error when calling API");

    const responseData = await response.json();
    return responseData.result as UserModel;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

export async function handLoginGoogle(credentialResponse: { credential: string }) {

  const token = credentialResponse.credential;

  if (!token) {
    console.log("No credential received");
    return;
  }
  try {
    const response = await fetch("http://localhost:8080/auth/introspect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token })
    })

    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      console.log("Login successful:", responseData);
    } else {
      throw new Error("Authentication failed");
    }

  } catch (error) {
    console.error("Google login error:", error);
  }


}

