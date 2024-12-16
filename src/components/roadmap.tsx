import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Roadmap() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const roadmaps = [
    {
      phase: "Phase 1: Community Creation and Engagement",
      description: [
        "The initial phase focuses on establishing the foundation of Techs Network, creating diverse and specialized communities where IT professionals can connect and share knowledge.",
        {
          title: "Platform Launch and Community Formation:",
          points: [
            "Launch various sub-communities based on different tech domains, tools, and technologies to cater to a broad spectrum of interests.",
            "Foster user interaction through discussions, Q&A forums, and peer-to-peer learning initiatives.",
          ],
        },
        {
          title: "User Engagement Strategies:",
          points: [
            "Implement incentives such as community badges and recognition for early adopters.",
            "Utilize AI-powered content recommendation engines to promote relevant discussions and resources tailored to user interests.",
          ],
        },
        {
          title: "Initial AI Integration:",
          points: [
            "Deploy AI algorithms to facilitate personalized content delivery and community-building activities.",
          ],
        },
      ],
    },
    {
      phase: "Phase 2: User Rewards System Implementation",
      description: [
        "This phase introduces the blockchain-based rewards system, creating tangible incentives for user contributions.",
        {
          title: "Techie Coin (TECHIE) Introduction:",
          points: [
            "Integrate the TECHIE token, enabling users to earn rewards for valuable contributions such as writing tutorials, answering questions, and creating helpful content.",
          ],
        },
        {
          title: "Blockchain Infrastructure:",
          points: [
            "Launch smart contracts on the Binance Smart Chain (BEP-20) to ensure transparent, secure, and automated distribution of TECHIE rewards.",
          ],
        },
        {
          title: "Reward Management Tools:",
          points: [
            "Develop dashboards for users to track their earned TECHIE, recent transactions, and achievements.",
          ],
        },
      ],
    },
    {
      phase: "Phase 3: Profile Enhancements",
      description: [
        "This phase focuses on enhancing user profiles to provide deeper insights into their expertise and engagement on the platform.",
        {
          title: "Profile Scorecard System:",
          points: [
            "Implement an AI-powered scorecard that dynamically updates based on user contributions, participation, and peer recognition.",
          ],
        },
        {
          title: "Badges and Milestones:",
          points: [
            "Introduce a gamified badge system that reflects achievements and expertise in various domains, boosting user motivation and visibility.",
          ],
        },
        {
          title: "Customizable Profiles:",
          points: [
            "Allow users to personalize their profiles with portfolio highlights, skills, and certifications.",
          ],
        },
      ],
    },
    {
      phase: "Phase 4: Launch of Techs Network Labs",
      description: [
        "Techs Network Labs is a specialized space for professionals to access and share advanced technical content.",
        {
          title: "Educational Resource Hub:",
          points: [
            "Provide users with access to exclusive presentations, offline tutorials, and industry research documents.",
          ],
        },
        {
          title: "AI Content Verification:",
          points: [
            "Use AI to assess the quality and relevance of submitted content, ensuring the Labs maintain high standards of information.",
          ],
        },
        {
          title: "Advanced User Tools:",
          points: [
            "Enable features such as collaborative editing, shared projects, and presentation tools for group work.",
          ],
        },
      ],
    },
    {
      phase: "Phase 5: Jobs and Events Integration",
      description: [
        "This phase introduces a dedicated portal for job postings and industry events to foster career growth and networking.",
        {
          title: "Job Board Launch:",
          points: [
            "Allow companies to post job openings and internship opportunities, with a feature for users to apply directly using their platform profiles.",
          ],
        },
        {
          title: "Event Management:",
          points: [
            "Integrate a system for users to discover, register for, and attend tech events, webinars, and conferences.",
          ],
        },
        {
          title: "AI-Powered Matching:",
          points: [
            "Use AI algorithms to match users with job and event opportunities based on their skills, experience, and interests.",
          ],
        },
      ],
    },
    {
      phase: "Phase 6: Portfolio Management Tools",
      description: [
        "This phase focuses on providing users with tools to effectively manage and showcase their professional portfolios.",
        {
          title: "Comprehensive Portfolio Builder:",
          points: [
            "Equip users with customizable templates to create detailed portfolios showcasing their projects, code snippets, and technical achievements.",
          ],
        },
        {
          title: "Review and Feedback Mechanisms:",
          points: [
            "Allow peers and mentors to provide feedback on user portfolios, fostering an environment of continuous improvement.",
          ],
        },
        {
          title: "Portfolio Performance Analytics:",
          points: [
            "Implement tools for users to monitor the visibility and impact of their portfolios through detailed analytics.",
          ],
        },
      ],
    },
    {
      phase: "Phase 7: Leasing and Licensing Aggregator Launch",
      description: [
        "The final phase introduces a unique feature to facilitate the leasing and licensing of digital assets and intellectual property.",
        {
          title: "Aggregator Platform:",
          points: [
            "Create an aggregator where developers can list their software, code libraries, and tech assets available for leasing or licensing.",
          ],
        },
        {
          title: "Transaction Management:",
          points: [
            "Use blockchain technology to handle transactions securely and transparently, minimizing risks and ensuring both parties uphold their agreements.",
          ],
        },
        {
          title: "AI-Driven Fraud Detection:",
          points: [
            "Employ AI to monitor transactions for any potential fraud or anomalies, enhancing the security and trustworthiness of the system.",
          ],
        },
      ],
    },
  ];

  return (
    <section className="bg-white flex md:pl-32 md:pr-32 flex-col min-h-[100dvh] items-center lg:min-h-[100dvh] justify-center px-4 md:px-10 ">
      <h1 className="text-blue-600 text-[36px] font-extrabold text-2xl mb-5">
        Roadmap
      </h1>

      <div className="w-full flex flex-col gap-3">
        {roadmaps.map((roadmap, index) => (
          <div
            key={index}
            className="bg-white w-full flex flex-col rounded-[18px] shadow-md"
          >
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

            {activeIndex === index && (
              <div className="p-4 text-gray-700 text-sm">
                {roadmap.description.map((item, idx) => {
                  if (typeof item === "string") {
                    return (
                      <p key={idx} className="mb-2">
                        {item}
                      </p>
                    );
                  } else {
                    return (
                      <div key={idx} className="mb-3">
                        <p className="font-semibold mb-1">{item.title}</p>
                        <ul className="list-disc pl-5">
                          {item.points.map((point, pointIdx) => (
                            <li key={pointIdx} className="mb-1">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
