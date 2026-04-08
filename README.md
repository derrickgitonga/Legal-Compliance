# Funga-Deal Legal Framework & Project Details

This simple, standalone web frontend demonstrates the statutory architecture and regulatory frameworks that power **Funga-Deal's** digital escrow platform locally in Kenya. The interface is built purely with standard HTML, CSS, and JavaScript.

## 🚀 How to Run the Frontend Locally

Because this legal framework frontend relies on vanilla web technologies, you don't need complex build tools like Node.js or npm.

### Prerequisites
- [Python 3](https://www.python.org/downloads/) must be installed on your machine.

### Execution Steps
1. Open your terminal or command prompt.
2. Navigate to the folder containing this project:
   ```bash
   cd c:\Users\Administrator\Desktop\law
   ```
3. Start the local Python HTTP server on port 8000 by running:
   ```bash
   python -m http.server 8000
   ```
4. Open your preferred web browser and navigate exactly to:
   **[http://localhost:8000](http://localhost:8000)**

---

## 🏛 Legal Pillars Covered in the UI
- **Law of Contract Act (Chapter 23):** Contract enforcement.
- **Kenya Information & Communications Act (Act No. 2):** E-signatures.
- **Consumer Protection Act (Act No. 46):** Buyer protection shield.
- **Data Protection Act (Act No. 24):** PII encryption and handling.

---

## 💻 About the Funga-Deal Core Project

While this site explains the *legal* reality, the actual **Funga-Deal platform** is a complex monorepo built to orchestrate secure digital escrow agreements and bridge the trust gap in online marketplaces.

### Core Architecture Details
The main Funga-Deal application utilizes a modern tech stack to ensure speed, security, and scalability:
- **Frontend Framework:** Next.js 15 (App Router) with TypeScript.
- **Styling:** Tailwind CSS & Lucide React for iconography.
- **Authentication:** Clerk middleware for protected, strictly authenticated routes.
- **Backend Services:** Node.js and Express to handle core transaction logic and external APIs.
- **Database:** Serverless PostgreSQL via [Neon](https://neon.tech).
- **ORM:** Drizzle ORM for type-safe, optimized database operations.

---

## 📜 Licensing & Operations

Understanding "the license" behind Funga-Deal involves two primary areas:

### 1. Platform Operations & Regulatory Licenses
To operate a legally compliant escrow within Kenya:
- **Financial Licensing:** Funga-Deal (or its banking partners) operates under Central Bank of Kenya (CBK) regulations as Payment Service Providers (PSP) to safely hold user deposits.
- **End-User License Agreement (EULA):** Users on the platform are granted a revocable right to use the software. Breaches of Kenyan commercial trade laws can result in account freezing.
- **Digital Asset IP Transfers:** When escrow involves digital goods, the transfer of the commercial license or Intellectual Property to the buyer is legally triggered only upon the irrevocable release of the escrowed funds to the seller.

### 2. Software Open-Source License
The core codebase of Funga-Deal is provided to the community for collaboration and transparency.
- **License Type:** MIT License (or similar open-source license standard).
- **Permissions:** You are free to clone, modify, distribute, and use the software for private or commercial purposes provided that the original copyright notice is included.
- **Disclaimer:** The software is provided "as is", without warranty of any kind. The creators are not liable for any claims or damages arising from improper deployment or compliance failures if you host the code yourself.
