# Social Media API

Welcome to the Social Media API documentation! This API allows users to create, retrieve, update, and delete thoughts, users, and reactions, as well as manage friend relationships.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Thoughts](#thoughts)
  - [Reactions](#reactions)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository: `git clone https://github.com/EAnthonycarranza/social-media-api.git`
2. Navigate to the project folder: `cd social-media-api`
3. Install dependencies: `npm install express mongoose body-parser moment`

## Usage

### Starting the Server

To start the server, run the following command in your terminal:

```bash
npm start
```

## API Endpoints

### Users

- `GET /api/users`: Get a list of all users.
- `GET /api/users/:id`: Get a single user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update a user by ID.
- `DELETE /api/users/:id`: Delete a user by ID.

### Thoughts

- `GET /api/thoughts`: Get a list of all thoughts.
- `GET /api/thoughts/:id`: Get a single thought by ID.
- `POST /api/thoughts`: Create a new thought.
- `PUT /api/thoughts/:id`: Update a thought by ID.
- `DELETE /api/thoughts/:id`: Delete a thought by ID.

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

## Demo

Check out our API demo video to see the Social Media API in action. The video demonstrates each CRUD operation, friend management, and reaction handling.

[Watch the Demo Video](https://youtu.be/HVc1zJpcKns)

## Contributing

We welcome contributions from the community! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
