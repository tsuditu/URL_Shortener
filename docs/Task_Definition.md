# 🧩 Product Backlog – Django URL Shortener (Django + React)

## Epic 1: Project Setup & Planning ✅
**Goal:** Establish the foundation for the project by defining scope, stack, and documentation.  

### Feature 1.1 – Project Initialization ✅ 
**User Story:**  
> As a developer, I want to set up the project repository and environment so that I can begin building the Django + React application.  

**Tasks**
| ID | Task | Estimation | Deliverable |
|----|------|-------------|--------------|
✅ | T1.1 | Create GitHub repository `URL_Shortener` | 0.25 days | Public repo with README |
✅ | T1.2 | Initialize Django backend (`django-admin startproject`) | 0.5 days | Base Django structure |
✅ | T1.3 | Initialize React frontend (`npx create-react-app`) | 0.5 days | Base React structure |
✅ | T1.4 | Link React with Django backend (CORS config) | 0.25 days | Connected environments |
✅ | T1.5 | Set up CI pipeline (GitHub Actions) | 0.5 days | Automated tests and linting on push/pull request |

### Feature 1.2 – Documentation & Definition ✅ 
**User Story:**  
> As a developer, I need to define the scope, milestones, and tasks of the project so that I can track progress clearly.  

**Tasks**
| ID | Task | Estimation | Deliverable |
|----|------|-------------|--------------|
✅ | T1.6 | Write `Refinement_URL_Shortener.md` | 0.5 days | Refinement document |
✅ | T1.7 | Write `Task_Definition.md` | 0.5 days | Task planning document |
✅ | T1.8 | Upload documentation to Planner and GitHub | 0.25 days | Linked files visible in repo |


## Epic 2: MVP Delivery – URL Shortener Application ✅
**Goal:** Deliver a fully functional Minimum Viable Product (MVP) for the URL Shortener project, integrating Django (backend) and React (frontend) into a single, working fullstack application with CI/CD validation.

**Description:**
This epic consolidates all key deliverables required to demonstrate a complete end-to-end solution — from environment setup and backend API development to frontend integration, testing, and documentation.
It ensures the application can shorten URLs, display the generated short links, and handle redirects in a controlled, testable environment.

### Feature 2.1 – MVP ✅
| ID | Task | Description | Status |
|----|---------|-------------|--------|
✅ | T2.1 | Backend API Implementation | Develop `/api/shorten/` endpoint with hashing-based URL shortening and JSON response. |
✅ | T2.2 | Redirect Logic | Implement redirect handling for short URLs (`/<short_code>`). |
✅ | T2.3 | Frontend Integration | Connect React app to Django backend via `fetch()` for URL shortening requests. |
✅ | T2.4 | UI/UX Development | Build simple user interface (input, button, display link) with minimal styling. |
✅ | T2.5 | CORS & Security Configuration | Configure CORS, SECRET_KEY, DEBUG, and allowed origins for secure API communication. |
✅ | T2.6 | CI/CD Setup | Add GitHub Actions pipeline for automated testing (Python + Node). |

## Epic 3: Core Functionality – Backend ✅
**Goal:** Implement the logic for URL shortening and redirection with database integration.

### Feature 2.1 – URL Shortening Logic ✅
**User Story:**  
> As a user, I want to submit a long URL and get a short version that I can easily share.  

**Tasks**
| ID | Task | Estimation | Deliverable |
|----|------|-------------|--------------|
✅ | T2.1 | Define and migrate shortener_url model to database (original_url, short_code, created_at) | 0.5 days | Django model created and applied via migrations
✅ | T2.2 | Generate unique short code (random string | the same for the same URL input) | 0.5 days |
✅ | T2.3 | Implement `shorten` API endpoint (`/api/shorten`) | 1 day | JSON response with short URL |
✅ | T2.4 | Implement validation for input URLs | 0.5 days | URL check in serializer/view |
✅ | T2.5 | Update shortening logic to use database for saving and retrieving URLs | 1 day | Persistent URL storage and lookup using Django ORM |
✅ | T2.6 | Write unit tests for API logic | 0.5 days | `pytest` or Django test cases |


### Feature 2.2 – Redirection Logic ✅  
**User Story:**  
> As a user, I want to access the short URL and be redirected to the original link instantly.  

**Tasks**
| ID | Task | Estimation | Deliverable |
|----|------|-------------|--------------|
✅ | T2.6 | Implement redirect view (`/<short_code>`) | 0.5 days | View + URL mapping |
✅ | T2.7 | Add error handling for invalid codes | 0.25 days | 404 page |
✅ | T2.8 | Test redirection flow manually | 0.25 days | Verified working redirects |


## Epic 4: Frontend Development – React ✅
**Goal:** Build a simple and intuitive UI to interact with the shortening service.

### Feature 3.1 – React Components  ✅
**User Story:**  
> As a user, I want a simple interface where I can input my long URL and receive the short version visually.  

