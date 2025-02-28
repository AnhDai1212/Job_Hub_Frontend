import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Card, CircularProgress, Typography, TextField, Button } from "@mui/material";
import { getToken, KEY_TOKEN, setToken } from "../../service/LocalStorageService";

interface UserDetails {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
  given_name: string;
  noPassword: boolean;
}

export default function Authenticate() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getToken());
  const [password, setPassword] = useState<string>("");
  const [noPassword, setNoPassword] = useState<boolean>(false);

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);
    console.log(localStorage.getItem(KEY_TOKEN));

    if (isMatch) {
      const authCode = isMatch[1];

      fetch(`http://localhost:8080/auth/outbound/authentication?code=${authCode}`, { method: "POST" })
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then(data => {
          const token = data.result?.token;
          if (token) {
            setToken(token);
            setAccessToken(token);
            setIsLoggedIn(true);
          } else {
            navigate("/login");
          }
        })
        .catch(() => navigate("/login"));
    } else if (!accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (accessToken) {
      getUserDetails(accessToken);
    }
  }, [accessToken]);

  const getUserDetails = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8080/users/myInfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user details");

      const data = await response.json();
      setUserDetails(data.result);
      setNoPassword(data.result.noPassword);

    } catch {
      navigate("/login");
    }
  };

  const handleSetPassword = async () => {
    try {
      const response = await fetch("http://localhost:8080/users/create-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error("Failed to set password");

      setNoPassword(false); // Cập nhật trạng thái
    } catch (error) {
      console.error("Error setting password:", error);
    }
  };

  return (
    <>
      {userDetails ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor={"#f0f2f5"}>
          <Card sx={{ minWidth: 400, maxWidth: 500, boxShadow: 4, borderRadius: 4, padding: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              {userDetails.picture && (
                <img src={userDetails.picture} alt={`${userDetails.given_name}'s profile`} className="profile-pic" />
              )}
              <Typography variant="h6">Welcome, {userDetails.username}</Typography>
              <Typography>Email: {userDetails.email}</Typography>

              {noPassword ? (
                <Box mt={2}>
                  <TextField
                    label="Enter Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={handleSetPassword} sx={{ mt: 2 }}>
                    Set Password
                  </Button>
                </Box>
              ) : (
                <Typography mt={2} color="green">Password is already set.</Typography>
              )}
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
