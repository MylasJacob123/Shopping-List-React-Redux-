import React from "react";
import "./UserProfile.css";

function UserProfile() {
  return (
    <div>
        <h1> Profile</h1>
        <div className="profile-container">
            <ul>
                <li>username</li>
                <li>age</li>
                <li>email</li>
            </ul>
        </div>
    </div>
  )
}
export default UserProfile;