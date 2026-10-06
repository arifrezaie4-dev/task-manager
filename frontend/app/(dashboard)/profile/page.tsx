"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import axios from "axios";
type User = {
    username: string;
    email: string;
    role: string;
    createdAt: string;
};

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState("");
    const [saving, setSaving] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordMessageType, setPasswordMessageType] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await userService.getMe();

                setUser(response.data);
                setUsername(response.data.username);
            } catch (error) {
                console.error(error);
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);
    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            const response = await userService.updateProfile({
                username,
            });

            console.log("Update profile response:", response);

            setUser(response.data);
            setUsername(response.data.username);
            setEditing(false);
        } catch (error) {
            console.error(error);
            setError("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setChangingPassword(true);
            setPasswordMessage("");
            const response = await userService.changePassword({
                currentPassword,
                newPassword,
            });


            setPasswordMessage(response.message);
            setPasswordMessageType("success");

            setCurrentPassword("");
            setNewPassword("");
            setShowPasswordForm(false);
        } catch (error) {
            console.error(error);

            if (axios.isAxiosError(error)) {
                setPasswordMessage(
                    error.response?.data?.message ||
                    "Failed to change password."
                );
            } else {
                setPasswordMessage("Failed to change password.");
            }

            setPasswordMessageType("error");
        } finally {
            setChangingPassword(false);
        }
    };


    if (loading) {
        return (
            <div className="container py-5">
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <p className="text-danger">{error}</p>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="container py-5">
                <p className="text-danger">User profile not found.</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4">Profile</h2>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title mb-4">Personal Information</h5>

                    <div className="mb-3">
                        <strong>Username:</strong>

                        {editing ? (
                            <form onSubmit={handleUpdateProfile} className="mt-2">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={saving}
                                    >
                                        {saving ? "Saving..." : "Save"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setUsername(user.username);
                                            setEditing(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <span className="ms-2">{user.username}</span>

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary ms-3"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>

                    <div className="mb-3">
                        <strong>Email:</strong>
                        <span className="ms-2">{user.email}</span>
                    </div>

                    <div className="mb-3">
                        <strong>Role:</strong>
                        <span className="ms-2">{user.role}</span>
                    </div>

                    <div>
                        <strong>Member since:</strong>
                        <span className="ms-2">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {!showPasswordForm ? (
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => setShowPasswordForm(true)}
                    >
                        Change Password
                    </button>
                ) : (
                    <form onSubmit={handleChangePassword}>
                        <h5 className="mb-3">Change Password</h5>

                        <div className="mb-3">
                            <label className="form-label">
                                Current Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                New Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                            disabled={changingPassword}
                        >
                            {changingPassword ? "Changing..." : "Change Password"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowPasswordForm(false)}
                        >
                            Cancel
                        </button>
                    </form>
                )}

                {passwordMessage && (
                    <p
                        className={`mt-3 ${passwordMessageType === "success"
                            ? "text-success"
                            : "text-danger"
                            }`}
                    >
                        {passwordMessage}
                    </p>
                )}
            </div>
        </div>
    );
}