// data.jsx
// Cybersecurity threats data for ThreatsGuide
import { ShieldAlert, Bug, Lock, ServerCrash, UserCheck, Database } from "lucide-react";

export const threatsData = [
  {
    id: 1,
    title: "Phishing Attacks",
    description: "Phishing attacks use deceptive emails or websites to trick users into revealing sensitive information such as passwords or credit card numbers.",
    instructions: [
      "Always verify the sender's email address.",
      "Do not click on suspicious links or download attachments from unknown sources.",
      "Use email filtering and anti-phishing tools."
    ],
    icon: ShieldAlert
  },
  {
    id: 2,
    title: "Malware",
    description: "Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems.",
    instructions: [
      "Install and update antivirus software regularly.",
      "Avoid downloading software from untrusted sources.",
      "Keep your operating system and applications updated."
    ],
    icon: Bug
  },
  {
    id: 3,
    title: "Ransomware",
    description: "Ransomware encrypts a victim's files and demands payment for the decryption key.",
    instructions: [
      "Regularly back up important data.",
      "Do not pay the ransom; instead, contact authorities.",
      "Educate users about suspicious emails and attachments."
    ],
    icon: Lock
  },
  {
    id: 4,
    title: "DDoS Attacks",
    description: "Distributed Denial of Service (DDoS) attacks overwhelm a system with traffic, making it unavailable to users.",
    instructions: [
      "Use DDoS protection services.",
      "Monitor network traffic for unusual spikes.",
      "Have an incident response plan in place."
    ],
    icon: ServerCrash
  },
  {
    id: 5,
    title: "Man-in-the-Middle (MITM) Attacks",
    description: "MITM attacks intercept and alter communication between two parties without their knowledge.",
    instructions: [
      "Use encrypted connections (HTTPS, VPN).",
      "Avoid using public Wi-Fi for sensitive transactions.",
      "Enable two-factor authentication."
    ],
    icon: UserCheck
  },
  {
    id: 6,
    title: "SQL Injection",
    description: "SQL injection exploits vulnerabilities in applications to execute malicious SQL statements.",
    instructions: [
      "Use parameterized queries and prepared statements.",
      "Validate and sanitize all user inputs.",
      "Regularly test and update your code for vulnerabilities."
    ],
    icon: Database
  }
];
