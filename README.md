# SG-Gruppe-10
Repository for SG-Gruppe-10 - IBE160 Programmering med KI.

# PumpTrack – Personal Workout Logger

PumpTrack is a personal workout logging web application that helps users track their fitness progress, set goals, and stay motivated. Built with a modern tech stack and developed using AI-assisted tools, PumpTrack is designed for simplicity, clarity, and performance.

## 🚀 Features

### ✅ Must Have (MVP)
- **User Authentication**: Secure registration and login using Supabase Auth.
- **Workout Logging**: Log workouts with date, type, duration, intensity, and notes.
- **Goal Tracking**: Set and monitor personal fitness goals.

### 🌟 Nice to Have (Optional Extensions)
- **Progress Statistics**: Visualize progress with charts and graphs.
- **Workout Sharing**: Share workouts with friends.
- **Calendar View**: View workouts in a calendar format.
- **AI Features**:
  - Smart goal suggestions based on workout history
  - Natural language input for logging workouts (e.g., "ran 5k in 25 minutes")
  - AI-generated motivational messages

## 🧑‍💻 Tech Stack

| Layer     | Technology             |
|-----------|------------------------|
| Frontend  | Next.js + Tailwind CSS |
| Backend   | FastAPI (Python)       |
| Database  | Supabase (PostgreSQL)  |
| Auth      | Supabase Auth          |
| AI Tools  | Gemini CLI, BMAD-METHOD™, ChatGPT |

## 🗃️ Data Model

- **Users**: name, email, password
- **Workouts**: date, workout type, duration, intensity, notes
- **Goals**: goal type, start value, target value, progress
- **Progress**: date, value, linked goal

## 🔄 User Flows

1. **Register/Login** → Access dashboard
2. **Log Workout** → Fill form → Submit → View in history
3. **Set Goal** → Choose goal type → Track progress
4. **View Progress** → See stats and charts
5. **(Optional)** Share workout or receive AI suggestions

## 📅 Development Timeline

| Week | Milestone |
|------|-----------|
| 1    | Project setup, Supabase config, auth system, DB schema |
| 2    | Workout logging CRUD (backend + frontend) |
| 3    | Goal tracking module, connect to workouts |
| 4    | AI features: smart goals, NLP input, motivational messages |
| 5    | UI refinement, mobile responsiveness, testing |
| 6    | Buffer, documentation, deploy to Vercel/Render |

## ⚙️ Getting Started

### Prerequisites
- Node.js + npm
- Python 3.10+
- Supabase account

### Setup
```bash
# Clone the repo
git clone https://github.com/IBE160/SG-Gruppe-10.git
cd SG-Gruppe-10