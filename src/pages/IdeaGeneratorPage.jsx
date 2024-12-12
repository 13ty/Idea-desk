import React, { useState, useEffect } from 'react'
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Tooltip
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import QueryInput from '../components/QueryInput'
import IdeaTile from '../components/IdeaTile'
import FinalIdeaSection from '../components/FinalIdeaSection'
import WordCountTracker from '../components/WordCountTracker'
import LLMConfigModal from '../components/LLMConfigModal'
import ConversationHistory from '../components/ConversationHistory'
import LLMService from '../services/llmService'
import ResponseParser from '../services/responseParser'
import { useDispatch, useSelector } from 'react-redux'
import { 
  startWordCountTracking, 
  updateWordCount 
} from '../store/llmConfigSlice'
import { 
  addConversationTurn,
  addProjectElement,
  updateCurrentProjectConcept,
  saveCurrentProjectConcept
} from '../store/conversationSlice'

function IdeaGeneratorPage() {
  const [generatedIdeas, setGeneratedIdeas] = useState([])
  const [configModalOpen, setConfigModalOpen] = useState(false)
  
  const dispatch = useDispatch()
  const llmConfig = useSelector(state => state.llmConfig)
  const currentProjectConcept = useSelector(
    state => state.conversation.currentProjectConcept
  )

  const handleGenerateIdeas = async (query) => {
    dispatch(startWordCountTracking())

    try {
      const llmService = new LLMService(llmConfig)
      
      // Construct context-aware prompt
      const contextPrompt = currentProjectConcept.elements.length > 0
        ? `Current project context: ${JSON.stringify(currentProjectConcept.elements)}\n`
        : ''
      
      const fullPrompt = `${contextPrompt}${llmConfig.prompts.mainPrompt}\n\nUser Query: ${query}`
      
      const response = await llmService.generateResponse(fullPrompt)
      
      // Parse response into ideas
      const ideas = ResponseParser.parseIdeaSegments(response)
      
      // Update word count
      dispatch(updateWordCount(response.split(/\s+/).length))
      
      // Save conversation turn
      dispatch(addConversationTurn({
        userPrompt: query,
        llmResponse: response
      }))
      
      // Update project name if not set
      if (!currentProjectConcept.name) {
        dispatch(updateCurrentProjectConcept({ 
          name: query.split(' ').slice(0, 3).join(' ') 
        }))
      }
      
      setGeneratedIdeas(ideas)
    } catch (error) {
      console.error('Failed to generate ideas', error)
      // TODO: Implement user-friendly error handling
    }
  }

  const handleAddProjectElement = (idea) => {
    dispatch(addProjectElement(idea))
  }

  const handleSaveProjectConcept = () => {
    dispatch(saveCurrentProjectConcept())
  }

  const handleSelectConversationTurn = (turn) => {
    // Regenerate ideas from a previous conversation turn
    const ideas = ResponseParser.parseIdeaSegments(turn.llmResponse)
    setGeneratedIdeas(ideas)
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <QueryInput onGenerateIdeas={handleGenerateIdeas} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <WordCountTracker />
          <ConversationHistory 
            onSelectTurn={handleSelectConversationTurn} 
          />
          <Tooltip title="LLM Configuration">
            <IconButton onClick={() => setConfigModalOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {generatedIdeas.length > 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Generated Ideas
              </Typography>
              <Grid container spacing={2}>
                {generatedIdeas.map((idea) => (
                  <Grid item xs={12} md={4} key={idea.id}>
                    <IdeaTile 
                      idea={idea}
                      onAdd={handleAddProjectElement}
                      onEdit={(editedIdea) => {
                        const updatedIdeas = generatedIdeas.map(
                          idea => idea.id === editedIdea.id ? editedIdea : idea
                        )
                        setGeneratedIdeas(updatedIdeas)
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FinalIdeaSection 
              finalIdeas={currentProjectConcept.elements}
              onRemoveIdea={(id) => {
                // TODO: Implement remove project element
              }}
            />
            {currentProjectConcept.elements.length > 0 && (
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSaveProjectConcept}
              >
                Save Project Concept
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      <LLMConfigModal 
        open={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
      />
    </Container>
  )
}

export default IdeaGeneratorPage
