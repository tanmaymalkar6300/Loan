import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCalendarAlt,
  FaDollarSign,
  FaUniversity,
  FaHeart,
  FaCreditCard,
  FaRocket,
  FaStar,
  FaDatabase,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(apiKey);

const LoanForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    income: "",
    loanType: "personal",
    amount: "",
    cibilScore: "",
    maritalStatus: false,
  });

  const [loading, setLoading] = useState(false);
  const [embeddingsData, setEmbeddingsData] = useState([]);
  const [embeddingsLoading, setEmbeddingsLoading] = useState(true);

  useEffect(() => {
    loadEmbeddings();
  }, []);

  const loadEmbeddings = async () => {
    try {
      const res = await fetch("/embeddings.json");
      const data = await res.json();
      setEmbeddingsData(data);
    } catch {
      setEmbeddingsData([]);
    } finally {
      setEmbeddingsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

      const response = await model.generateContent(`
        Give loan recommendation in JSON for:
        Name: ${formData.name}
        Age: ${formData.age}
        Income: ${formData.income}
        Loan Type: ${formData.loanType}
        Amount: ${formData.amount}
        CIBIL: ${formData.cibilScore}
        Marital Status: ${formData.maritalStatus ? "Married" : "Single"}
      `);

      const text = response.response.text();
      const json = JSON.parse(text.match(/\{[\s\S]*\}/)[0]);

      // ✅ SAVE RESULT (CRITICAL FIX)
      sessionStorage.setItem(
        "loanResult",
        JSON.stringify({ formData, recommendation: json })
      );

      navigate("/result", {
        state: { formData, recommendation: json },
      });
    } catch (err) {
      const errorRecommendation = {
        error: true,
        message: "Unable to get recommendations. Please try again.",
      };

      // ✅ SAVE ERROR STATE
      sessionStorage.setItem(
        "loanResult",
        JSON.stringify({ formData, recommendation: errorRecommendation })
      );

      navigate("/result", {
        state: { formData, recommendation: errorRecommendation },
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-10">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Smart Loan Advisor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
            required
          />

          <input
            name="income"
            type="number"
            placeholder="Monthly Income"
            value={formData.income}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
            required
          />

          <input
            name="amount"
            type="number"
            placeholder="Loan Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
          >
            {loading ? "Analyzing..." : "Get Recommendation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
