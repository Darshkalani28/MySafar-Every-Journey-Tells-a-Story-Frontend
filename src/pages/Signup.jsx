import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import API from "../services/api";
import "../styles/Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: personal info, 2: credentials
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password Strength Checker
  const checkPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[!@#$%^&*]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  };

  // Form Validation - Step 1
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Validation - Step 2
  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      checkPasswordStrength(value);
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setApiError("");
  };

  // Handle Next Step
  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  // Handle Signup Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);

    try {
      const response = await API.post("/user/signup", {
        fullname: formData.firstName + " " + formData.lastName,
        email: formData.email,
        password: formData.password,
        contact: "" // Optional field
      });

      console.log("🚀 ~ Signup successful:", response);

      // Note: Signup endpoint doesn't return tokens!
      // User must login after signup
      setApiError(""); // Clear any errors
      
      // Show success message or redirect to login
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Error creating account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "#e0e0e0";
    if (passwordStrength === 1) return "#ff6b6b";
    if (passwordStrength === 2) return "#ffa500";
    if (passwordStrength === 3) return "#4CAF50";
    return "#2ecc71";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Weak";
    if (passwordStrength === 1) return "Fair";
    if (passwordStrength === 2) return "Good";
    if (passwordStrength === 3) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="auth-container signup-container">
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
            <h1 className="auth-brand-title">Start Your Journey</h1>
            <p className="auth-brand-subtitle">
              Create an account to share your travel stories with the world
            </p>
          </div>

          <div className="auth-features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Create and share stories</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Connect with travelers</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <span>Discover new destinations</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-section">
          <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="auth-form">
            <h2 className="form-title">Create Account</h2>
            <p className="form-subtitle">
              {step === 1 ? "Tell us about yourself" : "Secure your account"}
            </p>

            {/* Progress Steps */}
            <div className="form-steps">
              <div className={`step ${step >= 1 ? "active" : ""}`}>
                <span>1</span>
                <span className="step-label">Info</span>
              </div>
              <div className={`step-line ${step >= 2 ? "active" : ""}`}></div>
              <div className={`step ${step >= 2 ? "active" : ""}`}>
                <span>2</span>
                <span className="step-label">Security</span>
              </div>
            </div>

            {/* API Error Message */}
            {apiError && (
              <div className="error-alert">
                <AlertCircle size={18} />
                <span>{apiError}</span>
              </div>
            )}

            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="form-step">
                {/* First Name */}
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={18} />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`form-input ${errors.firstName ? "input-error" : ""}`}
                    />
                  </div>
                  {errors.firstName && (
                    <span className="field-error">{errors.firstName}</span>
                  )}
                </div>

                {/* Last Name */}
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={18} />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`form-input ${errors.lastName ? "input-error" : ""}`}
                    />
                  </div>
                  {errors.lastName && (
                    <span className="field-error">{errors.lastName}</span>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Credentials */}
            {step === 2 && (
              <div className="form-step">
                {/* Email */}
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

                {/* Password */}
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

                  {/* Password Strength */}
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bars">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`strength-bar ${
                              passwordStrength >= i ? "filled" : ""
                            }`}
                            style={{
                              backgroundColor:
                                passwordStrength >= i
                                  ? getPasswordStrengthColor()
                                  : "#e0e0e0",
                            }}
                          ></div>
                        ))}
                      </div>
                      <span
                        className="strength-text"
                        style={{ color: getPasswordStrengthColor() }}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  )}

                  {errors.password && (
                    <span className="field-error">{errors.password}</span>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="field-error">{errors.confirmPassword}</span>
                  )}
                </div>

                {/* Terms Agreement */}
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>
                    I agree to the{" "}
                    <Link to="#" className="text-link">
                      Terms & Conditions
                    </Link>
                  </span>
                </label>
              </div>
            )}

            {/* Buttons */}
            <div className="form-buttons">
              {step === 2 && (
                <button
                  type="button"
                  className="auth-back-btn"
                  onClick={() => setStep(1)}
                >
                  ← Go Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`auth-submit-btn ${loading ? "loading" : ""}`}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    {step === 1 ? "Proceeding..." : "Creating Account..."}
                  </>
                ) : (
                  <>
                    {step === 1 ? "Next Step" : "Sign Up"}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="auth-footer">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
