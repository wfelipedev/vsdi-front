import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { Delete } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Tooltip, Slide } from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleAgree = () => {
    setOpen(false)
    props.handleDelete(props.row)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Tooltip title='Deletar Pessoa' arrow placement='bottom'>
        <IconButton variant='contained'
          aria-label='delete'
          style={{ background: '#FA3D3E', color: '#FFF' }}
          size='small'
          onClick={handleClickOpen}>
          <Delete fontSize='small' />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        TransitionComponent={Transition}>
        <DialogTitle id='alert-dialog-title'>{'Remoção de Pessoa'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Deseja deletar esta <strong>'{props.row.name}'</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            style={{
              background: '#F2F2F2',
              color: '#000',
              borderRadius: '25px'
            }}
            variant='outlined'>
            Não
          </Button>
          <Button
            onClick={handleAgree}
            autoFocus style={{
              background: '#000',
              color: '#fff',
              borderRadius: '25px'
            }}>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}