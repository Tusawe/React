import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ScheduleList extends Component {

  constructor(props) {
    super(props);
    this.state = {schedules: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch(`/api/instalacion/${this.props.match.params.id}/horario`)
      .then(response => response.json())
      .then(data => this.setState({schedules: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/instalacion/${this.props.match.params.id}/horario/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {

      let updatedFacility = [...this.state.schedules].filter(i => i.id !== id);
      this.setState({schedules: updatedFacility});
    });
  }

  render() {
    const {schedules, isLoading} = this.state;
    var { title } = this.props;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const scheduleList = schedules.map(schedule => {
      return <tr key={schedule.id}>
        <td>{schedule.id}</td>
        <td>{schedule.inicio}</td>
        <td>{schedule.fin}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={`/facility/${this.props.match.params.id}/schedule/` + schedule.id}>Editar</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(schedule.id)}>Borrar</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/facility/new">Añadir horario</Button>
          </div>
          <h3> Horarios de: {title} </h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th>ID</th>
              <th>inicio</th>
              <th>fin</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {scheduleList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ScheduleList;