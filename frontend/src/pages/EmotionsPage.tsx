"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Brain, Calendar, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAxiosFetcher } from "@/hooks/use-fetch";

interface Emotion {
  id: string;
  user_id: string;
  emotion: string;
  confidence: number;
  analysis: string;
  created_at: string;
}

export default function EmotionsPage() {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    fn: getEmotions,
    data: emotions,
    setData: setEmotions,
    loading: isLoading,
  } = useAxiosFetcher();

  const { fn: deleteEmotion } = useAxiosFetcher();

  // Fetch emotions on component mount
  useEffect(() => {
    async function fetchEmotions() {
      getEmotions("/emotion/get-emotions");
    }

    fetchEmotions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);

      const response = await deleteEmotion(`/emotion/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.success) return;

      // Remove the deleted emotion from the state
      setEmotions(emotions.filter((emotion: Emotion) => emotion.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <span className="ml-2 text-lg text-gray-600">
              Loading emotions...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              Emotion History
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage all previous emotion analyses
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Total: {emotions?.length}{" "}
            {emotions?.length === 1 ? "analysis" : "analyses"}
          </div>
        </div>

        {/* Emotions List */}
        {emotions?.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No emotions analyzed yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start by analyzing some text to see your emotion history here.
              </p>
              <Button asChild>
                <a href="/">Analyze Text</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {emotions?.map((emotion: Emotion) => (
              <Card
                key={emotion.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`${emotion.emotion} capitalize font-medium`}
                    >
                      {emotion.emotion}
                    </Badge>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={deletingId === emotion.id}
                        >
                          {deletingId === emotion.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Emotion Analysis
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this emotion
                            analysis? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex justify-end gap-2">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(emotion.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {formatDate(emotion.created_at)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Confidence
                      </span>
                      <span className="text-sm text-gray-600">
                        {Math.round(emotion.confidence * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${emotion.confidence * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-700 block mb-1">
                      Analysis
                    </span>
                    <p
                      className={`text-sm text-gray-600 ${
                        isExpanded ? "" : "line-clamp-3"
                      }`}
                    >
                      {emotion.analysis}
                    </p>
                    {!isExpanded ? (
                      <div className="flex justify-end">
                        <Button
                          onClick={() => setIsExpanded(true)}
                          variant="ghost"
                          className="text-gray-600"
                        >
                          Read More
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <Button
                          onClick={() => setIsExpanded(false)}
                          variant="ghost"
                          className="text-gray-600"
                        >
                          Read Less
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
