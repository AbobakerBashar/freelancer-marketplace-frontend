A. Authentication and account security
[ x ] Register and log in with validation
[ x ] Secure password hashing and HTTP-only JWT cookie
[ x ] Get the current authenticated user (/api/auth/me)
[ x ] Logout and clear the authentication cookie
[ x ] Update profile and change password
[ ] Forgot-password and reset-password flow
[ x ] Role-based authorization for CLIENT and FREELANCER
[ x ] Account activation/deactivation and safe account deletion
[ x ] Protect routes and API endpoints against unauthorized access
[ x ] Validate input with Zod and return consistent errors

B. User profiles
[ x ] Profile page with name, avatar, bio and location
[ x ] Edit profile and upload/change avatar
[ ] Freelancer skills, experience and portfolio links
[ ] Client profile and posted-project history
[ ] Display completed projects and review ratings
[ ] Profile completeness indicator
[ ] Public profile view with private fields excluded

C. Project management
[ x ] Create, edit and delete projects with ownership checks
[ ] Draft, open, in-progress, completed, cancelled and closed states
[ x ] Project details: description, category, skills and budget
[ x ] Fixed-price and hourly budgets, currency and duration
[ x ] Project listing with pagination and sorting
[ x ] Search by title and description
[ x ] Filter by skills, category, budget, status and duration
[ x ] Project detail page with client information
[ x ] My projects endpoint scoped to the authenticated user and role
[ ] Project status transitions and validation
[ x ] Prevent applying to closed or otherwise ineligible projects

D. Proposals and hiring
[ x ] Submit proposal with cover letter, bid and delivery estimate
[ ] Freelancer's submitted-proposals list
[ x ] Client's proposals for a project
[ ] View proposal details and freelancer profile
[ x ] Edit or withdraw a proposal when permitted
[ x ] Accept or reject a proposal with authorization checks
[ x ] Prevent duplicate proposals for the same project
[ x ] Prevent multiple accepted freelancers for one project
[ x ] Update project and proposal statuses atomically in a transaction
[ ] Proposal statistics including zero-count statuses
[ ] Notify both parties about proposal and hiring events

E. Project workspace
[ x ] Create a conversation automatically after hiring
[ x ] Workspace overview for the client and assigned freelancer
[ ] Project milestones or tasks and their statuses
[ ] Start date, deadline and progress indicators
[ ] Project activity timeline
[ ] Shared project files and deliverables
[ ] Submit work for client review
[ ] Request revisions and resubmission
[ ] Approve final delivery and complete the project
[ ] Handle cancellation and disputes with clear rules

F. Real-time messaging
[ x ] Conversation list for the authenticated user
[ x ] One conversation per hired project, unless the product requires otherwise
[ x ] Real-time send and receive using Socket.IO
[ ] Load message history through paginated API endpoints
[ ] Order messages by creation time and display chronologically
[ x ] Message sender, text, conversation and timestamps
[ x ] Conversation membership and authorization on every socket event
[ ] Join and leave conversation rooms securely
[ ] Optimistic message sending and failure handling
[ ] Unread counts and read receipts
[ ] Typing indicators and online/offline presence
[ ] Reconnect handling and message deduplication
[ ] Notifications for new messages when the recipient is away

G. Notifications
[ ] In-app notification list and unread count
[ ] Mark one notification or all notifications as read
[ ] New proposal notification for the client
[ ] Accepted/rejected proposal notification for the freelancer
[ ] New message and project status notifications
[ ] Deadline and revision reminders
[ ] Notification preferences
[ ] Optional email notifications for important events

H. Reviews and reputation
[ ] Client reviews freelancer after project completion
[ ] Freelancer reviews client if two-way reviews are supported
[ ] Rating and written feedback
[ ] One review per eligible user per completed project
[ ] Calculate average rating and review count
[ ] Display reviews on profile pages
[ ] Prevent reviews before completion or from unrelated users

I. Dashboard and discovery experience
[ ] Role-specific client and freelancer dashboards
[ ] Freelancer active projects and upcoming deadlines
[ ] Client projects, proposals and hired freelancers
[ ] Summary cards and accurate statistics
[ ] Recently viewed or recommended projects (optional)
[ ] Loading skeletons, empty states and error states
[ ] Responsive navigation, mobile layouts and accessible forms
[ ] Confirmation dialogs for destructive actions
[ ] Search filters reflected in URL when useful

J. Backend reliability and security
[ ] Consistent API response and error format
[ ] Centralized error-handling middleware
[ ] Request validation for body, params and query
[ ] Database constraints and correct Prisma relations
[ ] Ownership and role checks in services
[ ] Rate limiting on login, registration and messaging
[ ] Secure CORS, cookie and production environment settings
[ ] Safe file-upload validation and storage permissions
[ ] Transactions for hiring and project state changes
[ ] Indexes for frequent searches and message history
[ ] Prevent mass assignment and sensitive data exposure
[ ] Structured logging without passwords, tokens or private message contents
[ ] API documentation and predictable HTTP status codes

K. Testing and deployment
[ ] Unit tests for services and utility functions
[ ] Integration tests for auth, projects and proposals
[ ] Authorization tests for client/freelancer boundaries
[ ] Tests for concurrent proposal acceptance and duplicate submissions
[ ] Socket messaging and conversation-access tests
[ ] Frontend form validation and critical flow tests
[ ] Production database migrations and repeatable seed data
[ ] Environment variable validation
[ ] Automated linting, type checking and production builds
[ ] CI workflow to run checks on pull requests
[ ] Production logs, error monitoring and database backups
