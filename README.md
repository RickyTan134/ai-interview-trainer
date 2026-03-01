# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


🧠 AI Interview Trainer - Application Overview
The AI Interview Trainer is a modern, high-performance web application designed to help tech candidates master their interview skills through AI-driven simulation, real-time feedback, and career pathing.

🚀 Core Features
1. Smart Resume Parsing & Profile Setup
Multi-Format Upload: Supports PDF, DOCX, and TXT resume files.
AI Data Extraction: Automatically extracts experience, skills, education, and projects using Gemini AI to pre-fill the candidate profile.
Targeted Simulation: Allows users to specify a target role and company (e.g., "Senior Frontend Developer at Google") to customize the interview difficulty and context.
2. Guided Interview Workflow
Guidelines & Preparation: Clear instructions before the session starts to set expectations.
15-Second Reading Phase: A dedicated prep timer for each question to simulate a high-pressure interview environment.
Auto-Start Recording: The microphone activates automatically once the prep timer ends.
3. Progressive Interview Simulation
Intermediate Question Generation: AI generates 5 tailored questions ranging from Easy to Intermediate difficulty based on the specific job description and company.
3-Minute Time Limit: Encourages concise and impactful answers, with an automatic cutoff at 3 minutes.
Locked-In Responses: Answers are locked and non-editable after the timer stops to ensure performance is captured realistically.
4. Advanced Voice Interaction
Real-Time Speech-to-Text: Uses the browser's Native Speech Recognition for a seamless, hands-free experience.
Listening Animation: Dynamic pulse effects provide visual feedback during active recording.
5. AI-Powered Analysis & Career Pathing
Granular Question Feedback: Each answer receives a score (1-10), highlight of key strengths, and specific suggestions for improvement.
Overall Session Summary: A high-level average score and a punchy AI "Verdict" providing a summary of overall readiness.
Career Match Leaderboard: Suggests top 3 suitable career paths using a leaderboard-style UI with ranking and match scores.
🛠️ Technology Stack & Frameworks
Frontend (User Interface)
React (v19): The core framework for managing the single-page application (SPA) state and components.
Framer Motion: Powering all smooth transitions, card animations, and progress bar effects.
Lucide React: Premium iconography used throughout the profile and results screens.
Axios: Handling asynchronous communications with the backend API.
Vanilla CSS: Custom styling with a premium Glassmorphism aesthetic, utilizing HSL colors and sleek gradients.
Web Speech API: Utilizing the native browser SpeechRecognition interface for real-time voice-to-text.
Backend (Server Logic)
Node.js & Express: A fast, minimal server environment for handling AI prompts and file processing.
Google Gemini API (gemini-flash-latest): The core AI engine used for resume parsing, question generation, and performance evaluation.
Multer: Middleware for managing multi-part form data and file uploads.
PDF-Parse & Mammoth: Binary parsing libraries used to extract raw text from PDF and DOCX files respectively.
MySQL & mysql2: Database integration for persistent storage of user profiles or session history (optional/extensible).
Dotenv: Secure management of environment variables and API keys.
🎨 Design Philosophy
The application follows a Dark Mode Premium design language:

Visual Hierarchy: Uses depth and blur (glassmorphism) to focus user attention on the primary task.
Micro-Animations: Subtle hover effects and pulse animations provide a high-end, responsive feel.
Responsive Layout: Designed to work seamlessly across desktops and larger tablets.
