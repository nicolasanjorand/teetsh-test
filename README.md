# Welcome to Teetsh Technical Test!

A modern React project built for the Teetsh technical test, implementing a dynamic and responsive programming visualization tool.

## Features

- ⚛️ Built with React and TypeScript
- 📊 Dynamic table visualization
- 🔄 Row/Column inversion functionality
- 📱 Fully responsive design
- ♿ Accessible UI
- 🛠️ Well-structured, maintainable, and tested code

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t teetsh-app .

# Run the container
docker run -p 3000:3000 teetsh-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, make sure to deploy the output of `npm run build`.

```
├── package.json
├── package-lock.json
├── build/
│   ├── assets/    # Static assets
│   └── index.html # Main entry point
```

## Testing

Run unit tests with Vitest:

```bash
npm run test
```

## Presentation Guidelines

At the end of the test, prepare a short presentation covering:

1. **Technical choices & justifications**
2. **Integration in a larger architecture**
3. **Adaptations for different types of teachers**
4. **Future improvements**

---

Built with ❤️ for Teetsh!
