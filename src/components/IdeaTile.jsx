import React, { useState } from 'react'
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditIcon from '@mui/icons-material/Edit'

function IdeaTile({ 
  idea, 
  onAdd, 
  onEdit 
}) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editedIdea, setEditedIdea] = useState(idea)

  const handleSaveEdit = () => {
    onEdit(editedIdea)
    setEditModalOpen(false)
  }

  return (
    <>
      <Card 
        variant="outlined" 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body1">
            {idea.description}
          </Typography>
        </CardContent>
        <div style={{ 
          position: 'absolute', 
          bottom: 10, 
          right: 10 
        }}>
          <Tooltip title="Edit Idea">
            <IconButton 
              color="secondary" 
              onClick={() => setEditModalOpen(true)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add to Final Idea">
            <IconButton 
              color="primary" 
              onClick={() => onAdd(idea)}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Card>

      <Dialog 
        open={editModalOpen} 
        onClose={() => setEditModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Idea</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={editedIdea.description}
            onChange={(e) => setEditedIdea({
              ...editedIdea,
              description: e.target.value
            })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveEdit} 
            variant="contained" 
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default IdeaTile
