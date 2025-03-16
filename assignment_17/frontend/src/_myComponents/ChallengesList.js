"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MdEdit, MdDelete } from "react-icons/md";

const getChallenges = async (token) => {
  try {
    const response = await fetch("/api/challenges/list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch challenges");
    }

    const challenges = await response.json();
    return challenges.map(({ _id, title, category, level, createdAt }) => ({
      id: _id,
      title,
      category,
      level,
      createdAt: new Date(createdAt).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error fetching challenges:", error.message);
    return [];
  }
};

function ChallengesList() {
  const router = useRouter();
  const [challenges, setChallenges] = useState([]);
  const token = useSelector((state) => state.auth.token); // Redux-Token holen

  useEffect(() => {
    if (!token) return;

    async function fetchChallenges() {
      const data = await getChallenges(token);
      setChallenges(data);
    }

    fetchChallenges();
  }, [token]);

  const deleteChallenge = async (id) => {
    if (!token) {
      console.error("No token available");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this challenge?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/challenges/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete challenge");
      }

      setChallenges((prevChallenges) =>
        prevChallenges.filter((challenge) => challenge.id !== id)
      );
      alert("Challenge deleted successfully!");
    } catch (error) {
      console.error("Error deleting challenge:", error.message);
      alert("Failed to delete challenge.");
    }
  };

  return (
    <div className="p-2 overflow-x-auto">
      <h1 className="text-2xl font-bold">Your challenges</h1>
      <Button
        className="px-4 my-4 h-8 text-myWhite bg-primary"
        onClick={() => router.push("/challengemake")}
      >
        New Challenge
      </Button>
      <div className="max-h-96 px-4 py-6 mt-8 overflow-y-auto rounded-md shadow-md ">
        <Table className="border border-zinc-300">
          <TableHeader>
            <TableRow className="text-MyLightGray">
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Difficulty</TableHead>
              <TableHead className="text-center">Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {challenges.map((challenge) => (
              <TableRow key={challenge.id} className="text-center">
                <TableCell className="border border-zinc-300">
                  {challenge.title}
                </TableCell>
                <TableCell className="border border-zinc-300">
                  {challenge.category}
                </TableCell>
                <TableCell className="border border-zinc-300">
                  {challenge.level}
                </TableCell>
                <TableCell className="border border-zinc-300">
                  {challenge.createdAt}
                </TableCell>
                <TableCell className="border border-zinc-300">
                  <Button
                    className="size-10 mx-1 bg-primary p-1 rounded hover:bg-blue-700"
                    onClick={() => {
                      router.push(`/challengeedit?id=${challenge.id}`);
                    }}
                  >
                    <MdEdit className="text-myWhite" />
                  </Button>
                  <Button
                    className="size-10 mx-1 bg-red-600 p-1 rounded"
                    onClick={() => deleteChallenge(challenge.id)}
                  >
                    <MdDelete className="text-myWhite" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ChallengesList;
