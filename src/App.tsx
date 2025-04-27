import { Copy } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { fetchTranscript, fetchingTranscript, resetTranscript } from "./actions";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./components/ui/accordion";

const App: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isDetailed, setIsDetailed] = useState(false);
  const dispatch = useAppDispatch();
  const transcriptData = useAppSelector(
    (state) => state.transcript.transcriptData
  );
  const lastFetchedUrl = useAppSelector(
    (state) => state.transcript.lastFetchedUrl
  );
  const error = useAppSelector((state) => state.transcript.error);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(""); // State to track selected language
  const isFetching = useAppSelector(
    (state: any) => state.transcript?.loading
  );

  useEffect(() => {
    setShowDetailed(false);
    if (transcriptData || error) {
      console.log("Transcript Data:", transcriptData); // Verify the response
      setLoading(false);
    }
  }, [transcriptData, error]);

  const handleSubmit = () => {
    if (url === lastFetchedUrl) {
      console.log("Transcript already fetched for this URL. Skipping fetch.");
      alert("Transcript is already fetched for this URL.");
      return;
    }

    if (transcriptData) {
      dispatch(resetTranscript());
    }

    setLoading(true);
    dispatch(fetchTranscript(url, isDetailed));
  };

  const handleCopy = async () => {
    if (transcriptData) {
      try {
        await navigator.clipboard.writeText(
          `${transcriptData.title}\n\n${transcriptData.transcript}`
        );
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  const getPublishDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Handle language change
  interface LanguageChangeEvent extends React.ChangeEvent<HTMLSelectElement> {}
  interface Language {
    code: string;
    name: string;
  }
  const handleLanguageChange = (e: LanguageChangeEvent): void => {
    setSelectedLanguage(e.target.value);
    dispatch(fetchingTranscript());
    dispatch(fetchTranscript(url, isDetailed, e.target.value));
  };

  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <Card className="w-[480px]">
        <CardHeader>
          <CardTitle>YouTube Transcript Fetcher</CardTitle>
          <CardDescription>
            Fetch and copy YouTube video transcripts. Choose between a simple or
            detailed transcript.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row space-x-1.5">
              <div className="flex-1">
                <Input
                  type="text"
                  id="yturl"
                  placeholder="Enter YouTube URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="flex">
                <Button
                  className="w-32"
                  variant="default"
                  onClick={handleSubmit}
                  disabled={loading || !url.trim()}
                >
                  {loading ? "Fetching..." : "Get Transcript"}
                </Button>
              </div>
            </div>
            {error && (
              <div className="flex" style={{ color: "red" }}>
                {error}
              </div>
            )}
            {showDetailed && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isDetailed"
                  checked={isDetailed}
                  onChange={() => setIsDetailed(!isDetailed)}
                />
                <Label htmlFor="isDetailed">Detailed Transcript</Label>
              </div>
            )}
            <div className="flex flex-col space-y-1.5 items-center"></div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {transcriptData && (
              <div className="mt-4">
                <Card className="">
                  <div className="p-2">
                    <img
                      className="rounded-sm"
                      src={transcriptData.videoInfoSummary.thumbnails[4].url}
                      alt=""
                    />
                  </div>
                  <div className="p-2 text-sm font-bold">
                    {transcriptData.title}
                  </div>
                  <Accordion>
                    <AccordionItem>
                      <AccordionHeader>Video Info Summary</AccordionHeader>
                      <AccordionContent>
                        <CardContent className="max-h-[320px] text-xs overflow-auto">
                          <div className="flex flex-col space-y-2">
                            <div>
                              <strong>Title:</strong> {transcriptData.title}
                            </div>
                            <div>
                              <strong>Author:</strong>{" "}
                              <a
                                className="border-b-neutral-950 border-b-2 text-blue-950"
                                href={
                                  transcriptData.videoInfoSummary.author
                                    .user_url
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                {transcriptData.videoInfoSummary.author.user}
                              </a>
                            </div>
                            <div>
                              <strong>Publish date:</strong>{" "}
                              {getPublishDate(
                                transcriptData.videoInfoSummary.publishDate
                              )}
                            </div>
                            <div>
                              <strong>View Count:</strong>{" "}
                              {transcriptData.videoInfoSummary.viewCount}
                            </div>
                            <div>
                              <iframe
                                className="w-full aspect-video"
                                src={
                                  transcriptData.videoInfoSummary.embed
                                    .iframeUrl
                                }
                                frameBorder="0"
                                title="video-info-iframe"
                              ></iframe>
                            </div>
                            <div>
                              <strong>Description:</strong>{" "}
                              {transcriptData.videoInfoSummary.description}
                            </div>
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem open>
                      <AccordionHeader>Video Transcript</AccordionHeader>
                      <AccordionContent>
                        <CardContent className="max-h-[320px] text-xs overflow-auto">
                          <div className="flex flex-col mb-2">
                            <select
                              id="language-select"
                              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                              value={
                                transcriptData.transcriptLanguageCode ||
                                selectedLanguage
                              }
                              onChange={handleLanguageChange}
                            >
                              {transcriptData.languages.map(
                                (
                                  lang: Language,
                                  index: number
                                ): JSX.Element => (
                                  <option key={index} value={lang.code}>
                                    {lang.name}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="">
                            {!isFetching
                              ? transcriptData.transcript
                              : "Loading"}
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
