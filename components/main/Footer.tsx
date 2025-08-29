import React from "react";
import Link from "next/link";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-full relative bg-transparent mt-20 text-gray-200 shadow-lg p-4 z-[21] border-t-2 pt-12">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex flex-row items-center justify-around flex-wrap">
          
          {/* Community Section */}
          <div className="min-w-[200px] flex flex-col items-center">
            <div className="font-bold text-lg">Community</div>
            <a
              href="https://github.com/Deepak1242"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center my-3 cursor-pointer hover:text-blue-400"
            >
              <RxGithubLogo size={20} />
              <span className="ml-2">GitHub</span>
            </a>
          </div>

          {/* Social Media Section */}
          <div className="min-w-[200px] flex flex-col items-center">
            <div className="font-bold text-lg">Social Media</div>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center my-3 cursor-pointer hover:text-red-400"
            >
              <FaYoutube size={20} />
              <span className="ml-2">YouTube</span>
            </a>

            <a
              href="https://www.instagram.com/bfordeepak/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center my-3 cursor-pointer hover:text-pink-400"
            >
              <RxInstagramLogo size={20} />
              <span className="ml-2">Instagram</span>
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center my-3 cursor-pointer hover:text-blue-400"
            >
              <RxTwitterLogo size={20} />
              <span className="ml-2">Twitter</span>
            </a>

            <a
              href="https://www.linkedin.com/in/deepak-dutt-269542293/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center my-3 cursor-pointer hover:text-blue-600"
            >
              <RxLinkedinLogo size={20} />
              <span className="ml-2">LinkedIn</span>
            </a>
          </div>

          {/* About Section */}
          <div className="min-w-[200px] flex flex-col items-center">
            <div className="font-bold text-lg">About</div>

            {/* Use Next.js <Link> for internal navigation */}
            
            <p className="my-3">
              bhagatdeepak1242@gmail.com
            </p>
          </div>
        </div>

        <div className="mt-6 text-sm text-center">
          Made with ❤️ by Deepak
        </div>
      </div>
    </div>
  );
};

export default Footer;
