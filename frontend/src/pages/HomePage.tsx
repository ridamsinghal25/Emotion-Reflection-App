import type React from "react";

import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Loader2, Brain, Heart, Bot } from "lucide-react";
import { useAxiosFetcher } from "../hooks/use-fetch";

export default function HomePage() {
  const [text, setText] = useState("");
  const emotionResultRef = useRef<HTMLDivElement>(null);

  const {
    fn: generateEmotion,
    data: emotion,
    setData: setEmotion,
    loading: isLoading,
    error,
    setError,
  } = useAxiosFetcher();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }
    setError(null);
    setEmotion(null);

    await generateEmotion("/emotion/create-emotion", {
      method: "POST",
      data: { user_emotion: text },
    });

    setText("");

    emotionResultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetForm = () => {
    setText("");
    setEmotion(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Emotion Analyzer
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze the emotional tone of your text using advanced sentiment
            analysis. Enter your text below and discover the underlying
            emotions.
          </p>
        </div>

        {/* Input Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Text Analysis
            </CardTitle>
            <CardDescription>
              Enter the text you'd like to analyze for emotional content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-input">Your Text</Label>
                <Textarea
                  id="text-input"
                  placeholder="Enter your text here... (e.g., 'I'm feeling really excited about this new project!')"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[120px] resize-none"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isLoading || !text.trim()}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Emotion"
                  )}
                </Button>

                {emotion && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={isLoading}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {emotion && (
          <Card className="shadow-lg" ref={emotionResultRef}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-indigo-600" />
                AI Analysis Results
              </CardTitle>
              <CardDescription>Emotional analysis of your text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Emotion */}
              <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 capitalize">
                    {emotion.emotion}
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-2">
                  Confidence (AI Estimated):{" "}
                  {Math.round(emotion.confidence * 100)}%
                </p>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  {emotion.analysis}
                </p>
                <p className="text-gray-500 italic text-sm mt-3">
                  *This analysis is generated by AI to explain why it assigned
                  the detected emotion and confidence level.*
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
