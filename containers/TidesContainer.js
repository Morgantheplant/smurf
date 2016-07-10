import React from 'react'
import Tides from '../components/Tides'
import { connect } from 'react-redux';

class TidesContainer extends React.Component {
   constructor(props) {
    super(props)
  }
  render() {
    return (
       <Tides targetIndex={this.props.indexHovered} />)
  }      
}

function mapStateToProps(state) {
  return {
    indexHovered: state.surfReportReducer.indexHovered
  }
}

export default connect(mapStateToProps)(TidesContainer);
