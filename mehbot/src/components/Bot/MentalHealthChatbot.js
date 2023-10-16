import React, { useState } from 'react';

const MentalHealthChatbot = () => {
  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [diagnosis, setDiagnosis] = useState(null);
  const questions = [
    "Do you often feel sad or hopeless?",
    "Do you have trouble concentrating?",
    "Have you experienced a loss of interest in things you once enjoyed?",
    "Do you have trouble sleeping, either sleeping too much or too little?",
    "Have you had thoughts of self-harm or suicide?",
    // Add more questions as needed
  ];

  const handleResponse = async (response) => {
    setResponses([...responses, response]);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const diagnosisResponse = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses: responses }),
      });
      const diagnosisData = await diagnosisResponse.json();
      setDiagnosis(diagnosisData.diagnosis);
    }
  };

  return (
    <div>
      {diagnosis ? (
        <div>
          <p>Diagnosis: {diagnosis}</p>
        </div>
      ) : (
        <div>
          <p>Hello! I'm here to help you evaluate your mental health.</p>
          <p>{questions[currentQuestionIndex]}</p>
          <button onClick={() => handleResponse('yes')}>Yes</button>
          <button onClick={() => handleResponse('no')}>No</button>
        </div>
      )}
    </div>
  );
};

export default MentalHealthChatbot;
