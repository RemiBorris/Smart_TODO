# Smart TODO

## Description
Smart TODO is a task management application that uses various APIs to auto-categorize tasks into different sections of books, movies, products, restaurants, and others. Users can check off completed tasks and manually re-categorize them if needed.

## Features
- Automatically categorizes tasks using APIs
- Allows manual re-categorization of tasks
- Check off completed tasks to track progress
- Delete no longer needed tasks
- Add task description details

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo
   ```
3. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following API keys after signing up for free API access:
     ```env
     YELP_API_KEY=''
     AMAZON_API_KEY=''
     GOOGLE_API_KEY=''
     MoviesApiKey=''
     ```

## Usage
To start the app, run:
```bash
npm start
```

## Technologies Used
- Node.js – JavaScript runtime environment
- Express – Web framework for Node.js
- PostgreSQL (pg) – Database client for PostgreSQL
- EJS – Templating engine for rendering HTML
- SASS – CSS preprocessor for styling
- Axios – HTTP client for making API requests
- Bcrypt & BcryptJS – Password hashing libraries
- Morgan – HTTP request logger middleware
- Dotenv – Environment variable management
- Nodemon – Development tool for auto-restarting the server
- Chalk – Terminal string styling library

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
No current license.

## Contact
For any questions, contact: [GitHub - remiborris](https://github.com/remiborris)
