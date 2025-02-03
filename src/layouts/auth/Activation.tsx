import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Activation() {
    const { email, activationCode } = useParams();
    const [isActivation, setIsActivation] = useState(false);
    const [notification, setNotification] = useState("");
    const navigate = useNavigate(); 


    useEffect(() => {
        console.log("useEffect triggered");
        if (email && activationCode) {
            handleActivation();
        }
       
    }, [email, activationCode]);

    const handleActivation = async () => {
        try {
            const url = `http://localhost:8080/users/activate?email=${email}&activationCode=${activationCode}`;
            const response = await fetch(url, { method: "GET" });
            const data = await response.json();
            if (response.ok) {
                setIsActivation(true);
                setNotification(data.result || "Tài khoản đã kích hoạt thành công, bạn hãy đăng nhập để tiếp tục sử dụng dịch vụ!");
                const timer = setTimeout(() =>{
                    navigate("/");  
                }, 10000)
                //  Cleanup timeout on unmount
                 return () => clearTimeout(timer);
            } else {
                console.log("Loi")
                setNotification(data.result || "Đã có lỗi xảy ra!");
            }
        } catch (error) {
            setNotification("Lỗi kết nối, vui lòng thử lại sau!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Activate Account</h1>
                <p className="text-gray-600">Email: <span className="font-medium">{email}</span></p>
                <p className="text-gray-600">Activation Code: <span className="font-medium">{activationCode}</span></p>
                {isActivation ? (
                    <div className="mt-4 text-green-600 font-semibold">
                         <p className="mt-4 text-red-500"  style={{ color: isActivation ? "green" : "red" }}>{notification}</p>
                    </div> 
                ) : (
                    <p className="mt-4 text-red-500"  style={{ color: isActivation ? "green" : "red" }}>{notification}</p>
                )}
            </div>
        </div>
    );
}

export default Activation;
