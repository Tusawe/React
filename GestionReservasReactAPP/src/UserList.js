import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {users: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/api/usuario')
      .then(response => response.json())
      .then(data => this.setState({users: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/usuario/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedUsers = [...this.state.users].filter(i => i.id !== id);
      this.setState({users: updatedUsers});
    });
  }

  render() {
    const {users, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const userList = users.map(user => {
      return <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/user/" + user.id}>Editar</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(user.id)}>Borrar</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/user/new">Añadir usuario</Button>
          </div>
          <h3>Lista de usuarios</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th>ID</th>
              <th width="20%">Usuario</th>
              <th width="20%">email</th>
              <th>password</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {userList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UserList;