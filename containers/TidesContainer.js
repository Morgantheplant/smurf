import React from 'react';
import TideComp from '../components/TideComp';
import { connect } from 'react-redux';

class TidesContainer extends React.Component {
   constructor(props) {
    super(props)
  }
  render() {
    return (
       <TideComp 
          surfData={this.props.surfData} 
          targetIndex={this.props.indexHovered} 
          height={100}
          width={200}
          />)
  }      
}

function mapStateToProps(state) {
  return {
    indexHovered: state.surfReportReducer.indexHovered
  }
}

export default connect(mapStateToProps)(TidesContainer);
