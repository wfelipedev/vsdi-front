import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { IconButton, Grid, Tooltip, Slide, FormControl, InputLabel, Select } from '@material-ui/core'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import { Create } from '@material-ui/icons'
import 'date-fns'
import { toastSucced } from '../toastr/toastr'
import PersonService from '../../app/service/personService'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})
function DateMask(props) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

DateMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
}

function CpfMask(props) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

CpfMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
}

export default class DialogEditPessoa extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      id: this.props.pessoa.id,
      name: this.props.pessoa.name,
      genre: this.props.pessoa.genre,
      email: this.props.pessoa.email,
      birth_date: this.props.pessoa.birth_date,
      place_of_birth: this.props.pessoa.place_of_birth,
      nationality: this.props.pessoa.nationality,
      cpf: this.props.pessoa.cpf,
      locale: 'br',
    }
    this.service = new PersonService()
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleUpdateEmail = () => {
    const token = localStorage.getItem('_token')
    const {name, email} = this.state
    const person = {name, email}
    this.service.update(this.state.id, person, token)
      .then(result => {
        this.setState({ open: false })
        toastSucced('Pessoa atualizada com sucesso.')
      })
      .catch(erro => {
        alert(erro.response.data);
      });
  }

  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }

  handleDate = date => {
    this.setState({ dt_recebimento: date })
  }

  render() {
    return (
      <>
        <Tooltip title="Visualizar / Editar Pessoa" arrow placement="bottom">
          <IconButton
            variant="contained"
            style={{ background: "#F0BC21", color: "#FFF", marginRight: "1%" }}
            onClick={this.handleClickOpen}
            size="small">
            <Create fontSize="small" />
          </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} fullWidth maxWidth='md' onClose={this.handleClose} aria-labelledby='form-dialog-title' TransitionComponent={Transition}>
          <DialogTitle id='form-dialog-title'>Cadastrar Pessoa</DialogTitle>
          <DialogContent dividers >
            <DialogContentText>
              Campos Obrigatórios - (*)
          </DialogContentText>
            <Grid
              container
              justify='center'
              alignItems='center'
              spacing={4}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <TextField
                  variant='filled'
                  required
                  fullWidth
                  label='Nome'
                  type='text'
                  name='name'
                  value={this.state.name}
                  onChange={this.handleChange} />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <FormControl variant="filled">
                  <InputLabel htmlFor="filled-age-native-simple">Sexo</InputLabel>
                  <Select
                    native
                    disabled
                    value={this.state.genre}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'genre',
                      id: 'filled-age-native-simple',
                    }}
                  >
                    <option aria-label="None" value="Selecionar Sexo" />
                    <option value={'M'}>Masculino</option>
                    <option value={'F'}>Feminino</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                <TextField
                  variant='filled'
                  fullWidth
                  label='E-mail'
                  type='text'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange} />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  variant='filled'
                  required
                  fullWidth
                  disabled
                  label='Data Nasc.'
                  type='text'
                  name='birth_date'
                  value={this.state.birth_date}
                  onChange={this.handleChange}
                  InputProps={{
                    inputComponent: DateMask,
                  }} />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  variant='filled'
                  required
                  fullWidth
                  disabled
                  label='Naturalidade'
                  type='text'
                  name='place_of_birth'
                  value={this.state.place_of_birth}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  variant='filled'
                  required
                  fullWidth
                  disabled
                  label='Nacionalidade'
                  type='text'
                  name='nationality'
                  value={this.state.nationality}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  variant='filled'
                  required
                  fullWidth
                  disabled
                  label='CPf'
                  type='text'
                  name='cpf'
                  value={this.state.cpf}
                  onChange={this.handleChange}
                  InputProps={{
                    inputComponent: CpfMask,
                  }}
                />
              </Grid>
            </Grid>
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
            <Button onClick={this.handleUpdateEmail}
              style={{
                background: '#000',
                color: '#fff',
                borderRadius: '25px'
              }}>
              Editar
          </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
