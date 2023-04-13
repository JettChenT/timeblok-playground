import { create } from 'zustand'
import { InitialViewOptions } from './Calendar';
import Examples from "./examples.json"
import { MutableRefObject, forwardRef } from 'react';
import FullCalendar from '@fullcalendar/react';

export interface TimeBlokState {
    leftText: string;
    rightText: string;
    shouldAutoCompile: boolean;
    viewOnly: boolean;
    debug: boolean;
    shareButtonText: string;
    selectedExampleIndex: number;
    view: InitialViewOptions;
    setLeftText: (leftText: string) => void;
    setRightText: (rightText: string) => void;
    setShouldAutoCompile: (shouldAutoCompile: boolean) => void;
    setViewOnly: (viewOnly: boolean) => void;
    setDebug: (debug: boolean) => void;
    setShareButtonText: (shareButtonText: string) => void;
    setSelectedExampleIndex: (selectedExampleIndex: number) => void;
    setView: (view: InitialViewOptions) => void;
}

export const useTimeBlokStore = create<TimeBlokState>((set) => ({
    leftText: Examples[1].content,
    rightText: "",
    shouldAutoCompile: true,
    viewOnly: window.location.hash ? true : false,
    debug: false,
    shareButtonText: "Share",
    selectedExampleIndex: window.location.hash ? 0 : 1,
    view: Examples[1].view as InitialViewOptions,
    setLeftText: (leftText: string) => set({ leftText }),
    setRightText: (rightText: string) => set({ rightText }),
    setShouldAutoCompile: (shouldAutoCompile: boolean) => set({ shouldAutoCompile }),
    setViewOnly: (viewOnly: boolean) => set({ viewOnly }),
    setDebug: (debug: boolean) => set({ debug }),
    setShareButtonText: (shareButtonText: string) => set({ shareButtonText }),
    setSelectedExampleIndex: (selectedExampleIndex: number) => set({ selectedExampleIndex }),
    setView: (view: InitialViewOptions) => set({ view }),
}))

