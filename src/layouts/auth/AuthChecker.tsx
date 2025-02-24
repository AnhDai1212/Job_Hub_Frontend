import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkTokenIsValid() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/auth/introspect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!data.result.valid) {
          console.log("Token hết hạn hoặc không hợp lệ, đăng xuất...");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }

    checkTokenIsValid();
  }, [navigate]);

  return null; // Component này chỉ dùng để kiểm tra, không render gì cả
};

export default AuthChecker;
