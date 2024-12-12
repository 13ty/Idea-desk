import { configureStore } from '@reduxjs/toolkit'
import ideaReducer from './ideaSlice'
import segmentReducer from './segmentSlice'
import historyReducer from './historySlice'
import llmConfigReducer from './llmConfigSlice'
import conversationReducer from './conversationSlice'

export const store = configureStore({
  reducer: {
    idea: ideaReducer,
    segments: segmentReducer,
    history: historyReducer,
    llmConfig: llmConfigReducer,
    conversation: conversationReducer
  }
})
