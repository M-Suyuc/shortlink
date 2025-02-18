# Shortlink ✨

Shortlink is a simple URL shortening service that allows you to create short, easy-to-remember links from long URLs.

## Technologies Used

- **Nextjs**: Programming language for building the application.
- **Prisma**: ORM with an intuitive data model, automated migrations, type-safety, and auto-completion.
- **Turso**: Database for storing URL data.
- **Authjs**: Authentication.
- **Tailwind CSS**: CSS framework for responsive design.

## Features

- Shorten long URLs
- Customizable short URLs
- User authentication and authorization
- Shorten long URLss
- Customizable short links
- Easy to use API
  <!-- - Analytics for link clicks -->
  <!-- - Track click statistics -->

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/shortlink.git
```

2. Navigate to the project directory:

```bash
cd shortlink
```

3. Create a copy `.env.template` and rename to `.env`

4. Set up environment variables:

5. Install dependencies:

```sh
npm install
```

6. Run Prisma's Mirations

```sh
npx prisma migrate dev
```

7. Run proyect

```sh
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5000`.
2. Register or log in to your account.
3. Enter the long URL you want to shorten.
4. Click the "Shorten" button to generate a short URL.
5. Share the short URL with others.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature-name
```

3. Make your changes and commit them:

```bash
git commit -m 'Add some feature'
```

4. Push to the branch:

```bash
git push origin feature-name
```

5. Open a pull request.
