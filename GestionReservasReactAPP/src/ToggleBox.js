
import React, { Component } from "react";
import {Button} from 'reactstrap';

class ToggleBox extends Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var { title, children } = this.props;
		const { opened } = this.state;

		if (opened){
			// title ='Horarios ocultos';
		}else{
			// title ='Horarios para esta instalación';
		}

		return (
			<div>
				<Button className="btn light toggle" onClick={this.toggleBox}>
					{title}
				</Button>
				{opened && (					
					<div className="boxContent">
						
                    {children}
                  
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;