**Tasks**
| ID | Task | Estimation | Deliverable |
|----|------|-------------|--------------|
✅ | T3.1 | Create form component (`UrlInput.jsx`) | 0.5 days | Input field for URL |
✅ | T3.2 | Create result display component (`ShortLink.jsx`) | 0.25 days | Displays generated short link |
✅ | T3.3 | Connect frontend to Django backend | 0.5 days | Fetch POST request integration |
✅ | T3.4 | Handle errors and loading states | 0.25 days | UX improvements |
✅ | T3.5 | Apply basic Bootstrap/Reactstrap styling | 0.25 days | Responsive UI |

### Feature 3.2 – Frontend Testing Enhancements ✅
**User Story:**  
> As a developer, I want automated tests for React components so that I can ensure UI reliability and catch regressions early.

**Tasks**
| ID   | Task | Estimation | Deliverable |
|------|------|------------|-------------|
✅ | T3.6 | Add unit tests for React components (`App.test.js`, `UrlInput.test.js`, `ShortLink.test.js`) | 0.5 days | Tests verifying rendering, user input, and conditional logic |
✅ | T3.7 | Integrate React Testing Library and Jest DOM matchers | 0.25 days | Readable, behavior-driven tests using`@testing-library/react`      |
✅ | T3.8 | Configure test execution in CI/CD | 0.25 days  | Pipeline runs `npm test -- --watchAll=false` and fails on test fail |

## Epic 5: Testing & Code Review ✅
**Goal:** Validate functionality, ensure quality, and fix bugs.

### Feature 4.1 – Backend Testing  ✅
**User Story:**  
> As a developer, I want automated tests to verify that shortening and redirection logic works correctly.  

**Tasks**
| ID | Task | Estimation | Deliverable |
|----|------|-------------|--------------|
✅ | T4.1 | Unit test URL model and shortener logic | 0.5 days | Django test results |
✅ | T4.2 | Integration test for API responses | 0.5 days | API tested with Postman |
✅ | T4.3 | Linting and code cleanup (PEP8) | 0.25 days | Clean CI-ready code |


### Feature 4.2 – Code Review ✅  
**User Story:**  
> As a peer reviewer, I want to review and provide feedback on the code to ensure maintainability and structure.  

**Tasks**
| ID | Task | Estimation | Deliverable |
|----|------|-------------|--------------|
✅ | T4.4 | Conduct code review with mentor | 0.5 days | Feedback documented |
✅ | T4.5 | Apply suggested improvements | 0.5 days | Updated branch in repo |


## Epic 6: Production Ready & Finetuning ✅
**Goal:** Finalize a stable version, improve performance, and prepare for showcase.

### Feature 5.1 – Final Optimization  ✅
**User Story:**  
> As a developer, I want the app to be polished and performant before the final presentation.  

**Tasks**
| ID | Task | Estimation | Deliverable |
|----|------|-------------|--------------|
✅ | T5.1 | Refactor code & add comments | 0.5 days | Clean readable code |
✅ | T5.2 | Add `requirements.txt` & `.gitignore` | 0.25 days | Production-ready repo |
✅ | T5.3 | Conduct system test (backend + frontend) | 0.5 days | Stable app build |


## Epic 7: Documentation & Demo
**Goal:** Create supporting materials and finalize project delivery.

### Feature 6.1 – Project Documentation  
**User Story:**  
> As a mentor or evaluator, I want to read documentation that clearly explains the app setup, architecture, and usage.  

**Tasks**
| ID | Task | Estimation | Deliverable |
|----|------|-------------|--------------|
| T6.1 | Write `README.md` | 0.5 days | Setup and usage guide |
| T6.2 | Add screenshots and examples | 0.25 days | Visual proof of UI |
| T6.3 | Create demo slides (PowerPoint/Google Slides) | 0.5 days | Presentation deck |


## Epic 8: Showcase & Delivery
**Goal:** Present the final project and submit all deliverables.

### Feature 7.1 – Final Presentation  
> As a developer, I want to present my completed URL Shortener application to mentors and evaluators, showcasing its features and submitting all required deliverables for assessment.

**Tasks**
| ID | Task | Estimation | Deliverable |
|----|------|-------------|--------------|
| T7.1 | Rehearse live demo | 0.25 days | Practiced flow |
| T7.2 | Present project to mentors | 0.25 days | Live demonstration |
| T7.3 | Submit final code + documentation | 0.25 days | GitHub repo and slides uploaded |


## Total Estimation Summary

| Epic | Estimated Time | Focus |
|------|----------------|-------|
| Project Setup & Planning | 2 days | Initialization, docs & CI |
| MVP Delivery – URL Shortener Application | 0 days | Fullstack MVP |
| Core Functionality – Backend | 3 days | API + database |
| Frontend Development – React | 2 days | UI integration |
| Testing & Code Review | 1.5 days | Quality assurance |
| Production Ready & Finetuning | 1.5 days | Optimization |
| Documentation & Demo | 1.5 days | Presentation prep |
| Showcase & Delivery | 0.5 days | Final submission |

**Total Estimated Effort:** ~12 days  
