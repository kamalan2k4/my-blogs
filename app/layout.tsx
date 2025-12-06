"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/globals.css";
import Script from "next/script"; // ✅ added

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to track dark mode and modal visibility
  const [isDarkMode, setIsDarkMode] = useState(true); // Default is dark mode
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState("");

  // Array of cocky and funny phrases
  const phrases = [
    "Oh, you really thought light mode was a thing here? That’s adorable 😆. But let’s stick to the dark side—it’s where the real devs hang out! 🌑💻",
    "Did someone say ‘light mode’? 😱 Sorry, we don’t do that here. Only darkness and brilliance—deal with it. 😎🌚",
    "Trying to switch to light mode, huh? 🎨 Sorry, this is a high-class coding zone, not a PowerPoint presentation! 💡🚫",
    "Light mode? Aww, sweet. 😌 But we’re serious developers here, so grab a coffee, embrace the shadows, and let’s get to work! ☕️🌙",
    "Did you really just ask for light mode? 🧐 Bless your heart! Around here, we code with edge, not a flash of brightness. 🌚🔥",
    "Light mode? Really? That’s cute. 😂 But in here, we’re all about the midnight vibes. If you can’t handle it, grab a flashlight! 🔦😎",
    "Oh, so you wanted light mode? 😂 Sorry, but we save the retina-burning for the beginners. Welcome to the shadows! 🌑✨",
    "Switching to light mode, huh? 🤔 Adorable attempt. We like to keep things dark and classy around here. 😎🌌",
    "Light mode? Oh, honey, this is a developer's den, not a Word doc. 🌚 Get cozy with the dark side; we don’t do ‘bright’ here. 😏💼",
    "Trying to escape the darkness? Cute! 😜 But real coders aren’t afraid of a little mystery, so settle into the night. 🌒💻",
    "Aww, someone wants light mode? 🥺 Sorry, this is the big leagues—we code in the shadows like legends. 👤🌌",
    "Just tried to switch to light mode? 😂 Nice try, rookie! Around here, only the bold stick to the dark side. 🌑🕶️",
    "Bright mode? Ouch, that’s amateur hour, my friend. 🌞 Stick with the pros—dark mode is where the magic happens. 🔮😎",
    "Oh, switching to light mode? How brave! 😏 Just know, the real devs stay in the shadows, my friend. 👥🌘",
    "Light mode request? That’s sweet, but we’re here to code, not go blind. 😆 Join the dark side—it’s where the real fun is! 🌑🎉",
    "Attempting light mode, huh? 🤭 That’s rookie energy. Only the committed ride in the shadows with style! 🌚✨",
    "Oh, you thought light mode was an option here? 😂 Sorry to burst your bubble, but we’re all about the sleek, dark aesthetic. 🖤🌑",
    "Trying to switch to light mode? Bold move, my friend! 🕶️ But this isn’t for the faint-hearted—we keep it mysterious. 🌒💪",
    "Switching to light mode? Cute attempt! 🤭 But darkness is where the pros thrive, so buckle up and enjoy. 🖤😆",
    "Looking for light mode? Good luck! 😜 Around here, we code in style, and dark mode is our only option. 🌚🕶️",
    "Light mode? Seriously? 😆 Sorry, but only the shadows get the real coding done. Welcome to the dark side! 🌌👥",
    "Oh, so you wanted to go bright mode? Adorable, really! 😂 But this is a pro’s territory, and we stick to the shadows. 🖤🌚",
    "Switching to light mode? Brave choice, rookie! 🌞 But the dark side has cookies and code, so maybe stay a while. 🍪🌌",
    "Dude, you’re kidding, right? We’re developers, seriously. Light mode? Nah, we live in the shadows where the real coding magic happens! 😎🌑",
    "Light mode request? 🙄 Sure, and let’s throw in some Comic Sans while we’re at it. Dark mode is the real deal here. 😆🖤",
    "Did you just try to switch to light mode? 😂 That’s cute. But we’re serious here, and darkness is the only way! 🖤🌌",
    "Oh, trying to go light mode? Well, look at you! 😏 But real coders know: the dark is where the magic happens. 🌑✨",
    "Light mode, really? Aww, bless your heart! 😂 But we code in style here—only dark mode for the pros. 🌌😎",
    "Switching to bright mode? 😆 Good luck with that, rookie. Around here, we’re all about the night life. 🌙💻",
    "Oh, light mode? That’s sweet! But real devs stay in the shadows, friend. 🌚🔥",
    "Trying to brighten things up? 🧐 Sorry, but we code by the glow of our screens—dark mode only. 🌒✨",
    "Oh, you wanted light mode? 😌 Adorable. But darkness is where the legends code. 🖤💻",
    "Bright mode? Bless your heart, rookie. 😆 We stay in the shadows for a reason. 🌒🔥",
    "Oh, light mode? How brave! But around here, we embrace the darkness like true coders. 🌙😎",
    "Did you try light mode? Adorable. 😂 But we’re here to code, not go blind. 🌑✨",
    "Oh, bright mode? That’s sweet! But dark mode is for the pros. Stick with the legends! 😎🌌",
  ];

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      // If trying to switch to light mode, show the modal with a random phrase
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setSelectedPhrase(randomPhrase);
      setIsModalOpen(true);
    }
  };

  // Apply dark mode class on page load or when toggled
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark"); // Add 'dark' class to html
    } else {
      document.documentElement.classList.remove("dark"); // Remove 'dark' class
    }
  }, [isDarkMode]);

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const header = (
    <header>
      <div className="text-center bg-[#1b1a1e] p-8 my-6 rounded-md w-full">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-4 sm:p-3 bg-gray-800 text-white rounded-full text-3xl sm:text-4xl flex items-center justify-center"
        >
          {isDarkMode ? "🌙" : "🌞"}
        </button>

        <Image
          src="/profile.jpg"
          width={160}
          height={160}
          className="mx-auto rounded-full"
          alt={"logo"}
        />
        <Link href="/">
          <h1 className="text-2xl text-[#adff2f] font-bold mt-4">kamal&apos;s Blog</h1>
        </Link>
        <p className="text-[#adff2f]">🤟 Welcome to my tech blog. 💻</p>

        <div className="mt-4 max-w-lg mx-auto p-4 text-[#deb887] text-center sm:text-left">
          <h2 className="text-lg font-semibold text-[#deb887] mb-2">About Me</h2>
          <p className="leading-relaxed">
            Hey there, I’m Kamal! 🤘 A tech enthusiast with a knack for sharing my mostly silly (and occasionally
            brilliant 🤯) discoveries in the coding world. This blog is my playground, where I spill the beans on what
            I’m learning—whether it’s the basics, the latest tech, or random tidbits that might make you go, “Wait,
            that’s a thing?” 😅
          </p>
          <p className="leading-relaxed mt-3">
            Here, you’ll find a mix of flexing, cheeky jokes, and even the occasional “mokka” humor to keep things
            real. Coding is fun, and I write these posts with that same energy! So if you’re having a rough day, stop
            by—you’ll either walk away grinning or at least wondering, “What was that?!” 😜
          </p>
          <p className="leading-relaxed mt-3">
            Stick around, laugh a little, learn a lot, and remember: coding is fun, and so is reading about it here! 🎉
          </p>
        </div>
      </div>
    </header>
  );

  const footer = (
    <footer>
      <div className="border-t border-slate-400 mt-12 py-6 text-center text-slate-400">
        <h3>Designed by kamal</h3>
      </div>
    </footer>
  );

  return (
    <html>
      <head>
        <title>kamal&apos;s Blog</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/profile.jpg" />

        {/* ✅ Plausible Analytics */}
        <Script async src="https://plausible.io/js/pa-Vb2Is6ehl8_kGyF11joqo.js" />
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function() {
              (plausible.q = plausible.q || []).push(arguments)
            };
            plausible.init = plausible.init || function(i) {
              plausible.o = i || {};
            };
            plausible.init();
          `}
        </Script>
      </head>
      <body>
        <div className="mx-auto max-w-2xl px-6">
          {header}

          {/* Modal for the funny dialog */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-black text-white p-6 rounded-lg shadow-lg w-80">
                <Image
                  src="/roasted.jpg"
                  width={160}
                  height={160}
                  className="mx-auto rounded-full"
                  alt={"logo"}
                />

                <p className="text-lg text-center">{selectedPhrase}</p>
                <button
                  onClick={closeModal}
                  className="mt-4 w-full bg-post text-white p-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {children}

          {footer}
        </div>
      </body>
    </html>
  );
}
