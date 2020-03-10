import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
// import Detail from "../component/Detail";
import Form from "../component/Form";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
const API_KEY = "ed99b16a5123c46d0bbb9db310bafc45";
class Weather extends Component {
    state = {
        city: undefined,
        country: undefined,
        firstDate: undefined,
        secondDate: undefined,
        thirdDate: undefined,
        fourthDate: undefined,
        fifthDate: undefined,
        firstDayMax: undefined,
        secondDayMax: undefined,
        thirdDayMax: undefined,
        fourthDayMax: undefined,
        fifthDayMax: undefined,
        firstDayMin: undefined,
        secondDayMin: undefined,
        thirdDayMin: undefined,
        fourthDayMin: undefined,
        fifthDayMin: undefined,
        firstDayCondition: undefined,
        secondDayCondition: undefined,
        thirdDayCondition: undefined,
        fourthDayCondition: undefined,
        fifthDayCondition: undefined,
        description: undefined,
        error: undefined
    }
    data = {};
    getWeather = async(e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();  
        this.data = data;
        console.log(data)
        let firstDay = data.list.slice(0,8);
        let secondDay = data.list.slice(8,16);
        let thirdDay = data.list.slice(16,24);
        let fourthDay = data.list.slice(24,32);
        let fifthDay = data.list.slice(32,40);
        let firstDayMax = this.getMaxTemp(firstDay);
        let secondDayMax = this.getMaxTemp(secondDay);
        let thirdDayMax = this.getMaxTemp(thirdDay);
        let fourthDayMax = this.getMaxTemp(fourthDay);
        let fifthDayMax = this.getMaxTemp(fifthDay);
        let firstDayMin = this.getMinTemp(firstDay);
        let secondDayMin = this.getMinTemp(secondDay);
        let thirdDayMin = this.getMinTemp(thirdDay);
        let fourthDayMin = this.getMinTemp(fourthDay);
        let fifthDayMin = this.getMinTemp(fifthDay);
        let firstDayCondition =  "http://openweathermap.org/img/wn/"+firstDay[5].weather[0].icon+"@2x.png";
        let secondDayCondition = "http://openweathermap.org/img/wn/"+secondDay[5].weather[0].icon+"@2x.png";
        let thirdDayCondition = "http://openweathermap.org/img/wn/"+thirdDay[5].weather[0].icon+"@2x.png";
        let fourthDayCondition = "http://openweathermap.org/img/wn/"+fourthDay[5].weather[0].icon+"@2x.png";
        let fifthDayCondition = "http://openweathermap.org/img/wn/"+fifthDay[5].weather[0].icon+"@2x.png";
        this.setState({
        city: data.city.name,
        country: data.city.country,
        firstDate: firstDay[0].dt_txt.substr(0,10),
        secondDate: secondDay[0].dt_txt.substr(0,10),
        thirdDate: thirdDay[0].dt_txt.substr(0,10),
        fourthDate: fourthDay[0].dt_txt.substr(0,10),
        fifthDate: fifthDay[0].dt_txt.substr(0,10),
        firstDayMax: firstDayMax,
        secondDayMax: secondDayMax,
        thirdDayMax: thirdDayMax,
        fourthDayMax: fourthDayMax,
        fifthDayMax: fifthDayMax,
        firstDayMin: firstDayMin,
        secondDayMin: secondDayMin,
        thirdDayMin: thirdDayMin,
        fourthDayMin: fourthDayMin,
        fifthDayMin: fifthDayMin,
        firstDayCondition: firstDayCondition,
        secondDayCondition: secondDayCondition,
        thirdDayCondition: thirdDayCondition,
        fourthDayCondition: fourthDayCondition,
        fifthDayCondition: fifthDayCondition,
        error: ""
        })
    }
    getMaxTemp = (arr) => {
        let max = -100;
        for(let i=0;i<arr.length;i++) {
          if(arr[i].main.temp_max > max) {
            max = arr[i].main.temp_max
          }
        }
        return max;
    }
    getMinTemp = (arr) => {
        let min = 100;
        for(let i=0;i<arr.length;i++) {
          if(arr[i].main.temp_min < min) {
            min = arr[i].main.temp_min
          }
        }
        return min;
    }
    render() {
        return (
            <Router>
                <div>
                    <Form getWeather={this.getWeather}></Form>
                    {this.state.firstDate && <Table bordered hover variant="dark" >
                        <thead>
                            <tr>
                            <th>#</th>
                            {this.state.firstDate && <th>{this.state.firstDate}</th>}
                            {this.state.secondDate && <th>{this.state.secondDate}</th>}  
                            {this.state.thirdDate && <th>{this.state.thirdDate}</th>}  
                            {this.state.fourthDate && <th>{this.state.fourthDate}</th>}  
                            {this.state.fifthDate && <th>{this.state.fifthDate}</th>}  
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Max Temperature</td>
                                {this.state.firstDayMax && <td>{this.state.firstDayMax}</td>}  
                                {this.state.secondDayMax && <td>{this.state.secondDayMax}</td>}  
                                {this.state.thirdDayMax && <td>{this.state.thirdDayMax}</td>}  
                                {this.state.fourthDayMax && <td>{this.state.fourthDayMax}</td>}  
                                {this.state.fifthDayMax && <td>{this.state.fifthDayMax}</td>}  
                            </tr>
                            <tr>
                                <td>Min Temperature</td>
                                {this.state.firstDayMin && <td>{this.state.firstDayMin}</td>}
                                {this.state.secondDayMin && <td>{this.state.secondDayMin}</td>}  
                                {this.state.thirdDayMin && <td>{this.state.thirdDayMin}</td>}
                                {this.state.fourthDayMin && <td>{this.state.fourthDayMin}</td>}
                                {this.state.fifthDayMin && <td>{this.state.fifthDayMin}</td>}
                            </tr>
                            <tr>
                                <td>Condition</td>
                                {this.state.firstDayCondition && <td><img src={this.state.firstDayCondition}/></td>}
                                {this.state.secondDayCondition && <td><img src={this.state.secondDayCondition}/></td>}  
                                {this.state.thirdDayCondition && <td><img src={this.state.thirdDayCondition}/></td>}
                                {this.state.fourthDayCondition && <td><img src={this.state.fourthDayCondition}/></td>}
                                {this.state.fifthDayCondition && <td><img src={this.state.fifthDayCondition}/></td>}
                            </tr>
                            <tr>
                                <td>See Detail</td>
                                <td><Link to={`/show/${this.state.firstDate}`}>detail</Link></td>
                                <td><Link to={`/show/${this.state.secondDate}`}>detail</Link></td>
                                <td><Link to={`/show/${this.state.thirdDate}`}>detail</Link></td>
                                <td><Link to={`/show/${this.state.fourthDate}`}>detail</Link></td>
                                <td><Link to={`/show/${this.state.fifthDate}`}>detail</Link></td>
                            </tr>        
                        </tbody>
                    </Table>}
                    {this.state.error && <p>{this.state.error}</p>}
                </div>
                <Switch>
                    <Route exact path="/show/:id" children={<Detail data={this.data}/>} />
                </Switch>
            </Router>
        )
        
    }
}

