import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import Swal from "sweetalert2";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changingPassword, setChangingPassword] = useState(false);

  const handleSaveProfile = async () => {
    try {
      setSaving(true);

      const response = await userService.updateProfile({
        username,
      });

      setUser(response.data);
      setUsername(response.data.username);
      setIsEditing(false);

      await Swal.fire({
        title: "Success!",
        text: "Your profile has been updated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);

      await Swal.fire({
        title: "Failed!",
        text: error.response?.data?.message || "Failed to update your profile.",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
    } finally {
      setSaving(false);
    }
  };
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      await Swal.fire({
        title: "Missing fields!",
        text: "Please fill in all password fields.",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });

      return;
    }

    if (newPassword !== confirmPassword) {
      await Swal.fire({
        title: "Passwords don't match!",
        text: "New password and confirmation must be the same.",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });

      return;
    }

    if (newPassword.length < 8) {
      await Swal.fire({
        title: "Password too short!",
        text: "Password must be at least 8 characters.",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });

      return;
    }

    try {
      setChangingPassword(true);

      await userService.changePassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);

      await Swal.fire({
        title: "Success!",
        text: "Your password has been changed successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to change password:", error);

      await Swal.fire({
        title: "Failed!",
        text:
          error.response?.data?.message || "Failed to change your password.",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
    } finally {
      setChangingPassword(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getMe();
        setUser(response.data);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My Profile</h2>
        <p className="text-muted mb-0">Manage your account information</p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex align-items-center mb-4">
            <div
              className="bg-primary text-white rounded-circle d-flex
                         justify-content-center align-items-center
                         me-3"
              style={{
                width: "70px",
                height: "70px",
                fontSize: "28px",
                fontWeight: "600",
              }}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <h4 className="fw-bold mb-1">{user.username}</h4>

              <p className="text-muted mb-2">{user.email}</p>

              <span className="badge bg-primary">{user.role}</span>
            </div>
          </div>

          <hr />

          <div className="mt-4">
            <h5 className="fw-bold mb-3">Personal Information</h5>

            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label text-muted">Username</label>

                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  <div className="form-control bg-light">{user.username}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted">Email</label>

                <div className="form-control bg-light">{user.email}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted">Role</label>

                <div className="form-control bg-light">{user.role}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted">Member Since</label>

                <div className="form-control bg-light">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="mt-5">
            <h5 className="fw-bold mb-3">Account Security</h5>

            <div className="d-flex justify-content-between align-items-center border rounded p-3">
              <div>
                <h6 className="mb-1">Password</h6>
                <small className="text-muted">Keep your account secure</small>
              </div>

              <button
                className="btn btn-outline-primary"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                {showPasswordForm ? "Cancel" : "Change Password"}
              </button>
            </div>

            {/* Change Password Form */}
            {showPasswordForm && (
              <div className="border rounded p-4 mt-3">
                <h6 className="fw-bold mb-3">Change Password</h6>

                <div className="mb-3">
                  <label className="form-label">Current Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">New Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="text-end">
                  <button
                    className="btn btn-primary"
                    onClick={handleChangePassword}
                    disabled={changingPassword}
                  >
                    {changingPassword ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Changing...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-end">
            {isEditing ? (
              <>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setUsername(user.username);
                    setIsEditing(false);
                  }}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleSaveProfile}
                  disabled={saving || !username.trim()}
                >
                  {saving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary px-4"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
