
import { useState, useEffect, useCallback } from "react";

interface SpeechRecognitionHook {
  text: string;
  isListening: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetText: () => void;
  hasRecognitionSupport: boolean;
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Browser detection for SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = "en-US";
        
        setRecognition(recognitionInstance);
        setHasRecognitionSupport(true);
      } else {
        setHasRecognitionSupport(false);
        setError("Speech recognition is not supported in this browser.");
      }
    }
    
    // Cleanup
    return () => {
      if (recognition) {
        recognition.onresult = null;
        recognition.onend = null;
        recognition.onerror = null;
        stopListening();
      }
    };
  }, []);

  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join("");
      
      setText(transcript);
    };

    const handleEnd = () => {
      setIsListening(false);
    };

    const handleError = (event: any) => {
      setError(`Error occurred in recognition: ${event.error}`);
      setIsListening(false);
    };

    recognition.onresult = handleResult;
    recognition.onend = handleEnd;
    recognition.onerror = handleError;
  }, [recognition]);

  const startListening = useCallback(() => {
    setText("");
    setError(null);
    
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        console.error("Error starting speech recognition:", err);
        setError("Error starting speech recognition.");
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListening]);

  const resetText = useCallback(() => {
    setText("");
  }, []);

  return {
    text,
    isListening,
    error,
    startListening,
    stopListening,
    resetText,
    hasRecognitionSupport
  };
};

export default useSpeechRecognition;
