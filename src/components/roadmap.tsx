import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Roadmap() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Allow number or null

  const roadmaps = [
    {
      phase: "Phase 1: Community Creation and Engagement",
      description:
        "Community Creation and Engagement The initial phase focuses on establishing the foundation of Techs Network, creating diverse and specialized communities where IT professionals can connect and share knowledge. Platform Launch and Community Formation: Launch various sub-communities based on different tech domains, tools, and technologies to cater to a broad spectrum of interests. Foster user interaction through discussions, Q&A forums, and peer-to-peer learning initiatives. User Engagement Strategies: Implement incentives such as community badges and recognition for early adopters. Utilize AI-powered content recommendation engines to promote relevant discussions and resources tailored to user interests. Initial AI Integration: Deploy AI algorithms to facilitate personalized content delivery and community-building activities.",
    },
    {
      phase: "Phase 2: User Rewards System Implementation",
      description:
        "User Rewards System Implementation This phase introduces the blockchain-based rewards system, creating tangible incentives for user contributions. Techie Coin (TECHIE) Introduction: Integrate the TECHIE token, enabling users to earn rewards for valuable contributions such as writing tutorials, answering questions, and creating helpful content. Blockchain Infrastructure: Launch smart contracts on the Binance Smart Chain (BEP-20) to ensure transparent, secure, and automated distribution of TECHIE rewards. Reward Management Tools: Develop dashboards for users to track their earned TECHIE, recent transactions, and achievements.",
    },
    {
      phase: "Phase 3: Profile Enhancements",
      description:
        "This phase focuses on enhancing user profiles to provide deeper insights into their expertise and engagement on the platform.Profile Scorecard System: Implement an AI-powered scorecard that dynamically updates based on user contributions, participation, and peer recognition. Badges and Milestones: Introduce a gamified badge system that reflects achievements and expertise in various domains, boosting user motivation and visibility. Customizable Profiles: Allow users to personalize their profiles with portfolio highlights, skills, and certifications.",
    },
    {
      phase: "Phase 4:Launch of Techs Network Labs",
      description:
        "Techs Network Labs is a specialized space for professionals to access and share advanced technical content.Educational Resource Hub:Provide users with access to exclusive presentations, offline tutorials, and industry research documents.AI Content Verification: Use AI to assess the quality and relevance of submitted content, ensuring the Labs maintain high standards of information. Advanced User Tools:Enable features such as collaborative editing, shared projects, and presentation tools for group work.",
    },
    {
      phase: "Phase 5:Jobs and Events Integration",
      description:
        "This phase introduces a dedicated portal for job postings and industry events to foster career growth and networking. Job Board Launch: Allow companies to post job openings and internship opportunities, with a feature for users to apply directly using their platform profiles. Event Management: Integrate a system for users to discover, register for, and attend tech events, webinars, and conferences. AI-Powered Matching: Use AI algorithms to match users with job and event opportunities based on their skills, experience, and interests.",
    },
  ];

  return (
    <section className="bg-white flex md:pl-32 md:pr-32 flex-col items-center min-h-[600px] justify-center px-4 md:px-10 ">
      <h1 className="text-blue-600 text-[36px] font-extrabold text-2xl mb-5">Roadmap</h1>

      <div className="w-full flex flex-col gap-3">
        {roadmaps.map((roadmap, index) => (
          <div
            key={index}
            className="bg-white w-full flex flex-col rounded-[18px] shadow-md"
          >
            {/* Phase and Dropdown Icon */}
            <div
              className="flex items-center justify-between p-4 border-[1px] rounded-xl border-blue-600 cursor-pointer"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <p className="text-center font-bold text-blue-600 w-full text-[12px] md:text-lg ">
                {roadmap.phase}
              </p>
              <IoMdArrowDropdown
                className={`w-7 h-7 text-blue-700 transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Description */}
            {activeIndex === index && (
              <div className="p-4 text-gray-700 text-sm">
                {roadmap.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
