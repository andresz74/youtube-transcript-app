import { Copy } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchTranscript } from "./actions";

const App: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isDetailed, setIsDetailed] = useState(false);
  const dispatch = useAppDispatch();
  const transcriptData = useAppSelector(
    (state) => state.transcript.transcriptData
  );
  const error = useAppSelector((state) => state.transcript.error);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transcriptData || error) {
      console.log("Transcript Data:", transcriptData); // Verify the response
      setLoading(false);
    }
  }, [transcriptData, error]);

  const handleSubmit = () => {
    setLoading(true);
    dispatch(fetchTranscript(url, isDetailed));
  };

  const handleCopy = async () => {
    if (transcriptData) {
      try {
        await navigator.clipboard.writeText(transcriptData.transcript);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <Card className="w-[480px]">
        <CardHeader>
          <CardTitle>YouTube Transcript Fetcher</CardTitle>
          <p>
            Fetch and copy YouTube video transcripts. Choose between a simple or
            detailed transcript.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="yturl">YouTube URL</Label>
              <Input
                type="text"
                id="yturl"
                placeholder="Enter YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDetailed"
                checked={isDetailed}
                onChange={() => setIsDetailed(!isDetailed)}
              />
              <Label htmlFor="isDetailed">Detailed Transcript</Label>
            </div>

            <Button
              variant="default"
              size="default"
              onClick={handleSubmit}
              disabled={loading || !url.trim()}
            >
              {loading ? "Fetching..." : "Fetch Transcript"}
            </Button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {transcriptData && (
              <div className="mt-4">
                <Card className="">
                <div className="p-2 pb-4 text-md">Transcript</div>
                  <CardContent className="max-h-[400px] text-xs font-small overflow-auto">
                    <div className="">{transcriptData.transcript}</div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopy}
                      disabled={!transcriptData}
                      className="mt-4"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    {isCopied && <p>Copied!</p>}
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
