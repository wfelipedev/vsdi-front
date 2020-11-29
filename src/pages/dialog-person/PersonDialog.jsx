import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Grid, Tooltip, Slide, InputLabel, FormControl, Select, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import { toastError } from '../../components/toastr/toastr'

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PersonDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSave = () => {
    if (props.name === '' || props.cpf === '' || props.birth_date === '') {
      toastError('Por favor, informe os dados necessários (*) dda pessoa.')
      return
    }
    props.handleSave()
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Tooltip title='Cadastrar Nova Pessoa' arrow placement='bottom'>
        <Button variant="contained" style={{background: '#000', color: '#fff', marginTop: '10px' }} onClick={handleClickOpen}  >
          Nova Pessoa
        </Button>
      </Tooltip>
      <Dialog open={open} fullWidth maxWidth='md' onClose={handleClose} aria-labelledby='form-dialog-title' TransitionComponent={Transition}>
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
                value={props.name}
                onChange={props.handleChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="filled-age-native-simple">Sexo</InputLabel>
                <Select
                  native
                  value={props.genre}
                  onChange={props.handleChange}
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
                value={props.email}
                onChange={props.handleChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <TextField
                variant='filled'
                required
                fullWidth
                label='Data Nasc. (AAAA-MM-DD)'
                type='text'
                name='birth_date'
                value={props.birth_date}
                onChange={props.handleChange}
                InputProps={{
                  inputComponent: DateMask,
                }} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <TextField
                variant='filled'
                required
                fullWidth
                label='Naturalidade'
                type='text'
                name='place_of_birth'
                value={props.place_of_birth}
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <TextField
                variant='filled'
                required
                fullWidth
                label='Nacionalidade'
                type='text'
                name='nationality'
                value={props.nationality}
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <TextField
                variant='filled'
                required
                fullWidth
                label='CPF'
                type='text'
                name='cpf'
                value={props.cpf}
                onChange={props.handleChange}
                InputProps={{
                  inputComponent: CpfMask,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}
            style={{
              background: '#F2F2F2',
              color: '#000',
              borderRadius: '25px'
            }}
            variant='outlined'>
            Cancelar
          </Button>
          <Button onClick={handleSave}
            style={{
              background: '#000',
              color: '#fff',
              borderRadius: '25px'
            }}>
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}