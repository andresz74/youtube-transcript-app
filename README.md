# YouTube Transcript Fetcher

YouTube Transcript Fetcher is a React-based web application that allows users to fetch and copy YouTube video transcripts. It provides two modes: a simple transcript and a detailed transcript with more video metadata.

![YouTube Transcript Fetcher](https://objects-us-east-1.dream.io/az-assets/youtube-transcript.png "YouTube Transcript Fetcher")

## Features

- Fetch the transcript for a YouTube video by entering its URL.
- View the fetched transcript in a clean card layout using **shadcn/ui** components.
- Copy the transcript to the clipboard using the **copy button** (button is disabled when there's no transcript or during fetching).

## Tech Stack

- **Frontend**: ReactJS (with TypeScript)
- **UI Components**: [`shadcn/ui`](https://ui.shadcn.com) for modern, accessible, and customizable components.
- **State Management**: Redux, Redux-Saga
- **Backend**: Express with `ytdl-core` and `youtube-captions-scraper`
- **Clipboard API**: For copying the transcript content.
- **Styling**: Tailwind CSS, integrated with `shadcn/ui` for component styling.

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- Yarn (or npm)
- A running instance of the backend service to fetch YouTube transcripts. [See backend setup instructions below].

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/andresz74/youtube-transcript-app.git
   cd youtube-transcript-app
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Configure the API URL**:
   Create a `config.ts` file in the `src` folder with the following content:
   ```ts
   const config = {
     apiBaseUrl: 'http://your-backend-ip:3004', // Update with your backend server URL
   };

   export default config;
   ```

4. **Start the React app**:
   ```bash
   yarn start
   ```

   The app will be running on `http://localhost:3000`.

### Backend Setup

The backend service is responsible for fetching the transcript from YouTube using `ytdl-core` and `youtube-captions-scraper`.

![Backend Service](https://objects-us-east-1.dream.io/az-assets/youtube-transcript-generator.png "YouTube Transcript Generator")

To set up the backend:

1. **Clone the backend repository**:
    ```bash
    git clone https://github.com/andresz74/youtube-transcript-generator.git
    cd youtube-transcript-generator
    ```

2. **Install required packages**:
   ```bash
   yarn install
   ```

3. **Run the backend server** on port `3004`:
    ```bash
    yarn start
    ```

### Usage

1. Enter the **YouTube URL** of a video.
2. Click the **"Fetch Transcript"** button to retrieve the transcript. The button will be disabled while fetching.
3. The transcript will be displayed in a **card layout** using `shadcn/ui` components.
4. Click the **"Copy"** button to copy the transcript to your clipboard (disabled if no transcript is available).

### Available Scripts

- **`yarn start`**: Runs the app in development mode.
- **`yarn build`**: Builds the app for production.
- **`yarn test`**: Runs the test suite (if tests are added).
- **`yarn lint`**: Lints the code for style and errors.

### Integrating `shadcn/ui`

This app leverages the [`shadcn/ui`](https://ui.shadcn.com) component library for a modern and consistent UI experience. The following components are used:

- **`Card`**: To display individual transcript entries and content.
- **`Button`**: For actions like fetching and copying the transcript.
- **`Input`**: For entering the YouTube URL.
- **`Checkbox`**: To toggle between simple and detailed transcripts.
- **`Label`**: For form elements to improve accessibility.

To explore more about `shadcn/ui`, visit the [official documentation](https://ui.shadcn.com/docs).

### Future Enhancements

- Add pagination for large transcripts.
- Implement different language support for fetching captions.
- Improve UI/UX with more detailed video information and error handling.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
