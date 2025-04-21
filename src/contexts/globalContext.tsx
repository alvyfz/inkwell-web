'use client'

import React, { ActionDispatch, createContext, ReactNode, useContext, useReducer } from 'react'

export type InitialStateType = {
  modal: {
    visible: boolean
    title?: string
    component: (onClose: () => void) => ReactNode | null
    onClose?: () => void
    hiddenClose?: boolean
    footer?: (onClose: () => void) => ReactNode
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
    placement?: 'center' | 'auto' | 'top' | 'top-center' | 'bottom' | 'bottom-center' | undefined
    classNames?: {
      modal?: string
      header?: string
      body?: string
      footer?: string
      backdrop?: string
      base?: string
      closeButton?: string
    }
  }
  newStory: {
    cover: string
    file: File | null
    searchTopic: string
    selectedTopics: any[]
    selectedTopicsIds: string[]
    title: string
    description: string
  }
}

export type GlobalContextType = [
  state: InitialStateType,
  setState: (key: string, value: any) => void,
  dispatch: ActionDispatch<[action: { type: ACTION; key: string; value: any }]>
]

const initialState: InitialStateType = {
  modal: {
    visible: false,
    title: '',
    component: () => null,
    onClose: () => {}
  },
  newStory: {
    file: null,
    cover: '',
    searchTopic: '',
    selectedTopics: [],
    selectedTopicsIds: [],
    title: '',
    description: ''
  }
}

enum ACTION {
  UPDATE = 'UPDATE'
}

function reducer(state: InitialStateType, action: { type: ACTION; key: string; value: any }) {
  if (action.type === ACTION.UPDATE) {
    return {
      ...state,
      [action.key]: action.value
    }
  }
  throw Error('Unknown action.')
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setState = (key: string, value: any) => {
    dispatch({ type: ACTION.UPDATE, key, value })
  }

  const value: GlobalContextType = [state, setState, dispatch]
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobalState = () => useContext(GlobalContext)
