import { METHODS } from "http";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Activation() {
    const { email } = useParams();
    const { activeCode } = useParams();

    const [isActiveCode, setIsActiveCode] = useState(false);
    const [notification, setNotification] = useState("");

    useEffect(() => {
        if (email && activeCode) {
            handleActiveCode();
        }
    }, [email, activeCode]);

    const handleActiveCode = async () => {
        try {
            const url: string = `localhost:8080/user/activate`;
            const response = await fetch(url, { method: "GET" });
            if (response.ok) {
                setIsActiveCode(true);
            } else {
                setIsActiveCode(false);
                console.log("Error");
                setNotification(response.text + "");
            }
        } catch (Error) {
            setNotification("Error when activating !");
        }
    }

    return (
        <div>
            <h1>Activate account</h1>
            <p>Email: {email}</p>
            <p>Activation Code: {activeCode}</p>
            {
                isActiveCode
                    ? (<p> Account has been activated successfully, please log in to continue using the service!</p>)
                    : (
                        <p>{notification}</p>
                    )
            }
        </div>
    )

}
export default Activation;