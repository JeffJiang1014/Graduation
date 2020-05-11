import React , { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import bg from '../../img/bg.jpg'


const style = ({
    login: {
      width: '100%',
    }
})

class Research extends Component {
    constructor(props){
        super(props);
        this.state = {
            research: []
        }
    }

    UNSAFE_componentWillMount(){
        Axios.post("http://localhost:5000/api/research/getResearch")
        .then(res => {
            //console.log(res.data)
            this.setState({research: res.data})
        })
        .catch(err => {console.log(err.data)})
    }
  
  render(){
    //console.log(errors)
    return (
      <div>
        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
  {
      this.state.research.map((item,index) => {
            return(
                <li data-target="#carouselExampleCaptions" data-slide-to={index} className={String(index) === '0'?"active":null} key={index}></li>
            )
      })
  }
  </ol>
  <div className="carousel-inner">
  {
      this.state.research.map((item,index) => {
            return(
                <div className={String(index) === '0' ?"active carousel-item":"carousel-item"} key={index}>
                    <img src={bg} className="d-block w-100" alt="..." style={{"width": "100%", "height": "685px"}}/>
                    <div className="carousel-caption d-none d-md-block">
                        <h1>{item.name}</h1>
                        <p>{item.intro}</p>
                    </div>
                </div>
            )
      })
  }    
  </div>
  <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
      </div>
    );
  }
  
}

export default withStyles(style)(Research);