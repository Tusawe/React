import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Card } from 'reactstrap';
import AppNavbar from './AppNavbar';
import ToggleBox from './ToggleBox';

import { Link } from 'react-router-dom';

class FacilityList extends Component {

  constructor(props) {
    super(props);
    this.state = {facilities: [], isLoading: true}; 
    this.remove = this.remove.bind(this);
  }

  showChange(caja){
    console.log(caja);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/api/instalacion')
      .then(response => response.json())
      .then(data => this.setState({facilities: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/instalacion/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedFacility = [...this.state.facilities].filter(i => i.id !== id);
      this.setState({facilities: updatedFacility});
    });
  }

  render() {
    const {facilities, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const facilityList = facilities.map(facility => {
      return <tr key={facility.id}>
        <td>{facility.id}</td>
        <td>
        <ToggleBox title={facility.nombre} >
              <Card>
                  <ul className="list-group">
                    
                    {
                      facility.horarios.map(horario => {
                        return <li className="list-group-item list-group-item-primary">Desde {horario.inicio} hasta {horario.fin} </li>;
                      })
                    }
                    
                  </ul>
              </Card>
            </ToggleBox></td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/facility/" + facility.id}>Editar</Button>            
            <Button size="sm" color="warning" tag={Link} to={"/facility/" + facility.id+ "/schedule"}>Editar Horarios</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(facility.id)}>Borrar</Button>
          </ButtonGroup>
          
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/facility/new">Añadir instalación</Button>
          </div>
          <h3>Lista de instalaciones</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th>ID</th>
              <th>Instalación</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {facilityList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default FacilityList;