import { create } from 'zustand'
import { InitialViewOptions } from './Calendar';
import Examples from "./examples.json"
import { MutableRefObject, forwardRef } from 'react';
import FullCalendar from '@fullcalendar/react';

export interface ChatHistoryEntry {
    role: string;
    content: string;
    parsed: string | null;
}

export interface TimeBlokState {
    leftText: string;
    rightText: string;
    shouldAutoCompile: boolean;
    viewOnly: boolean;
    debug: boolean;
    shareButtonText: string;
    selectedExampleIndex: number;
    view: InitialViewOptions;
    chatHistory: ChatHistoryEntry[];
    access_key: string;
    openai_key: string;
    setLeftText: (leftText: string) => void;
    setRightText: (rightText: string) => void;
    setShouldAutoCompile: (shouldAutoCompile: boolean) => void;
    setViewOnly: (viewOnly: boolean) => void;
    setDebug: (debug: boolean) => void;
    setShareButtonText: (shareButtonText: string) => void;
    setSelectedExampleIndex: (selectedExampleIndex: number) => void;
    setView: (view: InitialViewOptions) => void;
    addChatEntry: (entry: ChatHistoryEntry) => void;
    set_access_key: (access_key: string) => void;
    set_openai_key: (openai_key: string) => void;
}

export const useTimeBlokStore = create<TimeBlokState>((set) => {
    const access_key = localStorage.getItem('ACCESS_KEY');
    const openai_key = localStorage.getItem('OPENAI_KEY');
    return {
        leftText: Examples[1].content,
        rightText: "",
        shouldAutoCompile: true,
        viewOnly: window.location.hash ? true : false,
        debug: false,
        shareButtonText: "Share",
        selectedExampleIndex: window.location.hash ? 0 : 1,
        view: Examples[1].view as InitialViewOptions,
        chatHistory: [],
        access_key: localStorage.getItem('ACCESS_KEY') || '',
        openai_key: localStorage.getItem('OPENAI_KEY') || '',
        setLeftText: (leftText: string) => set({ leftText }),
        setRightText: (rightText: string) => set({ rightText }),
        setShouldAutoCompile: (shouldAutoCompile: boolean) => set({ shouldAutoCompile }),
        setViewOnly: (viewOnly: boolean) => set({ viewOnly }),
        setDebug: (debug: boolean) => set({ debug }),
        setShareButtonText: (shareButtonText: string) => set({ shareButtonText }),
        setSelectedExampleIndex: (selectedExampleIndex: number) => set({ selectedExampleIndex }),
        setView: (view: InitialViewOptions) => set({ view }),
        addChatEntry: (entry: ChatHistoryEntry) => set((state) => ({ chatHistory: [...state.chatHistory, entry] })),
        set_access_key: (access_key: string) => {
            localStorage.setItem('ACCESS_KEY', access_key || '');
            set({ access_key });
        },
        set_openai_key: (openai_key: string) => {
            localStorage.setItem('OPENAI_KEY', openai_key || '');
            set({ openai_key });
        },
    };
});



