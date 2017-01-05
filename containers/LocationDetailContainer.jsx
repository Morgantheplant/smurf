import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { getReportDetail, closeReport } from "../actions/menuActions";

class LocationDetailContainer extends Component {
  constructor(props){
    super(props)
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount(){
    const { dispatch } = this.props;
    //dispatch(getReportDetail(this.props.locationId)) 
  }
  closeModal(){
    const { dispatch } = this.props;
    dispatch(closeReport());
  }
  render() {
    const surflineUrl = 'http://e.cdn-surfline.com/syndication/embed/v1/player.html';
    return (
      <div className="location_detail_background" >
        <div className="location_detail_modal" >
          <div className="close-button" onClick={this.closeModal}>X</div>
          <iframe 
            width="640" 
            height="360" 
            src={`${surflineUrl}?id=${this.props.locationId}`} 
            frameBorder="0" 
            scrolling="no" 
            allowFullScreen 
          />
          <p>
            {
              //this.props.reportDetail || `${this.props.locationId}: Loading report detail...`
            }    
          </p>
        </div>
      </div>);
  }
}


LocationDetailContainer.propTypes = {
  locationId: PropTypes.string,
  reportDetail: PropTypes.string
};

function mapStateToProps(state) {
  return {
    reportDetail: state.menuReducer.reportDetail
  };
}

export default connect(mapStateToProps)(LocationDetailContainer);
