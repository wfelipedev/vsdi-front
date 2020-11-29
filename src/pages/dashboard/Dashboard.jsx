import React, { Component } from 'react'
import { toastError, toastSucced } from '../../components/toastr/toastr'
import { Grid, Paper, Container } from '@material-ui/core'
import TableComponent from '../../components/table/TableComponent'
import PersonDialog from '../dialog-person/PersonDialog'
import PersonService from '../../app/service/personService'
import '../../resources/signin.css'

class Dashboard extends Component {

  state = {
    name: '',
    genre: '',
    email: '',
    birth_date: '',
    place_of_birth: '',
    nationality: '',
    cpf: ''
  }

  constructor() {
    super()
    this.service = new PersonService()
  }

  handleSave = () => {
    const token = localStorage.getItem('_token')
    const {
      name,
      genre,
      email,
      birth_date,
      place_of_birth,
      nationality,
      cpf
    } = this.state
    const person = {
      name, genre, email, birth_date, place_of_birth, nationality, cpf
    }
    this.service.save(person, token)
      .then(result => {
        toastSucced('Pessoa cadastrada com sucesso.')
      })
      .catch(error => {
        toastError(error.response.data)
      })
  }

  handleDelete = (person) => {
    const token = localStorage.getItem('_token')
    this.service.deletePerson(person.id, token)
      .then(result => {
        toastSucced("Pessoa removida com sucesso.")
      })
      .catch(erro => {
        toastError("Erro ao remover Pessoa.");
      });
  }

  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }


  render() {
    return (
      <>
        <Container style={{ marginTop: '7%' }}>
          <Paper>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} style={{ textAlign: 'center', justifyItems: 'center' }} className='fontDashboard'>
                <h1>Gerenciamento de Pessoas</h1>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} style={{ textAlign: 'right', padding: '2%' }}>
                <PersonDialog state={this.state} handleSave={this.handleSave} handleChange={this.handleChange} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ margin: '1%' }}>
                <TableComponent handleDelete={this.handleDelete} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </>
    )
  }
}

export default Dashboard
