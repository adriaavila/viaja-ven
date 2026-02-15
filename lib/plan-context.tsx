'use client';

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useCallback,
    type ReactNode,
} from 'react';
import type { PlanState, PlanAction, Experience } from '@/lib/types';

const STORAGE_KEY = 'colonia-tovar-plan';

const initialState: PlanState = {
    selections: {
        date: null,
        timeOfDay: null,
        groupSize: 2,
        interests: [],
        budget: null,
        pace: null,
    },
    selectedExperiences: [],
    itinerary: null,
    savedAt: null,
};

function planReducer(state: PlanState, action: PlanAction): PlanState {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                selections: { ...state.selections, date: action.payload },
            };
        case 'SET_TIME_OF_DAY':
            return {
                ...state,
                selections: { ...state.selections, timeOfDay: action.payload },
            };
        case 'SET_GROUP_SIZE':
            return {
                ...state,
                selections: { ...state.selections, groupSize: action.payload },
            };
        case 'TOGGLE_INTEREST': {
            const interests = state.selections.interests.includes(action.payload)
                ? state.selections.interests.filter((i) => i !== action.payload)
                : [...state.selections.interests, action.payload];
            return {
                ...state,
                selections: { ...state.selections, interests },
            };
        }
        case 'SET_BUDGET':
            return {
                ...state,
                selections: { ...state.selections, budget: action.payload },
            };
        case 'SET_PACE':
            return {
                ...state,
                selections: { ...state.selections, pace: action.payload },
            };
        case 'ADD_EXPERIENCE':
            if (state.selectedExperiences.find((e) => e.id === action.payload.id)) {
                return state;
            }
            return {
                ...state,
                selectedExperiences: [...state.selectedExperiences, action.payload],
            };
        case 'REMOVE_EXPERIENCE':
            return {
                ...state,
                selectedExperiences: state.selectedExperiences.filter(
                    (e) => e.id !== action.payload
                ),
            };
        case 'SET_ITINERARY':
            return {
                ...state,
                itinerary: action.payload,
                savedAt: new Date().toISOString(),
            };
        case 'CLEAR_PLAN':
            return initialState;
        default:
            return state;
    }
}

interface PlanContextValue {
    state: PlanState;
    dispatch: React.Dispatch<PlanAction>;
    addExperience: (experience: Experience) => void;
    removeExperience: (id: string) => void;
    isInPlan: (id: string) => boolean;
    experienceCount: number;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(planReducer, initialState, (initial) => {
        if (typeof window === 'undefined') return initial;
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : initial;
        } catch {
            return initial;
        }
    });

    // Persist to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // silent fail
        }
    }, [state]);

    const addExperience = useCallback(
        (experience: Experience) => dispatch({ type: 'ADD_EXPERIENCE', payload: experience }),
        []
    );

    const removeExperience = useCallback(
        (id: string) => dispatch({ type: 'REMOVE_EXPERIENCE', payload: id }),
        []
    );

    const isInPlan = useCallback(
        (id: string) => state.selectedExperiences.some((e) => e.id === id),
        [state.selectedExperiences]
    );

    return (
        <PlanContext.Provider
            value={{
                state,
                dispatch,
                addExperience,
                removeExperience,
                isInPlan,
                experienceCount: state.selectedExperiences.length,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const ctx = useContext(PlanContext);
    if (!ctx) throw new Error('usePlan must be used within PlanProvider');
    return ctx;
}
