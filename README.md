
Built by https://www.blackbox.ai

---

```markdown
# Deepak Infratech - Room Rent Management System

## Project Overview

The **Room Rent Management System** is a web application designed to facilitate the management of room rentals, owner details, and tenant information for Deepak Infratech. It provides an intuitive user interface for user registration and login, management of rooms and owners, tracking rents, and generating reports.

## Installation

To run the Room Rent Management System locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/room-rent-management.git
   cd room-rent-management
   ```

2. **Open the `index.html` file** in your preferred web browser.

## Usage

1. **User Registration and Login**:
   - When the application loads, new users can register by providing their name, email, password, contact number, and role (staff, manager, or admin).
   - Existing users can log in using their email and password.

2. **Dashboard**:
   - Users can access their dashboard upon successful login, allowing them to manage rooms, owners, and staff easily.
   - The dashboard displays vital statistics like the number of room owners, current rooms, staff, and pending payments.

3. **Room and Owner Management**:
   - Add, edit, or delete room and owner details.
   - View detailed reports of all rooms and their statuses.

4. **Payment Management**:
   - Keep track of rent payments, including pending amounts and payment records.
   - Users can record payments and view recent payment history.

5. **Reports and Exports**:
   - Generate various reports and export data to PDF or Excel formats via buttons integrated into the dashboard.

## Features

- User-friendly interface built with modern web technologies (HTML, CSS, JavaScript).
- User authentication for secure access.
- Dynamic management of room and owner information.
- Viewing and managing payment statuses.
- Real-time updates and insights into room rental statistics.
- Export capabilities for generating reports in PDF and Excel formats.

## Dependencies

The project utilizes the following dependencies as defined through CDN links in `index.html`:

- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Font Awesome**: An icon library for scalable vector icons.
- **jsPDF**: A library for generating PDF documents in JavaScript.
- **SheetJS (xlsx)**: A library to handle Excel files.

## Project Structure

```plaintext
.
├── index.html         # The main HTML file for the application
├── app.js             # The JavaScript file containing the application logic
├── styles.css         # Custom styles for the application
```

- **index.html**: The central file that implements the UI and links to the required libraries and scripts.
- **app.js**: Contains the core functionality of the Room Rent Management System, including user management, room management, and payment processing logic.
- **styles.css**: Provides additional styling to enhance the user experience and ensure proper presentation of content.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```