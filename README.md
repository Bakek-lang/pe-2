# Project Exam 2 - Holidaze

## Overview

Holidaze is a modern front-end application built for an accommodation booking platform. Developed as my Project Exam 2—the final exam in my 2 year frontend development education at Noroff—this project showcases my development, visual design, and technical skills acquired over the past two years. The application features both a customer-facing side, where users can browse and book venues, and an admin-facing side, where venue managers can create, update, and manage venues and their bookings.

## Features

### Customer Interface

- **View Venues:** Users can browse a comprehensive list of venues.
- **Search Functionality:** Find specific venues quickly with a search option.
- **Venue Details:** Detailed pages for each venue, including a calendar view of available dates.
- **User Registration:** Customers can register using a `stud.noroff.no` email.
- **Booking Management:** Registered customers can create and view upcoming bookings.

### Admin Interface

- **Venue Manager Registration:** Users with a `stud.noroff.no` email can register as venue managers.
- **Venue Management:** Registered managers can create, update, and delete venues they manage.
- **Booking Overview:** Venue managers can view bookings for their managed venues.

### User Management

- **Authentication:** Features for user login and logout.
- **Profile Customization:** Registered users can update their avatar and bio.

## Built With

- **JavaScript Framework:** [React](https://reactjs.org/)
- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/)
- **Hosting:** [Netlify](https://www.netlify.com/)
- **Design Tool:** [Figma](https://www.figma.com/)
- **Project Management:**
  - **Kanban Board:** [Trello](https://trello.com/)
  - **Gantt Chart:** [Notion](https://www.notion.com/)

## API Integration

This project uses the official Holidaze API as documented in the [Noroff API Documentation](https://docs.noroff.dev/) and [API Swagger](https://v2.api.noroff.dev/docs/static/index.html). All API-related functionality is managed by an existing back-end service, allowing the focus to remain on delivering a modern, user-friendly front end.

## Setup and Installation

To run this project locally, follow these steps:

1. **Clone the Repository:**

```bash
git clone https://github.com/Bakek-lang/pe-2.git
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Run the Development Server:**

```bash
npm run dev
```

4. **Build the project for production:**

```bash
npm run build
```

5. **Preview the production build:**

```bash
npm run preview
```

### Deployment

The project is deployed and hosted on Netlify. You can view the live version of the project at: [Holidaze](https://holidaze-pe2-bakek.netlify.app/)

### User Stories

- A user may view a list of Venues
- A user may search for a specific Venue
- A user may view a specific Venue page by id
- A user may view a calendar with available dates for a Venue
- A user with a stud.noroff.no email may register as a customer
- A registered customer may create a booking at a Venue
- A registered customer may view their upcoming bookings
- A user with a stud.noroff.no email may register as a Venue manager
- A registered Venue manager may create a Venue
- A registered Venue manager may update a Venue they manage
- A registered Venue manager may delete a Venue they manage
- A registered Venue manager may view bookings for a Venue they manage
- A registered user may login
- A registered user may update their avatar
- A registered user may logout
