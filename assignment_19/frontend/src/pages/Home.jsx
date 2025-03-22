import React, { useState } from "react";
import Testimonials from "../_components/Testimonials";
import InfoCard from "../_components/InfoCard";
import StatisticsCard from "../_components/StatisticsCard";
import FooterContact from "../_components/FooterContact";
import { Link } from "react-router-dom";
import RoleModal from "../_components/RoleModal";
import LoginRoleModal from "../_components/LoginRoleModal";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="bg-background text-sm">
      {/* section: nav bar */}
      <nav className="flex flex-col md:flex-row items-center md:justify-between h-10 max-w-[900px] mx-auto px-5 md:px-8 py-1 text-xs">
        <div className="flex items-center">
          <img className="h-8" src="./images/logo.svg" alt="CodeCla-logo" />
          <p className="text-base font-bold">CLA</p>
        </div>
        <div className="flex items-center">
          <a
            className="font-bold mr-2 hover:text-primary hover:underline"
            href="#coders-section"
          >
            For Coders
          </a>
          <a
            className="font-bold mr-2 hover:text-primary hover:underline"
            href="#managers-section"
          >
            For Managers
          </a>
          <Link
            to="#"
            onClick={() => setShowModal(true)}
            className="py-2 px-4 m-2 border border-primary rounded-md font-bold text-myWhite bg-primary hover:text-primary hover:bg-myWhite"
          >
            Join now
          </Link>

          {showModal && <RoleModal onClose={() => setShowModal(false)} />}
          <Link
            to="#"
            onClick={() => setShowLoginModal(true)}
            className="py-2 px-4 m-2 border border-primary rounded-md font-bold text-primary bg-myWhite hover:text-mywhite hover:bg-primary"
          >
            Login
          </Link>

          {showLoginModal && (
            <LoginRoleModal onClose={() => setShowLoginModal(false)} />
          )}
        </div>
      </nav>

      {/* section: Hero */}
      <section className="flex flex-col items-center gap-5 text-center max-w-[900px] my-[80px] mx-auto px-8">
        <h1 className="text-3xl font-bold">
          The Place for Competitive Programmers
        </h1>
        <p className="font-semibold">
          CodeCLA is where programmers participate in programming contests,
          solve algorithm and data structure challenges and become a part of an
          awesome community.
        </p>
        <div className="flex gap-4">
          <Link
            to="/signup"
            className="border border-primary rounded-md bg-primary w-36 py-2 px-4 font-bold text-xs text-myWhite  hover:text-primary hover:bg-myWhite"
          >
            Become a coder
          </Link>
          <Link
            to="/managersignup"
            className="border border-primary rounded-md bg-myWhite w-36 py-2 px-4 font-bold text-xs text-primary  hover:bg-primary hover:text-myWhite"
          >
            Become a manager
          </Link>
        </div>
      </section>

      {/* section: Statistics */}
      <section className="my-[80px] mx-auto px-5 text-center font-semibold">
        <h3 className="text-2xl text-primary font-bold">
          Practice to level-up
        </h3>
        <div className="grid grid-cols-2 gap-8 gap-x-4 mx-auto md:max-w-[60%]">
          <StatisticsCard stat="1K" title="Problems for practice" />
          <StatisticsCard stat="100+" title="Coders" />
          <StatisticsCard stat="10" title="Programming languages" />
          <StatisticsCard stat="130K" title="Submissions" />
        </div>
      </section>

      {/* section: For Coders */}
      <section className="my-[80px] mx-auto px-5 font-semibold">
        <h3 id="coders-section" className="text-2xl text-primary font-bold">
          For coders
        </h3>
        <p className="text-6xl font-bold py-3">
          What you will <span className="text-primary">gain</span>
        </p>
        <p className="my-2">
          You are a coder who wants to level up his skills in coding and problem
          solving? Here is what we provide.
        </p>
        {/* card container */}
        <div className="grid grid-cols-1 gap-3 my-1 md:grid md:grid-cols-2 md:my-6">
          <InfoCard
            title="Rich practice set of problems"
            description="Access a rich library of practice problems, algorithms, and data structures to enhance your skills"
          />
          <InfoCard
            title="Universal contests"
            description="Compete in regularly scheduled contests against top talent from around the globe"
          />
          <InfoCard
            title="Constant feedback"
            description="Receive personalized insights and feedback to improve your problem-solving abilities"
          />
          <InfoCard
            title="Sharing is caring"
            description="Connect with like-mminded individuals, form teams, and tackle challenges together"
          />
          <InfoCard title="Track your progress and climb the ranks on our leaderboard" />
          <InfoCard title="Detailed solutions for problems" />
        </div>
        <button className="border border-primary rounded-md bg-primary py-2 px-4 font-bold text-xs text-myWhite  hover:text-primary hover:bg-myWhite">
          Join coders community
        </button>
      </section>

      {/* section: For Managers */}
      <section className="my-[80px] mx-auto px-5 font-semibold">
        <h3 id="managers-section" className="text-2xl text-primary font-bold">
          For managers
        </h3>
        <p className="text-6xl font-bold py-3">
          Access <span className="text-primary">high-professional</span>{" "}
          platform for coding challenges design
        </p>
        {/* card container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-1 md:my-6">
          {/* card */}
          <InfoCard
            title="Craft tailored coding challenges suited to your specific needs and
              objectives"
          />
          <InfoCard
            title="Design challenges that align perfectly with your recruitment
              criteria"
          />
          <InfoCard
            title="Choose from a wide range of problem types including algorithmic,
              data structures, puzzles, and more"
          />
          <InfoCard title="Ergonomic tools for challenges design" />
          <InfoCard
            title="Collaborate with colleagues or peers in creating and refining
              coding challenges"
          />
          <InfoCard title="Access dedicated support from our team of experts" />
        </div>
        <button className="border border-primary rounded-md bg-primary py-2 px-4 font-bold text-xs text-myWhite  hover:text-primary hover:bg-myWhite">
          Join managers community
        </button>
      </section>

      {/* section: Showcase */}
      <section>
        <img
          className="block mx-auto w-52 h-52 rounded-[40px] object-cover md:absolute md:w-1/4 md:h-auto md:max-h-[460px] md:rounded-r-[40px] md:rounded-l-none"
          src="./images/team.svg"
          alt="team"
        />
        <div className="flex flex-col items-center gap-5 px-8 md:w-[45%] md:h-[460px] md:mx-auto md:items-start">
          <img
            className="h-12 md:h-20"
            src="./images/logo.svg"
            alt="CodeCla-logo"
          />
          <h2 className="text-xl font-bold">Brought to you by CLA</h2>
          <p className="font-semibold">
            Join the Ultimate Hub for Competetive Programmers and reach growth
            and excellence in competetive programming.
            <br />
            Coding challenges is made simple by our platform. Access a dashboard
            of tools for high-quality challenge design
          </p>
        </div>
      </section>

      <Testimonials />

      <FooterContact />
    </div>
  );
}

export default Home;
