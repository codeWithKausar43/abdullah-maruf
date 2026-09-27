/**
 * =======================================================================
 * CENTRAL SITE CONFIGURATION — ABDULLAH AL MARUF
 * Contemporary Visual Portfolio & Art Direction (Inspired by KEXART)
 * =======================================================================
 * NO EMOJIS OR CORNY ICONS.
 * Max content width: 1400px.
 * Easily replace images, audio, texts, and labels below.
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
    profession: "Contemporary Visuals & Art Direction",
    location: "Jamalpur Sadar Upazila",
    origin: "Jamalpur, Bangladesh",
    birthDate: "August 3, 2009",
    birthYear: "2009",
    relationshipStatus: "Single",
    statement: "Exploring the boundaries of perception, light, and stillness through curated contemporary portraiture and environmental studies.",
    monograph: "Based in Jamalpur Sadar Upazila, Abdullah Al Maruf approaches visual storytelling through a refined lens of natural atmosphere, quiet contemplation, and architectural presence.",
  },

  media: {
    heroImage: "/images/maruf-4.jpg",
    profileImage: "/images/maruf-2.jpg",
    prankImage: "/images/maruf-1.jpg",
    audioPath: "/audio/prank.mp3",
    audioVolume: 1.0,
    archiveGallery: [
      {
        id: "01",
        url: "/images/maruf-1.jpg",
        title: "Highland Solitude",
        medium: "Natural Shade on Location",
        year: "2024",
        category: "Study 01",
      },
      {
        id: "02",
        url: "/images/maruf-2.jpg",
        title: "Grandstand Perspective",
        medium: "Architectural Viewpoint",
        year: "2025",
        category: "Study 02",
      },
      {
        id: "03",
        url: "/images/maruf-3.jpg",
        title: "Valley Horizon",
        medium: "Atmospheric Elevation",
        year: "2025",
        category: "Study 03",
      },
      {
        id: "04",
        url: "/images/maruf-4.jpg",
        title: "Formal Vesture",
        medium: "Monochrome Mirror Composition",
        year: "2025",
        category: "Study 04",
      },
    ],
  },

  navigation: [
    { label: "Home", href: "#home" },
    { label: "Works", href: "#works" },
    { label: "Profile", href: "#profile" },
    { label: "Archive", href: "#archive" },
    { label: "Dialogue", href: "#dialogue" },
    { label: "Monograph", href: "#monograph" },
  ],

  sections: {
    hero: {
      category: "CONTEMPORARY PORTFOLIO",
      headingLine1: "Abdullah Al",
      headingLine2: "Maruf",
      subtitle: "Exploring the tension between silence and sound, form and presence through visceral visual archives.",
      buttonPrimary: "EXPLORE ARCHIVE",
      buttonSecondary: "DO NOT OPEN",
      scrollText: "SCROLL TO DISCOVER",
    },

    profile: {
      category: "THE PROFILE",
      title: "Identity & Origin",
      subtitle: "A biographical monograph curated from personal archives.",
      biographyParagraphs: [
        "Born on August 3, 2009 in Jamalpur Sadar Upazila, Abdullah Al Maruf has developed a distinctive visual presence defined by poise, deliberate framing, and minimalist restraint.",
        "Operating on an independent individual trajectory (Single), his work embraces quiet confidence across natural highlands, open-air stadia, and formal monochrome portraiture.",
      ],
      curatedFacts: [
        {
          label: "Full Name",
          value: "Abdullah Al Maruf",
          note: "Designated Subject",
        },
        {
          label: "Geographic Origin",
          value: "Jamalpur Sadar Upazila",
          note: "Mymensingh, Bangladesh",
        },
        {
          label: "Date of Inception",
          value: "August 3, 2009",
          note: "Summer Alignment",
        },
        {
          label: "Relationship Status",
          value: "Single",
          note: "Independent Focus",
        },
      ],
    },

    works: {
      category: "CURATED COLLECTION",
      title: "Selected Works",
      subtitle: "A four-part retrospective capturing distinct spatial and personal moments.",
      buttonViewAll: "VIEW COLLECTION",
    },

    mystery: {
      category: "THE THRESHOLD",
      title: "Curatorial Warning",
      statement: "Certain archives are constructed to remain intact. Engaging the trigger below disengages all auditory dampeners.",
      manifesto: [
        "Registry verification confirmed for Jamalpur node.",
        "Acoustic frequency calibrated for maximum resonance.",
        "Visual feedback loop prepared for instant transition.",
      ],
      buttonTrigger: "PROCEED REGARDLESS",
    },

    interactive: {
      category: "EXPERIMENTAL FREQUENCY",
      title: "Harmonic Calibrator",
      subtitle: "Adjust the sensory slider to calibrate the frequency matrix.",
      frequencyPrompt: "DESIRED HARMONIC: 140.00 MHZ",
      buttonTrigger: "ENGAGE FREQUENCY",
    },

    finalReveal: {
      category: "FINAL CLIMAX",
      title: "The Point of Resonance",
      statement: "A single interaction dissolves the editorial gallery into full sensory immersion. Sound, illumination, and motion will immediately take over.",
      buttonTrigger: "INITIATE TRANSMISSION",
    },

    aftermath: {
      badge: "TRANSMISSION COMPLETE",
      title: "Session Concluded",
      description: "You have experienced the full-immersion party showcase of Abdullah Al Maruf.",
      buttonReplay: "REPLAY EXPERIENCE",
      buttonReturn: "RETURN TO PORTFOLIO",
    },
  },

  fx: {
    strobeSpeed: "hyper",
    enableLaserBeams: true,
    enableParticles: true,
  },
};
