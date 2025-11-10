# 🧱 Task Definition – Django URL Shortener App

## 1. Purpose
This document defines the **detailed tasks, deliverables, and acceptance criteria** for each milestone of the Django URL Shortener app.  
It aligns with the project plan tracked in **Microsoft Planner** and complements the `Refinement_URL_Shortener.md` document.

---

## 2. Milestone-Based Task Breakdown

### 🗓 Milestone 1 – Refinement & Task Definition (Due: 11/11)
**Objective:** Clarify project scope, requirements, architecture, and planning.

| Task | Description | Deliverable | Estimation | Acceptance Criteria |
|------|--------------|--------------|-------------|----------------------|
| T1.1 | Define project goals and scope | Finalized refinement document | 0.5 days | Scope and goals |
| T1.2 | Identify technologies and stack | Django + SQLite + HTML/Bootstrap | 0.25 days | Stack clearly defined |
| T1.3 | Create project roadmap and milestones | Timeline aligned with Planner | 0.25 days | All milestones listed |
| T1.4 | Create task definition (this file) | `Task_Definition.md` | 0.5 days | Approved by mentor |

---

### 🗓 Milestone 2 – MVP Code Implementation (Due: 11/14)
**Objective:** Develop and test the minimum viable product (MVP).

| Task | Description | Deliverable | Estimation | Acceptance Criteria |
|------|--------------|--------------|-------------|----------------------|
| T2.1 | Initialize Django project (`django-admin startproject`) | Base project structure | 0.5 days | Project runs with `python manage.py runserver` |
| T2.2 | Create app `shortener` | Django app folder with models/views/urls | 0.5 days | App registered in `settings.py` |
| T2.3 | Implement URL model | Model: `original_url`, `short_code`, `created_at` | 0.5 days | Model migrated to DB |
| T2.4 | Implement shorten view | Handles form input & generates short code | 1 day | Returns valid short link |
| T2.5 | Implement redirect view | Redirects short code → original URL | 0.5 days | Redirect works for valid links |
| T2.6 | Add basic templates | Simple form + result HTML | 0.5 days | User can shorten URLs in browser |
| T2.7 | Test MVP locally | Manual testing | 0.5 days | No blocking issues |

---

### 🗓 Milestone 3 – Code Review (Due: 11/18)
**Objective:** Review implementation for quality, consistency, and maintainability.

| Task | Description | Deliverable | Estimation | Acceptance Criteria |
|------|--------------|--------------|-------------|----------------------|
| T3.1 | Peer review code | Feedback document / comments in PR | 0.5 days | All major issues identified |
| T3.2 | Apply fixes & improvements | Updated code | 0.5 days | Linter passes (PEP8) |
| T3.3 | Add basic unit tests | Test for shorten & redirect functions | 0.5 days | All tests pass locally |

---

### 🗓 Milestone 4 – Production Ready (Due: 11/24)
**Objective:** Prepare stable and complete version for final testing.

| Task | Description | Deliverable | Estimation | Acceptance Criteria |
|------|--------------|--------------|-------------|----------------------|
| T4.1 | Refactor code | Improve readability and comments | 0.5 days | Code quality verified |
| T4.2 | Create `requirements.txt` | Auto-generated dependencies list | 0.25 days | App installs cleanly on new env |
| T4.3 | Add `.gitignore` | Ignore cache, DB, venv files | 0.25 days | Repo clean |
| T4.4 | Conduct system test | Run full app flow | 0.5 days | All core features pass |

---

### 🗓 Milestone 5 – Finetuning (Due: 11/25)
**Objective:** Polish the app, fix minor issues, and add optional enhancements.

| Task | Description | Deliverable | Estimation | Acceptance Criteria |
|------|--------------|--------------|-------------|----------------------|
| T5.1 | UI/UX improvements | Styling with Bootstrap | 0.5 days | Clean and responsive UI |
| T5.2 | Add REST API (optional) | Endpoint `/api/shorten` | 0.75 days | Returns JSON `{ "short_url": ... }` |
| T5.3 | Performance test | Measure redirect speed | 0.25 days | < 1 second response |

---

### 🗓 Milestone 6 – Demo Prepare (Due: 11/26)
**Objective:** Prepare presentation materials and project documentation.

| Task | Description | Deliverable | Estimation | Acceptance Criteria |
|------|--------------|--------------|-------------|----------------------|
| T6.1 | Write README.md | Setup, usage, examples | 0.5 days | Clear instructions |
| T6.2 | Add screenshots | Capture interface examples | 0.25 days | Visible in README |
| T6.3 | Create presentation deck | PowerPoint / Google Slides | 0.5 days | Slides ready for showcase |
| T6.4 | Final test run | Verify app + presentation | 0.25 days | No blockers for demo |

---

### 🗓 Milestone 7 – Showcase (Due: 11/27)
**Objective:** Deliver and present final working project.

| Task | Description | Deliverable | Estimation | Acceptance Criteria |
|------|--------------|--------------|-------------|----------------------|
| T7.1 | Live presentation | Showcase of final app | 0.5 days | Mentor evaluation complete |
| T7.2 | Submit final repo | Push `main` branch + docs | 0.25 days | GitHub repo validated |
| T7.3 | Upload slides & docs | Deliver via Planner / Drive | 0.25 days | All files approved |

---

## 3. Task Summary

| Milestone | Main Deliverable | Due Date |
|------------|------------------|-----------|
| Refinement & Task Definition | Project documentation | 11/11 |
| MVP Code Implementation | Basic Django app | 11/14 |
| Code Review | Reviewed and corrected code | 11/18 |
| Production Ready | Stable version | 11/24 |
| Finetuning | Improved UX + API | 11/25 |
| Demo Prepare | Docs and slides | 11/26 |
| Showcase | Final presentation | 11/27 |

---

## 5. Deliverables Summary
- `Refinement_and_Task_Definition_v2.md`  
- `Task_Definition.md`  
- Full Django app on GitHub  
- `README.md` with setup guide  
- Presentation slides  
- Demo-ready application for 27 November  
