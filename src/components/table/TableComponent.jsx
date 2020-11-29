import React, { useEffect, useState, Component } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import { TablePagination } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { ptBR } from '@material-ui/core/locale'
import PersonService from '../../app/service/personService'
import DialogEditPessoa from '../dialogs/dialogEditPessoa'
import AlertDialog from '../dialogs/dialogDelete'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 440
  }
})

const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, ptBR)

function TableFunction(props) {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [rowsd, setRowsd] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const columns = [
    { id: 'acoes', label: 'Ações', minWidth: 170 },
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'genre', label: 'Sexo', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'birth_date', label: 'Data de Nasc.', minWidth: 170 },
    { id: 'place_of_birth', label: 'Naturalidade', minWidth: 100 },
    { id: 'nationality', label: 'Nacionalidade', minWidth: 170 },
    { id: 'cpf', label: 'CPF', minWidth: 170 },
  ]

  useEffect(() => {
    const token = localStorage.getItem('_token')
    props.service.getAll(token)
      .then(result => {
        const people = []
        result.data.map(person => {
          people.unshift(person)
        })
        setRowsd(people)
      })
      .catch(error => {
        console.error(error)
      })
  }, [rowsd])

  return (
    <div>
      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsd.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <>
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell>
                      <DialogEditPessoa pessoa={row} />
                      <AlertDialog row={row} handleDelete={props.handleDelete} />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.genre === 'M' ? 'Masculino' : 'Feminino'}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{moment(row.birth_date, 'YYYY-MM-DDTHH:mm:ssZ').format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{row.place_of_birth}</TableCell>
                    <TableCell>{row.nationality}</TableCell>
                    <TableCell>{row.cpf}</TableCell>
                  </TableRow>
                </>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ThemeProvider theme={theme}>
        <TablePagination
          rowsPerPageOptions={[7, 15, 20]}
          component='div'
          count={rowsd.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage} />
      </ThemeProvider>
    </div>
  )
}

export default class TableComponent extends Component {

  constructor(props) {
    super(props)
    this.service = new PersonService()
  }

  render() {
    return (
      <>
        <TableFunction
          service={this.service}
          handleDelete={this.props.handleDelete}
        />
      </>
    )
  }

}