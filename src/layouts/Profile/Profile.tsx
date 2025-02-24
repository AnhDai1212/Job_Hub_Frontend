import React, { useEffect, useState } from "react";
import { UserModel } from "../../models/UserModel";
import { getMyInfo } from "../../api/UserAPI";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getMyInfo("http://localhost:8080/users/myInfo");
      setUser(data);
    }
    fetchData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm animate__animated animate__fadeIn">
        <h2 className="text-center mb-4">User Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Location:</strong> {user.location || "N/A"}</p>
            <p><strong>Date of Birth:</strong> {user.dob || "N/A"}</p>
            <p><strong>Created At:</strong> {new Date(user.createAt || "").toLocaleString()}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
