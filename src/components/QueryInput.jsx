import React, { useState } from 'react'
import { 
  TextField, 
  Button, 
  Box, 
  Autocomplete 
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addSearchToHistory } from '../store/historySlice'

const popularSuggestions = [
  'Create a language learning app',
  'Design a fitness tracking application',
  'Build a social networking platform',
  'Develop a productivity management tool',
  'Create an e-commerce marketplace'
]

function QueryInput({ onGenerateIdeas }) {
  const [query, setQuery] = useState('')
  const searchHistory = useSelector(state => state.history.searches)
  const dispatch = useDispatch()

  const handleGenerateIdeas = () => {
    if (query.trim()) {
      // Add to search history
      dispatch(addSearchToHistory({ query }))
      
      // Trigger idea generation
      onGenerateIdeas(query)
    }
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2,
      mb: 3 
    }}>
      <Autocomplete
        freeSolo
        options={[
          ...popularSuggestions,
          ...searchHistory.map(h => h.query)
        ]}
        renderInput={(params) => (
          <TextField 
            {...params}
            fullWidth
            label="Describe your app idea"
            variant="outlined"
            placeholder="E.g., Create a language learning app"
          />
        )}
        value={query}
        onChange={(_, newValue) => setQuery(newValue || '')}
        onInputChange={(_, newInputValue) => setQuery(newInputValue)}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGenerateIdeas}
        sx={{ height: '56px' }}
      >
        Generate Ideas
      </Button>
    </Box>
  )
}

export default QueryInput