function Detail(props) {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    let data = props;
    let arr = [];
    if(id == data.data.list[0].dt_txt.substr(0,10)) {
        arr = data.data.list.slice(0,8);
    }
    else if(id == data.data.list[8].dt_txt.substr(0,10)) {
        arr = data.data.list.slice(8,16);
    }
    else if(id == data.data.list[16].dt_txt.substr(0,10)) {
        arr = data.data.list.slice(16,24);
    }
    else if(id == data.data.list[24].dt_txt.substr(0,10)) {
        arr = data.data.list.slice(24,32);
    }
    else {
        arr = data.data.list.slice(32,40);
    }

    return (
      <div>
        <Table bordered hover variant="dark" >
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Temperature</th> 
                    <th>Condition</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>00:00</td>
                    <td>{arr[0].main.temp}</td>
                    <td><img src={"http://openweathermap.org/img/wn/"+arr[1].weather[0].icon+"@2x.png"}/></td>
                </tr>  
                <tr>
                    <td>03:00</td>
                    <td>{arr[1].main.temp}</td>
                    <td><img src={"http://openweathermap.org/img/wn/"+arr[2].weather[0].icon+"@2x.png"}/></td>
                </tr> 
                <tr>
                    <td>06:00</td>
                    <td>{arr[2].main.temp}</td>
                    <td><img src={"http://openweathermap.org/img/wn/"+arr[3].weather[0].icon+"@2x.png"}/></td>
                </tr>  
                <tr>
                    <td>09:00</td>
                    <td>{arr[3].main.temp}</td>
                    <td><img src={"http://openweathermap.org/img/wn/"+arr[4].weather[0].icon+"@2x.png"}/></td>
                </tr>  
                <tr>
                    <td>12:00</td>
                    <td>{arr[4].main.temp}</td>
                    <td><img src={"http://openweathermap.org/img/wn/"+arr[5].weather[0].icon+"@2x.png"}/></td>
                </tr>  
                <tr>
                    <td>15:00</td>
                    <td>{arr[5].main.temp}</td>
                    <td><img src={"http://openweathermap.org/img/wn/"+arr[6].weather[0].icon+"@2x.png"}/></td>
                </tr>   
                <tr>
                    <td>18:00</td>
                    <td>{arr[6].main.temp}</td>
                    <td><img src={"http://openweathermap.org/img/wn/"+arr[7].weather[0].icon+"@2x.png"}/></td>
                </tr> 
                <tr>
                    <td>21:00</td>
                    <td>{arr[7].main.temp}</td>
                    <td><img src={"http://openweathermap.org/img/wn/"+arr[0].weather[0].icon+"@2x.png"}/></td>
                </tr> 
            </tbody>
        </Table>

      </div>
    );
  }
  
export default Weather;