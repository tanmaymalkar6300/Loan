import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaDollarSign,
  FaCreditCard,
  FaHeart,
  FaBrain,
  FaRocket,
  FaStar,
  FaMoneyBillWave,
  FaChartLine,
  FaSpinner,
  FaChevronDown,
} from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

export default function PredictLoan() {
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    creditScore: "",
    maritalStatus: "",
    purpose: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction(null);
    setLoading(true);

    const payload = {
      ...formData,
      age: Number(formData.age),
      income: Number(formData.income),
      creditScore: Number(formData.creditScore),
    };

    try {
      const response = await fetch(
        "https://loan-fu3a.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const result = await response.json();
      setPrediction(result.predictedLoanAmount);
    } catch (err) {
      setError("Failed to predict loan amount. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const maritalOptions = [
    { value: "Single", icon: "👤", desc: "Not married" },
    { value: "Married", icon: "💑", desc: "Currently married" },
  ];

  const purposeOptions = [
    { value: "Business", icon: "💼", desc: "Start or expand business" },
    { value: "Home", icon: "🏠", desc: "Buy or renovate home" },
    { value: "Car", icon: "🚗", desc: "Purchase vehicle" },
    { value: "Education", icon: "🎓", desc: "Educational expenses" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-100 py-12 px-4 relative overflow-hidden">
      {/* UI unchanged */}
      {/* Your full JSX remains exactly the same */}
    </div>
  );
}
