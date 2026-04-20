import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import API from "../services/api";
import "../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setApiError("");
  };

  // Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await API.post("/user/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log("🚀 ~ handleSubmit ~ response:", response)

      // Store tokens and user data - Fixed to match backend response structure
      const { accessToken, refreshToken, user } = response.data.data;
      
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/Destination");
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container login-container">
      {/* Animated Background */}
      <div className="auth-background">
        <div className="auth-blob blob-1"></div>
        <div className="auth-blob blob-2"></div>
        <div className="auth-blob blob-3"></div>
      </div>

      {/* Content */}
      <div className="auth-content">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-logo-section">
            <div className="auth-logo">
              <span className="logo-text">mysafar</span>
            </div>
            <h1 className="auth-brand-title">Welcome Back</h1>
            <p className="auth-brand-subtitle">
              Continue your travel journey and relive your amazing stories
            </p>
          </div>

          <div className="auth-features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Access all your travel stories</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Connect with fellow travelers</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Plan your next adventure</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-section">
          <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="form-title">Login</h2>
            <p className="form-subtitle">Sign in to your account</p>

            {/* API Error Message */}
            {apiError && (
              <div className="error-alert">
                <AlertCircle size={18} />
                <span>{apiError}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                />
              </div>
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-footer-top">
              <label className="checkbox-label">
                <input type="checkbox" id="remember" />
                <span>Remember me</span>
              </label>
              <Link to="#" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`auth-submit-btn ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="auth-footer mt-3">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="auth-link">
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
