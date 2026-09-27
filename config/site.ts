/**
 * =======================================================================
 * CENTRAL SITE CONFIGURATION — ABDULLAH AL MARUF
 * Personal Portfolio & Visual Archive
 * =======================================================================
 */

export interface ArchiveImage {
  id: string;
  url: string;
  title: string;
  medium: string;
  year: string;
  category: string;
}

export interface SiteConfig {
  personal: {
    name: string;
    profession: string;
    location: string;
    origin: string;
    birthDate: string;
    birthYear: string;
    relationshipStatus: string;
    statement: string;
    monograph: string;
  };
  media: {
    heroImage: string;
    profileImage: string;
    prankImage: string;
    grandstandImage?: string;
    videoPath?: string;
    audioPath: string;
    audioVolume: number;
    archiveGallery: ArchiveImage[];
  };
  navigation: {
    label: string;
    href: string;
  }[];
  sections: {
    hero: {
      category: string;
      headingLine1: string;
      headingLine2: string;
      subtitle: string;
      buttonPrimary: string;
      buttonSecondary: string;
      scrollText: string;
    };
    profile: {
      category: string;
      title: string;
      subtitle: string;
      biographyParagraphs: string[];
      curatedFacts: { label: string; value: string; note: string }[];
    };
    works: {
      category: string;
      title: string;
      subtitle: string;
      buttonViewAll: string;
    };
    mystery: {
      category: string;
      title: string;
      statement: string;
      manifesto: string[];
      buttonTrigger: string;
    };
    interactive: {
      category: string;
      title: string;
      subtitle: string;
      frequencyPrompt: string;
      buttonTrigger: string;
    };
    finalReveal: {
      category: string;
      title: string;
      statement: string;
      buttonTrigger: string;
    };
    aftermath: {
      badge: string;
      title: string;
      description: string;
      buttonReplay: string;
      buttonReturn: string;
    };
  };
  fx: {
    strobeSpeed: "hyper" | "normal";
    enableLaserBeams: boolean;
    enableParticles: boolean;
  };
}

export const siteConfig: SiteConfig = {
  personal: {
    name: "Abdullah Al Maruf",
    profession: "Student & Photography Enthusiast",
    location: "Jamalpur Sadar, Bangladesh",
    origin: "Jamalpur, Bangladesh",
    birthDate: "August 3, 2009",
    birthYear: "2009",
    relationshipStatus: "Single",
    statement: "A personal collection of photos and moments from trips, everyday life, and viewpoints around Jamalpur and beyond.",
    monograph: "Born in 2009 in Jamalpur Sadar, Bangladesh, Abdullah Al Maruf shares his favorite photography, quiet viewpoints, and memories captured with friends and family.",
  },

  media: {
    heroImage: "/images/maruf-4.jpg",
    profileImage: "/images/maruf-2.jpg",
    prankImage: "/images/maruf-3.jpg", // Valley Horizon
    grandstandImage: "/images/maruf-2.jpg", // Grandstand View
    videoPath: "/video/cute-baby.mp4",
    audioPath: "/audio/prank.mp3",
    audioVolume: 1.0,
    archiveGallery: [
      {
        id: "01",
        url: "/images/maruf-1.jpg",
        title: "Highland View",
        medium: "Hilltop / Outdoors",
        year: "2024",
        category: "Outdoors",
      },
      {
        id: "02",
        url: "/images/maruf-2.jpg",
        title: "Grandstand View",
        medium: "Stadium Stands",
        year: "2025",
        category: "Travel",
      },
      {
        id: "03",
        url: "/images/maruf-3.jpg",
        title: "Valley Horizon",
        medium: "Scenic Viewpoint",
        year: "2025",
        category: "Featured",
      },
      {
        id: "04",
        url: "/images/maruf-4.jpg",
        title: "Formal Portrait",
        medium: "Suit & Tie",
        year: "2025",
        category: "Portrait",
      },
    ],
  },

  navigation: [
    { label: "Home", href: "#home" },
    { label: "Gallery", href: "#works" },
    { label: "About", href: "#profile" },
    { label: "Audio", href: "#dialogue" },
    { label: "Showcase", href: "#monograph" },
  ],

  sections: {
    hero: {
      category: "PERSONAL PORTFOLIO",
      headingLine1: "Abdullah Al",
      headingLine2: "Maruf",
      subtitle: "Moments, viewpoints, and personal photography from Jamalpur, Bangladesh.",
      buttonPrimary: "EXPLORE GALLERY",
      buttonSecondary: "DO NOT OPEN",
      scrollText: "SCROLL TO EXPLORE",
    },

    profile: {
      category: "ABOUT ME",
      title: "Abdullah Al Maruf",
      subtitle: "A quick introduction to who I am and what I enjoy.",
      biographyParagraphs: [
        "I was born on August 3, 2009, in Jamalpur Sadar, Bangladesh. Most of my days are spent studying, hanging out outdoors, and capturing photos whenever I travel.",
        "From hilltop viewpoints and stadiums to candid snapshots with friends, I love keeping a visual record of life and places I visit.",
      ],
      curatedFacts: [
        {
          label: "Full Name",
          value: "Abdullah Al Maruf",
          note: "Photographer & Student",
        },
        {
          label: "Hometown",
          value: "Jamalpur Sadar",
          note: "Mymensingh, Bangladesh",
        },
        {
          label: "Body Count",
          value: "10",
          note: "Confirmed",
        },
        {
          label: "Status",
          value: "Single",
          note: "Living life & learning",
        },
      ],
    },

    works: {
      category: "PHOTO GALLERY",
      title: "Captured Moments",
      subtitle: "Four of my favorite photos taken in different settings and locations.",
      buttonViewAll: "EXPLORE FULL ARCHIVE",
    },

    mystery: {
      category: "FEATURED SPOTLIGHT",
      title: "The Valley Horizon",
      statement: "One of my absolute favorite shots — standing at the railing overlooking the green hills under the open sky. Turn up your sound before opening.",
      manifesto: [
        "Captured on location overlooking the rolling hills.",
        "High-energy sound effects and visual rhythms ready.",
        "Click below to experience the photo full-screen.",
      ],
      buttonTrigger: "OPEN VALLEY HORIZON",
    },

    interactive: {
      category: "SOUND & VISUALS",
      title: "Audio Frequency",
      subtitle: "Slide through the frequencies toward 140 MHz to balance the sound levels before launching.",
      frequencyPrompt: "DESIRED FREQUENCY: 140.00 MHZ",
      buttonTrigger: "START THE EXPERIENCE",
    },

    finalReveal: {
      category: "THE SHOWCASE",
      title: "Ready for the Real Vibe?",
      statement: "Hit the button to launch the full-screen visual and music showcase. Turn up your volume for the best experience!",
      buttonTrigger: "LAUNCH FULLSCREEN NOW",
    },

    aftermath: {
      badge: "SHOWCASE CONCLUDED",
      title: "Hope You Enjoyed It!",
      description: "You just experienced the full-screen music and lighting showcase of Abdullah Al Maruf's Valley Horizon.",
      buttonReplay: "PLAY AGAIN",
      buttonReturn: "BACK TO PORTFOLIO",
    },
  },

  fx: {
    strobeSpeed: "hyper",
    enableLaserBeams: true,
    enableParticles: true,
  },
};
