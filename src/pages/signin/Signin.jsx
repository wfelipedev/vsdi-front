import React, { Component } from 'react'

import '../../resources/signin.css'
import { Button, Container, CssBaseline, FormControl, InputLabel, FilledInput, InputAdornment, IconButton } from '@material-ui/core'
import AuthService from '../../app/service/authService'
import { toastError } from '../../components/toastr/toastr'
import { LoopCircleLoading } from 'react-loadingg'
import { Visibility, VisibilityOff, VpnKey, AccountCircle } from '@material-ui/icons'
import UserDialog from '../../components/dialogs/dialogUser'

class Signin extends Component {

  state = {
    username: '',
    password: '',
    loading: undefined,
    showPassword: false
  }

  constructor() {
    super()
    this.service = new AuthService()
  }

  componentDidMount() {
    this.setState({ loading: false })
    localStorage.removeItem('_token')
  }

  handleLogin = () => {
    this.setState({ loading: true })
    this.service.signin({
      username: this.state.username,
      password: this.state.password
    })
      .then(result => {
        localStorage.setItem('_token', JSON.stringify(result.data.accessToken))
        this.props.history.push('/dashboard')
      })
      .catch(error => {
        toastError('Não foi possível realizar o login. Email ou senha incorretos.')
        this.setState({ loading: false })
      })
  }

  handleChangeP = (prop) => (event) => {
    this.setState({ [prop]: event.target.value })
  }

  handleClickShowPassword = () => {
    if (this.state.showPassword) {
      this.setState({ showPassword: false })
    } else {
      this.setState({ showPassword: true })
    }
  }

  handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }

  render() {
    return (
      <>
        {this.state.loading ?
          (
            <LoopCircleLoading color='#000' />
          )
          :
          (
            <>
              <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className='paperLogin'>
                  <big className='typographyLogin fontLogin' component='h1' variant='h5'>
                    ENTRAR
                  </big>
                  <FormControl variant='filled' fullWidth>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <FilledInput
                      id='username'
                      type='text'
                      value={this.state.username}
                      name='username'
                      onChange={this.handleChange}
                      startAdornment={
                        <InputAdornment position='start'>
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl variant='filled' fullWidth>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <FilledInput
                      id='password'
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password}
                      name='password'
                      onChange={this.handleChangeP('password')}
                      startAdornment={
                        <InputAdornment position='start'>
                          <VpnKey />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge='end'
                          >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Button
                    variant='filled'
                    style={{ backgroundColor: '#000', color: '#ffffff', borderRadius: '25px', marginTop: '5%' }}
                    type='submit'
                    fullWidth
                    size='small'
                    onClick={this.handleLogin}>
                    ENTRAR
                  </Button>
                  <UserDialog/>
                  
                </div>
              </Container>
            </>
          )
        }
      </>
    )
  }
}

export default Signin
