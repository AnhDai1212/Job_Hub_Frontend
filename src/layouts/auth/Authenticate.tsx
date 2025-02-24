import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { getToken, KEY_TOKEN, setToken } from "../../service/LocalStorageService";

interface UserDetails {
  name: string;
  email: string;
  picture?: string;
  given_name: string;
}

export default function Authenticate() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getToken()); // Dùng state để theo dõi token

  useEffect(() => {
    console.log("Current URL:", window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);
    console.log("isMatch:", isMatch);

    if (isMatch) {
      const authCode = isMatch[1];

      fetch(`http://localhost:8080/auth/outbound/authentication?code=${authCode}`, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response data:", data);
          const token = data.result?.token; // Gán token vào biến
          if (token) {
            setToken(token); // Lưu vào localStorage
            setAccessToken(token); // Cập nhật state
            setIsLoggedIn(true);
            console.log("Stored token:", token);
          } else {
            console.error("No token found in response");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
          navigate("/login");
        });
    } else {
      console.log("No auth code found in URL");
      if (!accessToken) {
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (accessToken) {
      getUserDetails(accessToken);
    }
  }, [accessToken]);

  const getUserDetails = async (token: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      console.log("User Info:", data);
      setUserDetails(data);
      // Điều hướng đến trang chính sau khi lấy thông tin user
      setTimeout(() => navigate("/authenticate"), 1000); // Đợi 1s để hiển thị thông tin (tùy chọn)
    } catch (error) {
      console.error("Error fetching user details:", error);
      navigate("/login");
    }
  };

  return (
    <>
      {userDetails ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          bgcolor={"#f0f2f5"}
        >
          <Card
            sx={{
              minWidth: 400,
              maxWidth: 500,
              boxShadow: 4,
              borderRadius: 4,
              padding: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {userDetails.picture && (
                <img
                  src={userDetails.picture}
                  alt={`${userDetails.given_name}'s profile`}
                  className="profile-pic"
                />
              )}
              <p>Welcome back to Devteria,</p>
              <h1 className="name">{userDetails.name}</h1>
              <p className="email">{userDetails.email}</p>
            </Box>
          </Card>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
          <Typography ml={2}>Loading...</Typography>
        </Box>
      )}
    </>
  );
}