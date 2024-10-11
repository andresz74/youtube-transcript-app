# YouTube Transcript Fetcher

YouTube Transcript Fetcher is a React-based web application that allows users to fetch and copy YouTube video transcripts. It provides two modes: a simple transcript and a detailed transcript with more video metadata.

## Features

- Fetch the transcript for a YouTube video by entering its URL.
- Choose between a simple transcript (just text) or a detailed transcript (includes timing and video information).
- View the fetched transcript in a textarea.
- Copy the transcript to the clipboard using the copy button (button is disabled when there's no transcript).

## Tech Stack

- **Frontend**: ReactJS (with TypeScript)
- **State Management**: Redux, Redux-Saga
- **Backend**: Express with `ytdl-core` and `youtube-captions-scraper`
- **Clipboard API**: For copying the transcript content.

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- Yarn (or npm)
- A running instance of the backend service to fetch YouTube transcripts. [See backend setup instructions below].

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/andresz74/youtube-transcript-app.git
   cd youtube-transcript-fetcher
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

To set up the backend:

1. **Clone the backend repository**
    ```
    git clone https://github.com/andresz74/youtube-transcript-generator
    cd youtube-transcript-generator
    ```
2. **Install required packages**:
   ```bash
   yarn
   ```
3. **Run the backend server** on port `3004`.
    ```
    yarn start
    ```

### Usage

1. Enter the **YouTube URL** of a video.
2. Toggle the **"Detailed Transcript"** checkbox if you want a detailed transcript (default is a simple transcript).
3. Click the **"Fetch Transcript"** button to retrieve the transcript.
4. The transcript will be displayed in the text area.
5. Click the **"Copy"** button to copy the transcript to your clipboard (the button is disabled if no transcript is available).

### Available Scripts

- **`yarn start`**: Runs the app in development mode.
- **`yarn build`**: Builds the app for production.
- **`yarn test`**: Runs the test suite (if tests are added).
- **`yarn lint`**: Lints the code for style and errors.

### Future Enhancements

- Add pagination for large transcripts.
- Implement different language support for fetching captions.
- Improve UI/UX with more detailed video information and error handling.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.