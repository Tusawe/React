import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class UserEdit extends Component {

  emptyItem = {
    id:'',
    username: '',
    email: '',
    password: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const user = await (await fetch(`/api/usuario/${this.props.match.params.id}`)).json();
      this.setState({item: user});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/usuario', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/user');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.username ? 'Edit User' : 'Add User'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="id">Id</Label>
            <Input type="number" name="id" id="id" value={item.id || ''}
                   onChange={this.handleChange} autoComplete="id" disabled/>
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" value={item.username || ''}
                   onChange={this.handleChange} autoComplete="username"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email" id="email" value={item.email || ''}
                   onChange={this.handleChange} autoComplete="email"/>
          </FormGroup>         
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="text" name="password" id="password" value={item.password || ''}
                   onChange={this.handleChange} autoComplete="password"/>
          </FormGroup>
          
          
          <FormGroup>
            <Button color="primary" type="submit">Guardar</Button>{' '}
            <Button color="secondary" tag={Link} to="/user">Cancelar</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(UserEdit);
