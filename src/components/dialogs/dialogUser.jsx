import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Slide } from '@material-ui/core'
import { toastError } from '../toastr/toastr'
import AuthService from '../../app/service/authService'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

export default class UserDialog extends Component {

  constructor() {
    super()
    this.state = {
      open: false,
      username: '',
      password: '',
    }
    this.service = new AuthService()
  }

  handleSignup = () => {
    const { username, password } = this.state
    const user = { username, password }
    this.service.signup(user)
    .then(result => {
        this.handleClose()
      })
      .catch(error => {
        toastError('Erro ao cadastrar-se. Senha muito fraca, tente com caracteres especiais')
        this.handleClose()
      })
  }

  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false, email: '', nome: '', senha: '' })
  }

  render() {
    return (
      <>
        <Button
          variant='filled'
          style={{ color: '#000', marginTop: '5%' }}
          type='submit'
          fullWidth
          size='small'
          onClick={this.handleClickOpen}>
          CADASTRAR-SE
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby='form-dialog-title' TransitionComponent={Transition}>
          <DialogTitle id='form-dialog-title'>Atualizar dados de usuário.</DialogTitle>
          <DialogContent dividers>
            <TextField
              required
              variant='filled'
              margin='dense'
              id='nome'
              label='Username'
              type='text'
              fullWidth
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
            />
            <TextField
              required
              variant='filled'
              margin='dense'
              id='senha'
              label='Senha'
              type='password'
              fullWidth
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              helperText={<strong>* Mínimo 6 caracteres. (Utilizar caracteres especiais) </strong>}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}
              style={{
                background: '#F2F2F2',
                color: '#000',
                borderRadius: '25px'
              }}
              variant='outlined'>
              Cancelar
            </Button>
            <Button
              onClick={this.handleSignup}
              style={{
                background: '#000',
                color: '#fff',
                borderRadius: '25px'
              }}>
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }

}