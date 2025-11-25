import React, { useState, useRef, useCallback } from 'react';
import { RecordingState } from '../types';
import { transcribeAudio, blobToBase64 } from '../services/geminiService';
import AudioVisualizer from './AudioVisualizer';
import { MicIcon, StopIcon, LoaderIcon, CheckCircleIcon } from './Icons';

const DemoSection: React.FC = () => {
  const [state, setState] = useState<RecordingState>(RecordingState.IDLE);
  const [transcription, setTranscription] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(mediaStream);
      
      const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        
        // Stop all tracks
        mediaStream.getTracks().forEach(track => track.stop());
        setStream(null);
        
        await handleTranscription(audioBlob);
      };

      mediaRecorder.start();
      setState(RecordingState.RECORDING);
      setTranscription(''); 

    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Please ensure permissions are granted.");
      setState(RecordingState.ERROR);
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state === RecordingState.RECORDING) {
      mediaRecorderRef.current.stop();
      setState(RecordingState.PROCESSING);
    }
  }, [state]);

  const handleTranscription = async (audioBlob: Blob) => {
    try {
      const base64Audio = await blobToBase64(audioBlob);
      const result = await transcribeAudio(base64Audio);
      setTranscription(result);
      setState(RecordingState.COMPLETED);
    } catch (error) {
      console.error(error);
      setTranscription("Error processing audio. Please try again.");
      setState(RecordingState.ERROR);
    }
  };

  return (
    <section className="min-h-screen pt-28 pb-20 relative overflow-hidden flex flex-col justify-center">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative z-10 animate-fade-in-up">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold mb-6 animate-pulse">
            ● Live Playground
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Speak. Process. <span className="text-blue-500">Transcribe.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Test our model right here in the browser. Speak naturally in Khmer and watch the magic happen powered by Gemini 2.5.
          </p>
        </div>

        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 md:p-10 shadow-2xl">
          
          <div className="mb-10">
             <AudioVisualizer stream={stream} isRecording={state === RecordingState.RECORDING} />
          </div>

          <div className="flex flex-col items-center justify-center space-y-10">
            {/* Controls */}
            <div className="flex items-center gap-6">
              {state === RecordingState.RECORDING ? (
                <button 
                  onClick={stopRecording}
                  className="group relative flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500 hover:bg-red-500/20 transition-all duration-300 shadow-[0_0_40px_rgba(239,68,68,0.3)]"
                >
                  <StopIcon className="w-10 h-10 text-red-500 fill-current" />
                  <span className="absolute -bottom-10 text-sm text-red-400 font-bold tracking-wider">STOP RECORDING</span>
                  <span className="absolute w-full h-full rounded-full border border-red-500 animate-ping opacity-75"></span>
                </button>
              ) : (
                <button 
                  onClick={startRecording}
                  disabled={state === RecordingState.PROCESSING}
                  className={`group relative flex items-center justify-center w-24 h-24 rounded-full border-2 transition-all duration-300 
                    ${state === RecordingState.PROCESSING 
                      ? 'bg-slate-800 border-slate-700 cursor-not-allowed' 
                      : 'bg-blue-600 border-blue-400 hover:bg-blue-500 hover:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.4)]'}`}
                >
                  {state === RecordingState.PROCESSING ? (
                    <LoaderIcon className="w-10 h-10 text-white" />
                  ) : (
                    <MicIcon className="w-10 h-10 text-white" />
                  )}
                  <span className="absolute -bottom-10 text-sm text-blue-400 font-bold tracking-wider">
                    {state === RecordingState.PROCESSING ? 'PROCESSING...' : 'TAP TO SPEAK'}
                  </span>
                </button>
              )}
            </div>

            {/* Output Area */}
            <div className="w-full relative min-h-[200px] bg-slate-950/60 rounded-2xl p-8 border border-slate-800 shadow-inner">
              <div className="absolute top-4 left-4 flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
              </div>
              
              <div className="mt-4 text-center h-full flex items-center justify-center">
                 {!transcription && state !== RecordingState.PROCESSING && (
                    <span className="text-slate-600 italic text-lg">"Press the mic and say something in Khmer..."</span>
                 )}
                 
                 {state === RecordingState.PROCESSING && (
                    <div className="flex flex-col items-center">
                      <span className="text-blue-400 animate-pulse text-lg mb-2">Analyzing audio spectrum...</span>
                      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 animate-[shine_1s_infinite]"></div>
                      </div>
                    </div>
                 )}

                 {transcription && (
                   <div className="w-full text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                     <p className="text-2xl md:text-3xl text-slate-100 font-khmer leading-relaxed text-center">
                       {transcription}
                     </p>
                     <div className="mt-8 flex justify-center">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20">
                          <CheckCircleIcon className="w-4 h-4 mr-2" /> High Confidence Score
                        </span>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DemoSection;