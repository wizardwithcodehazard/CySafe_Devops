# 🛡️ CyberSafe: Next-Gen DevSecOps Dashboard
//testv0
//Jira Test
//Testing again
> **A secure, AI-powered CI/CD ecosystem.**  
> Seamlessly integrates React, Jenkins, Docker, and AI to deliver secure code, faster.

![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Groq](https://img.shields.io/badge/AI-Groq-orange?style=for-the-badge)

## 📖 Overview

**CyberSafe** redefines the DevSecOps experience. It's not just a dashboard; it's an intelligent pipeline that proactively secures your applications. By leveraging **Llama 3** via the **Groq API**, CyberSafe acts as an autonomous security researcher, analyzing container vulnerabilities caught by **Trivy** and providing actionable, expert-level remediation advice directly to your communication channels.

### 🌟 Key Features

*   **⚡ Automated CI/CD**: A robust Jenkins pipeline that handles everything from code commit to production-ready Docker images.
*   **🧠 AI-Driven Security**: **Groq AI** analyzes Trivy vulnerability reports to generate human-readable summaries and deep-dive technical audits.
*   **🛡️ Comprehensive Scanning**: Multi-layer security checks with **ESLint** (Static Analysis), **SonarQube** (Code Quality), and **Trivy** (Container Security).
*   **💬 Proactive ChatOps**: Real-time, intelligent alerts sent to **Discord** and detailed HTML reports via **Email**.
*   **📊 Modern React Dashboard**: A sleek, responsive interface built with Vite and TailwindCSS for monitoring deployment metrics.

---

## 🏗️ Architecture Information Flow

1.  **Code Push** ➔ Developer pushes code to GitHub.
2.  **Webhook Trigger** ➔ Jenkins pipeline initiates automatically (via ngrok).
3.  **Quality Gates** ➔ Unit Tests (Vitest) & Linting (ESLint) run first.
4.  **Static Analysis** ➔ SonarQube scans for bugs and code smells.
5.  **Build & Containerize** ➔ Production Docker image is built.
6.  **Vulnerability Scan** ➔ **Trivy** scans the image for CVEs (Common Vulnerabilities and Exposures).
7.  **AI Analysis** ➔ The JSON report is fed to **Groq AI**, which authors a security consulting report.
8.  **Notification** ➔ Insights are dispatched to Discord (Summary) and Email (Full Report).

---

## 🛠️ Tech Stack

**Frontend**
*   **Framework**: React 19 + Vite
*   **Styling**: TailwindCSS
*   **Icons**: Lucide React

**DevOps & Infrastructure**
*   **CI/CD**: Jenkins
*   **Containerization**: Docker
*   **Code Quality**: SonarQube, ESLint
*   **Security Scanning**: Trivy
*   **Testing**: Vitest, JSDOM

**AI & ChatOps**
*   **LLM Engine**: Groq API (Llama 3 70B)
*   **Notifications**: Discord Webhooks, SMTP

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v20+)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Running)
*   [Jenkins](https://www.jenkins.io/)
*   [SonarQube](https://www.sonarqube.org/)

### Environment Variables
Create a `.env` file in the root or configure these in your Jenkins credentials/environment:

```bash
# Required for AI Analysis
GROQ_API_KEY=your_groq_api_key_here

# Required for Discord Notifications
DISCORD_WEBHOOK=your_discord_webhook_url
```

### Local Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/wizardwithcodehazard/CySafe_Devops.git
    cd cyber-safe
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:5173` to view the dashboard.

---

## ⚙️ Jenkins Pipeline Configuration

To replicate the CI/CD flow:

1.  Create a new **Pipeline** job in Jenkins.
2.  Point it to this repository's Git URL.
3.  Ensure the **Jenkinsfile** path is set to `Jenkinsfile`.
4.  Adding Credentials in Jenkins:
    *   `groq-api-key`: Secret text for Groq API.
    *   `discord-webhook`: Secret text for Discord Webhook.
    *   `sonar-token`: Secret text for SonarQube authentication.

---

## 📸 Screenshots

*(Add screenshots of your dashboard, Jenkins pipeline stage view, and Discord alert here)*

![Dashboard Preview](https://via.placeholder.com/800x400?text=Dashboard+Preview)

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
