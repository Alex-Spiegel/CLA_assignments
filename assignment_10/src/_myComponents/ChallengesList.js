"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

const getChallenges = async () => {
  try {
    const response = await fetch("http://localhost:3000/challenges");
    if (!response.ok) {
      throw new Error("Failed to fetch challenges");
    }
    const challenges = await response.json();
    return challenges.map(({ title, category, level, createdAt }) => ({
      title,
      category,
      level,
      createdAt,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

function ChallengesList() {
  const router = useRouter();
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    async function fetchChallenges() {
      const data = await getChallenges();
      setChallenges(data);
    }
    fetchChallenges();
  }, []);

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
              <TableHead className="text-center"> Category</TableHead>
              <TableHead className="text-center">Difficulty</TableHead>
              <TableHead className="text-center">Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {challenges.map((challenge, index) => (
              <TableRow key={index} className="text-center">
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
                  <Button className="size-10 mx-1 bg-primary p-1 rounded hover:bg-blue-700">
                    <MdEdit className="text-myWhite" />
                  </Button>
                  <Button className="size-10 mx-1 bg-red-600 p-1 rounded">
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
