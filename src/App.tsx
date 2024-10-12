import { Copy } from "lucide-react"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from './hooks'; // Import typed hooks
import { fetchTranscript } from './actions';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isDetailed, setIsDetailed] = useState(false);
  const dispatch = useAppDispatch(); // Typed dispatch hook
  const transcriptData = useAppSelector((state) => state.transcript.transcriptData); // Typed selector hook
  const error = useAppSelector((state) => state.transcript.error); // Typed selector hook
  const [isCopied, setIsCopied] = useState(false); // State to manage the copy status
  const [loading, setLoading] = useState(false); // Track loading state

  // Reset loading state when transcript data or error is received
  useEffect(() => {
    if (transcriptData || error) {
      setLoading(false);
    }
  }, [transcriptData, error]);

  const handleSubmit = () => {
    setLoading(true); // Set loading to true when request starts
    dispatch(fetchTranscript(url, isDetailed));
  };

  const handleCopy = async () => {
    if (transcriptData) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(transcriptData, null, 2)); // Copy to clipboard
        setIsCopied(true); // Set copied status to true
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <Card className="w-[480px]">
        <CardHeader>
          <CardTitle>YouTube Transcript Fetcher</CardTitle>
          <CardDescription>YouTube Transcript Fetcher is an application that allows users to fetch and copy YouTube video transcripts. It provides two modes: a simple transcript and a detailed transcript with more video metadata.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor='yturl'>YouTube URL</Label>
              <Input type="text" id="yturl" placeholder="Enter YouTube URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="isDetailed" checked={isDetailed} onChange={() => setIsDetailed(!isDetailed)} />
              <Label htmlFor="isDetailed">Detailed Transcript</Label>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Button variant="default" size="default" onClick={handleSubmit} disabled={loading || !url.trim()}>
                {loading ? 'Fetching...' : 'Fetch Transcript'}
              </Button>
            </div>

            <div className="flex flex-col space-y-1.5">
              {error ? (
                <p style={{ color: 'red' }}>{error}</p>
              ) : (
                <>
                  <Label htmlFor="yttranscript">Transcript Result</Label>
                  <Textarea className="min-h-[200px] font-small" id='yttranscript' value={transcriptData ? JSON.stringify(transcriptData, null, 2) : ''} readOnly />
                </>
              )}
              <Button variant="outline" size="icon" onClick={handleCopy} disabled={!transcriptData}>
                <Copy className="h-4 w-4" />
              </Button>
              {isCopied ? 'Copied!' : null}
            </div>
          </div>
        </CardContent>
        {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
      </Card>
    </div>
  );
};

export default App;
