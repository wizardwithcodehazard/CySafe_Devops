import {
  TrendingUp,
  Briefcase,
  Package,
} from 'lucide-react';

export const USER_SEED = {
  name: "Sahil Rane",
  handle: "@cyber_sahil",
  xp: 3450,
  level: 4,
  streak: 12,
  rank: "Cyber Detective",
  badges: ['Guardian', 'Sharp Eye', 'First Report'],
  joined: "Aug 2025"
};

export const SCAM_SCRIPTS = {
  'stock_scam': {
    title: "Stock Market Tips",
    description: "An 'admin' offers guaranteed high returns on stock market investments.",
    icon: TrendingUp,
    script: [
      {
        id: 1,
        sender: "Rahul (Stock Tip Admin)",
        avatar: "bg-indigo-600",
        role: "Scammer",
        messages: [
          { type: 'text', content: "Hello! You have been selected for our Elite Trading Group. 🎯", delay: 800 },
          { type: 'text', content: "Our members made ₹50,000 profit today alone. Want to see proof?", delay: 2000 }
        ],
        options: [
          { text: "Show me the proof.", next: 2, risk: 0 },
          { text: "How did you get my number?", next: 99, risk: 0 }
        ]
      },
      {
        id: 2,
        sender: "Rahul (Stock Tip Admin)",
        avatar: "bg-indigo-600",
        role: "Scammer",
        messages: [
          { type: 'image', content: 'profit_screenshot_fake.jpg', caption: "Client Profit: ₹1.2 Lakhs (2 hrs)", delay: 1000 },
          { type: 'text', content: "We use a special AI algorithm. Minimum investment is just ₹5,000. 🚀", delay: 3000 }
        ],
        options: [
          { text: "Okay, I'm interested. Sending ₹5k.", next: 100, risk: 100 },
          { text: "This looks edited. Are you SEBI registered?", next: 3, risk: 0 }
        ]
      },
      {
        id: 3,
        sender: "Rahul (Stock Tip Admin)",
        avatar: "bg-indigo-600",
        role: "Scammer",
        messages: [
          { type: 'text', content: "Registration takes time bro. Don't miss this chance! Offer ends in 5 mins. ⏳", delay: 1000 }
        ],
        options: [
          { text: "No registration = Scam. Reported.", next: 99, risk: 0 },
          { text: "Fine, send the QR code.", next: 100, risk: 100 }
        ]
      }
    ]
  },
  'job_offer': {
    title: "Fake Job Offer",
    description: "A too-good-to-be-true remote job offer that asks for a 'registration fee'.",
    icon: Briefcase,
    script: [
      {
        id: 1,
        sender: "HR @ Global Solutions",
        role: "Scammer",
        messages: [
          { type: 'text', content: "Dear Candidate, your profile on Naukri.com is shortlisted for a remote Data Entry role. Salary: ₹45,000/month.", delay: 1000 },
          { type: 'text', content: "It's a simple task-based job. No interview required. Are you interested?", delay: 1500 }
        ],
        options: [
          { text: "Yes, I'm very interested! What's next?", next: 2, risk: 0 },
          { text: "No interview? That sounds suspicious.", next: 99, risk: 0 }
        ]
      },
      {
        id: 2,
        sender: "HR @ Global Solutions",
        role: "Scammer",
        messages: [
          { type: 'text', content: "Great! To proceed, we need to register you on our employee portal. There is a one-time, fully refundable security deposit of ₹1,500.", delay: 1200 },
          { type: 'text', content: "This is to prevent spam applications. You will get it back with your first salary. Please pay on this UPI ID: global.sol@fakebank", delay: 2000 }
        ],
        options: [
          { text: "Okay, paying the deposit now.", next: 100, risk: 100 },
          { text: "Legitimate companies don't ask for money.", next: 99, risk: 0 }
        ]
      }
    ]
  },
  'delivery_scam': {
    title: "Package Delivery Fee",
    description: "An SMS claims your package is on hold due to a small, unpaid customs fee.",
    icon: Package,
    script: [
      {
        id: 1,
        sender: "BlueDart Express",
        role: "Scammer",
        messages: [
          { type: 'text', content: "Your package (ID: BD88172) is on hold at our Mumbai hub due to an unpaid customs fee of ₹10.", delay: 1000 },
          { type: 'text', content: "Please pay now to avoid return: bit.ly/blue-dart-pay", delay: 1500 }
        ],
        options: [
          { text: "Click the link to pay the small fee.", next: 100, risk: 100 },
          { text: "Check the official BlueDart website/app instead.", next: 99, risk: 0 }
        ]
      }
    ]
  }
};

export const MODULES = [
  {
    id: 101,
    title: "Spotting Deepfakes",
    desc: "Identify AI-generated CEO videos.",
    difficulty: "Hard",
    xp: 500,
    questions: [
      { q: "In a video, the speaker's lips don't match the audio perfectly. This is a sign of:", options: ["Poor Internet", "Deepfake AI", "Bad Mic"], correct: 1 },
      { q: "A famous CEO promises 'Double Money' on Instagram. You should:", options: ["Invest Fast", "Check Official Company Site", "Share with Friends"], correct: 1 }
    ]
  },
  {
    id: 102,
    title: "The 'Recovery' Trap",
    desc: "Why refund agents are fake.",
    difficulty: "Medium",
    xp: 300,
    questions: [
      { q: "You lost money to a scam. Someone emails saying they can recover it for a fee. They are:", options: ["A Lawyer", "A Recovery Scammer", "The Police"], correct: 1 }
    ]
  }
];
