# 🚀 QueueCTL

> A lightweight CLI-based Background Job Queue built using **Node.js** and **SQLite** that supports asynchronous job execution, worker management, retries with exponential backoff, and a Dead Letter Queue (DLQ).

---

# 📌 Table of Contents

- Overview
- Features
- Architecture
- Project Structure
- Tech Stack
- Installation
- Getting Started
- Available Commands
- Database Schema
- Job Lifecycle
- Worker Lifecycle
- Retry Strategy
- Sample Workflow
- Design Decisions
- Future Improvements
- Learning Outcomes
- License

---

# 📖 Overview

QueueCTL is a command-line background job processing system inspired by tools like **BullMQ**, **Sidekiq**, and **Celery**.

Instead of executing tasks immediately, commands are placed into a persistent queue where background workers process them asynchronously.

The system provides:

- Persistent job storage
- Worker processes
- Automatic retries
- Exponential backoff
- Dead Letter Queue
- Worker monitoring
- Queue statistics

This project demonstrates the core concepts behind distributed background job systems while keeping the implementation lightweight and easy to understand.

---

# ✨ Features

- ✅ CLI-based Job Queue
- ✅ SQLite Persistent Storage
- ✅ Background Worker Execution
- ✅ Atomic Job Claiming
- ✅ Retry Mechanism
- ✅ Exponential Backoff
- ✅ Dead Letter Queue (DLQ)
- ✅ Worker Registration
- ✅ Worker Heartbeats
- ✅ Graceful Shutdown
- ✅ Queue Statistics
- ✅ Job Status Inspection
- ✅ Worker Monitoring
- ✅ Retry Failed Jobs

---

# 🏗 Architecture

```
                QueueCTL

        CLI Commands
             │
             ▼
      Service Layer
             │
             ▼
       Model Layer
             │
             ▼
      SQLite Database
```

### Layer Responsibilities

### CLI Layer

Handles user commands using Commander.js.

Examples:

- enqueue
- worker
- list
- stats
- retry

---

### Service Layer

Contains business logic.

Responsible for:

- Job execution
- Retry logic
- Worker management
- Queue statistics

---

### Model Layer

Handles database operations.

Responsible for:

- Creating jobs
- Updating job state
- Fetching workers
- Reading statistics

---

### Database

SQLite stores:

- Jobs
- Workers
- Configuration

---

# 📂 Project Structure

```
queuectl/
│
├── src/
│
├── cli/
│   ├── commands/
│   │   ├── enqueue.js
│   │   ├── worker.js
│   │   ├── workers.js
│   │   ├── list.js
│   │   ├── status.js
│   │   ├── stats.js
│   │   └── retry.js
│   │
│   └── index.js
│
├── database/
│   ├── db.js
│   ├── init.js
│   └── schema.sql
│
├── models/
│   ├── jobModel.js
│   └── workerModel.js
│
├── services/
│   ├── jobService.js
│   ├── workerService.js
│   ├── listService.js
│   ├── statusService.js
│   ├── statsService.js
│   ├── workerInfoService.js
│   └── requeueService.js
│
├── workers/
│   └── worker.js
│
├── queue.db
├── package.json
└── README.md
```

---

# ⚙️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Commander.js | CLI Framework |
| SQLite | Database |
| better-sqlite3 | SQLite Driver |
| UUID | Unique Job IDs |

---

# 🚀 Installation

Clone repository

```bash
git clone https://github.com/<your-username>/QueueCLI.git
```

Move into project

```bash
cd QueueCLI
```

Install dependencies

```bash
npm install
```

---

# ▶️ Getting Started

Initialize project

```bash
npm start
```

Enqueue a job

```bash
npm start -- enqueue "echo Hello"
```

Start worker

```bash
npm start -- worker
```

---

# 💻 Available Commands

## Enqueue

```bash
npm start -- enqueue "<command>"
```

Adds a new job to the queue.

---

## Worker

```bash
npm start -- worker
```

Starts a background worker that processes pending jobs.

---

## List Jobs

```bash
npm start -- list
```

Displays every job.

---

## Job Status

```bash
npm start -- status <jobId>
```

Shows complete information about one job.

---

## Queue Statistics

```bash
npm start -- stats
```

Displays queue metrics.

---

## Workers

```bash
npm start -- workers
```

Displays registered workers.

---

## Retry Job

```bash
npm start -- retry <jobId>
```

Moves a Dead Letter Queue job back to pending.

---

# 🗄 Database Schema

## Jobs Table

| Column | Description |
|---------|-------------|
| id | Job ID |
| command | Command |
| state | Current state |
| attempts | Retry count |
| max_retries | Maximum retries |
| available_at | Next execution |
| worker_id | Assigned worker |
| last_error | Failure reason |
| created_at | Creation time |
| updated_at | Last update |

---

## Workers Table

| Column | Description |
|---------|-------------|
| worker_id | Worker ID |
| pid | Process ID |
| status | active/stopped |
| started_at | Worker start time |
| last_heartbeat | Latest heartbeat |

---

# 🔄 Job Lifecycle

```
Pending
   │
   ▼
Processing
   │
   ├────────► Completed
   │
   ▼
Failed
   │
   ▼
Retry
   │
   ▼
Retry
   │
   ▼
Retry
   │
   ▼
Dead Letter Queue
```

---

# ❤️ Worker Lifecycle

```
Worker Starts
      │
      ▼
Register Worker
      │
      ▼
Heartbeat
      │
      ▼
Poll Queue
      │
      ▼
Execute Jobs
      │
      ▼
Graceful Shutdown
```

---

# ⚡ Retry Strategy

QueueCTL uses **Exponential Backoff**.

```
Attempt 1 → Wait 2 seconds

Attempt 2 → Wait 4 seconds

Attempt 3 → Wait 8 seconds

Maximum retries exceeded

↓

Move to Dead Letter Queue
```

---

# 📸 Sample Workflow

### 1. Add Job

```bash
npm start -- enqueue "echo Hello"
```

↓

### 2. Start Worker

```bash
npm start -- worker
```

↓

### 3. Check Jobs

```bash
npm start -- list
```

↓

### 4. View Statistics

```bash
npm start -- stats
```

↓

### 5. Retry Failed Job

```bash
npm start -- retry <jobId>
```

---

# 🎯 Design Decisions

- Layered architecture for maintainability.
- SQLite transactions to avoid duplicate job execution.
- Worker heartbeat monitoring.
- Dead Letter Queue for permanently failed jobs.
- Exponential backoff to reduce repeated failures.
- Persistent storage for job recovery.

---

# 🚀 Future Improvements

- Job priorities
- Delayed jobs
- Scheduled jobs (Cron)
- Redis backend
- RabbitMQ integration
- Kafka support
- REST API
- Web Dashboard
- Docker deployment
- Unit & Integration Tests

---

# 📚 Learning Outcomes

Through this project I learned:

- Background job processing
- Worker lifecycle management
- Retry strategies
- SQLite transactions
- Dead Letter Queue design
- Layered application architecture
- Building production-style CLI applications
