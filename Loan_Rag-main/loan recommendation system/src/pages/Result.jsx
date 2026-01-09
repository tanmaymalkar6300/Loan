import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaUniversity,
  FaArrowLeft,
  FaDownload,
} from "react-icons/fa";
import ChatBot from "./ChatBot";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Restore data from sessionStorage (PRODUCTION FIX)
  const storedData = sessionStorage.getItem("loanResult");
  const parsedData = storedData ? JSON.parse(storedData) : {};

  const { formData, recommendation } =
    location.state || parsedData || {};

  useEffect(() => {
    if (!formData || !recommendation) {
      navigate("/");
      return;
    }
    setIsVisible(true);
  }, [formData, recommendation, navigate]);

  const handleNewSearch = () => {
    sessionStorage.removeItem("loanResult");
    navigate("/");
  };

  const handleDownloadReport = () => {
    const reportData = {
      applicant: formData,
      recommendation,
      generatedAt: new Date().toLocaleString(),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "loan_recommendation_report.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!formData || !recommendation) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-4">
      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <FaChartLine className="text-white text-3xl" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your Loan Recommendations
          </h1>
          <p className="text-gray-600">
            Personalized results based on your profile
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleNewSearch}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              <FaArrowLeft className="mr-2" />
              New Search
            </button>

            <button
              onClick={handleDownloadReport}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              <FaDownload className="mr-2" />
              Download Report
            </button>
          </div>
        </div>

        {/* PROFILE */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaUser className="mr-3 text-blue-600" />
            Applicant Profile
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><b>Name:</b> {formData.name}</div>
            <div><b>Age:</b> {formData.age}</div>
            <div><b>Income:</b> ₹{Number(formData.income).toLocaleString()}</div>
            <div><b>Status:</b> {formData.maritalStatus ? "Married" : "Single"}</div>
          </div>
        </div>

        {/* ELIGIBILITY */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Eligibility Status</h2>

          <div className="flex items-center">
            {recommendation.eligibility === "Eligible" && (
              <FaCheckCircle className="text-green-600 text-3xl mr-4" />
            )}
            {recommendation.eligibility === "Partially Eligible" && (
              <FaExclamationTriangle className="text-yellow-600 text-3xl mr-4" />
            )}
            {recommendation.eligibility === "Not Eligible" && (
              <FaInfoCircle className="text-red-600 text-3xl mr-4" />
            )}

            <div>
              <div className="text-xl font-bold">
                {recommendation.eligibility}
              </div>
              {recommendation.approvalChance && (
                <div className="text-gray-600">
                  Approval Chance:{" "}
                  <span className="font-bold text-green-600">
                    {recommendation.approvalChance}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BANKS */}
        {recommendation.recommendedBanks && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaUniversity className="mr-3 text-blue-600" />
              Recommended Banks
            </h2>

            <ul className="space-y-3">
              {recommendation.recommendedBanks.map((bank, idx) => (
                <li
                  key={idx}
                  className="flex justify-between p-4 bg-blue-50 rounded-xl"
                >
                  <span className="font-semibold">{bank}</span>
                  <span className="font-bold text-blue-700">
                    {recommendation.interestRates?.[idx] || "Contact Bank"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ChatBot formData={formData} recommendation={recommendation} />
    </div>
  );
};

export default Result;
