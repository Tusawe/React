import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class FacilityEdit extends Component {

  emptyItem = {
    id:'',
    nombre:''
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
      const facility = await (await fetch(`/api/instalacion/${this.props.match.params.id}`)).json();
      this.setState({item: facility});
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
    item.horarios = null;   
    await fetch('/api/instalacion', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/facility');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.nombre ? 'Editar instalación' : 'Añadir Instalación'}</h2>;

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
            <Label for="nombre">Nombre</Label>
            <Input type="text" name="nombre" id="nombre" value={item.nombre || ''}
                   onChange={this.handleChange} autoComplete="nombre"/>
          </FormGroup>
          
          <FormGroup>
            <Button color="primary" type="submit">Guardar</Button>{' '}
            <Button color="secondary" tag={Link} to="/facility">Cancelar</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(FacilityEdit);
