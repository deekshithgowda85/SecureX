// src/pages/data.js
import { AlertTriangle, Bug, Lock, Zap, Shield, Clock } from "lucide-react";

export const threatsData = [
  {
    id: 1,
    title: "Phishing Attacks",
    description:
      "Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity.",
    icon: AlertTriangle,
    link: "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams",
    instructions: [
      "Do not click on suspicious links or attachments.",
      "Verify email sender addresses carefully.",
      "Enable multi-factor authentication."
    ]
  },
  {
    id: 2,
    title: "Malware",
    description:
      "Software designed to damage, disrupt, or gain unauthorized access to systems.",
    icon: Bug,
    link: "https://www.malwarebytes.com/malware",
    instructions: [
      "Keep software and OS up-to-date.",
      "Install antivirus programs.",
      "Avoid downloading files from unknown sources."
    ]
  },
  {
    id: 3,
    title: "Ransomware",
    description:
      "A type of malware that locks your files and demands a ransom to restore access.",
    icon: Lock,
    link: "https://www.cisa.gov/stopransomware/ransomware-guide",
    instructions: [
      "Regularly back up important data.",
      "Do not pay ransom; contact authorities.",
      "Use security software to prevent infections."
    ]
  },
  {
    id: 4,
    title: "DDoS Attacks",
    description:
      "Distributed Denial of Service attacks overwhelm servers, making them unavailable to users.",
    icon: Zap,
    link: "https://www.cloudflare.com/learning/ddos/how-to-prevent-ddos-attacks/",
    instructions: [
      "Use firewalls and DDoS protection services.",
      "Monitor traffic for unusual spikes.",
      "Have a mitigation plan in place."
    ]
  },
  {
    id: 5,
    title: "Data Breaches",
    description:
      "Unauthorized access and theft of sensitive data from organizations or individuals.",
    icon: Shield,
    link: "https://www.fortinet.com/resources/cyberglossary/data-breach",
    instructions: [
      "Encrypt sensitive information.",
      "Use strong, unique passwords.",
      "Regularly audit and monitor data access."
    ]
  },
  {
    id: 6,
    title: "Insider Threats",
    description:
      "Threats originating from within an organization by employees or contractors.",
    icon: Clock,
    link: "https://www.cisa.gov/resources-tools/resources/insider-threat-mitigation-guide",
    instructions: [
      "Implement strict access controls.",
      "Monitor employee activity for suspicious behavior.",
      "Conduct regular security training."
    ]
  }
];
