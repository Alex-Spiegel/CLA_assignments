import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="h-12 px-5 py-1 flex justify-between items-center bg-navLight">
      <Link href="/challenges" className="font-bold hover:underline">
        Challenges
      </Link>
      <Button className="px-4 h-8 text-myWhite bg-primary">Logout</Button>
    </nav>
  );
}

export default Navbar;
