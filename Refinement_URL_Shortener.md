# 🧩 Refinement & Task Definition – Django URL Shortener

## 1. Project Overview
**Project Name:** Django URL Shortener  
**Category:** Web Application / Python 
**Framework:** Django
**Repository:** https://github.com/tsuditu/URL_Shortener.git
**Showcase Date:** 27 November  

The project aims to develop a simple yet functional **URL Shortening web application** using Django.  
Users can input long URLs and receive short, shareable links that automatically redirect to the original destination.  
The project will progress through the following milestones:  
- Refinement & Task Definition (11/11)  
- MVP Code Implementation (11/14)  
- Code Review (11/18)  
- Production Ready (11/24)  
- Finetuning (11/25)  
- Demo Prepare (11/26)  
- Showcase (11/27)

---

## 2. Project Goals
- Build a fully functional Django-based web application.  
- Understand and implement URL routing, models, and views.  
- Store URL mappings in a database (SQLite).  
- Create a minimal and intuitive web interface for user interaction.  
- Optionally, expose the functionality as a REST API endpoint.  
- Deliver a working MVP version for the November showcase.

---

## 3. Scope Definition

### ✅ In Scope
- Django web application using Python 3.x  
- URL model for long–short mapping  
- Routing, views, and templates for web-based shortening  
- SQLite database for persistence  
- HTML/Bootstrap-based frontend  
- Optional REST API endpoint `/api/shorten`  
- Documentation and Planner task updates  

### ❌ Out of Scope
- Authentication and user profiles  
- Analytics and statistics  
- External hosting/deployment  
- Frontend frameworks (React/Vue)  

---

## 4. Timeline & Deliverables (Based on Planner Tasks)

| Date | Phase | Description | Deliverable |
|------|--------|-------------|--------------|
| **11/11** | Refinement & Task Definition | Define requirements, scope, architecture, tasks, and acceptance criteria. | `Refinement_and_Task_Definition.md` |
| **11/14** | MVP Code Implementation | Develop core functionality: URL model, shorten & redirect views, templates. | Working MVP in GitHub repo |
| **11/18** | Code Review | Peer or mentor review of logic, structure, and style. | Feedback + fixes PR |
| **11/24** | Production Ready | Finalize code, add comments, tests, and cleanup. | Stable version in `main` branch |
| **11/25** | Finetuning | UI/UX polish, bug fixes, optional REST API. | Polished demo-ready app |
| **11/26** | Demo Prepare | Prepare README, screenshots, and presentation slides. | README.md + Demo Deck |
| **11/27** | Showcase | Final project presentation & demonstration. | MVP showcased successfully |

---

## 5. Functional Requirements

| ID | Requirement | Description |
|----|--------------|-------------|
| FR1 | URL Submission | User inputs a long URL through a form. |
| FR2 | URL Validation | Application ensures URLs are valid. |
| FR3 | URL Shortening | System generates a unique short code. |
| FR4 | Database Storage | Original and short URLs are saved in DB. |
| FR5 | Redirection | Short URL redirects to the original one. |
| FR6 | Interface | Simple web UI for interaction. |
| FR7 | API Endpoint (optional) | REST endpoint for JSON requests. |

---

## 6. Non-Functional Requirements

| Category | Requirement |
|-----------|-------------|
| Performance | Redirection under 1 second |
| Reliability | Handles invalid or duplicate inputs |
| Maintainability | PEP8 compliance, clear code structure |
| Usability | Minimal and intuitive UI |
| Scalability | Can extend with analytics/API in the future |

---

## 7. Architecture Overview
**Stack:**  
- Backend: Django (Python 3.x)  
- Database: SQLite  
- Frontend: HTML + Bootstrap  
- Optional API: Django REST Framework  
- Version Control: Git + GitHub  

**Flow:**  
User → Form → Shorten View → DB Save → Return Short Link → Redirect View → Original URL

---

## 8. Work Breakdown (Linked to Planner)

| Epic | Subtask | Owner | Est. Time |
|------|----------|--------|------------|
| Project Setup | Initialize Django project | Dev | 0.5 days |
| | Create app `shortener` | Dev | 0.5 days |
| Core Functionality | Define `URL` model | Dev | 0.5 days |
| | Implement shorten/redirect views | Dev | 1 day |
| | Validate inputs | Dev | 0.5 days |
| Frontend | Create templates (form/results) | Dev | 0.5 days |
| | Integrate Bootstrap | Dev | 0.25 days |
| Documentation | Write README.md | Doc | 0.5 days |
| | Demo slides & showcase | Doc | 0.5 days |

---

## 9. Acceptance Criteria

| Task | Acceptance Criteria |
|------|----------------------|
| Setup | Runs via `python manage.py runserver` |
| Model | URLs stored and retrieved correctly |
| Shorten View | Returns valid short link |
| Redirect | Correctly redirects to original |
| UI | User can shorten link easily |
| README | Includes install & usage steps |
| Demo | App demonstrated successfully |

---

## 10. Deliverables Summary
- `Refinement_and_Task_Definition.md` (this document)  
- Source code on GitHub (MVP + final)  
- `README.md` with setup & usage  
- Presentation deck for demo day  
- Working Django app (MVP and production-ready versions)
