"use client";
import Navbar from "@/_myComponents/Navbar";
import ChallengeForm from "@/_myComponents/ChallengeForm";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ChallengeEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("id"); // ID aus URL holen

  const [challengeData, setChallengeData] = useState(null);

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const response = await fetch(`/api/challenges/get/${challengeId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch challenge");
        }
        const data = await response.json();
        setChallengeData(data);
      } catch (error) {
        console.error("Error fetching challenge:", error);
      }
    }

    if (challengeId) {
      fetchChallenge();
    }
  }, [challengeId]);

  return challengeData ? (
    <div>
      <Navbar />
      <ChallengeForm challengeData={challengeData} />
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ChallengeEdit;
