import React,{Component} from 'react';
import Moment from 'react-moment';
import {StyleSheet} from 'react-native';
import {Text,View,Container,Header,Button,Body,Content,Card,CardItem,Left,Thumbnail,Right} from 'native-base';
window.navigator.userAgent = 'react-native';
export default class Home extends Component{
  constructor(props) {
      super(props);

      this.getData();
      this.state = { logsList: [] };
      this.LogData = [];
  }

  getData = () => {
      setTimeout(() => {
          fetch("https://bot.defect94.hasura-app.io/logs")
              .then(response => {
                  if (response.ok) {
                      return response.json();
                  }
                  throw new Error('Network response was not ok.');
              })
              .then((response) => {
                  if (!isEmpty(this.LogData)) {
                      if (response.timestamp !== this.LogData[0].timestamp && !isEmpty(response.timestamp))
                          this.LogData.unshift(response);
                  } else {
                      this.LogData.unshift(response);
                  }

                  this.setState({ logsList: this.LogData });
                  this.getData();
              }).catch((err) => {
                  this.getData();
              });
      }, 1000);
  }



  render(){

    let{ state } = this;
    return(
      <Container>
      <Header style={styles.head}>
      <Left>
      <Button transparent>
        <Thumbnail source={require('../img/tmdb.png')}/>
      </Button>
        </Left>
        <Text style={{color: 'white' , fontSize:20, paddingTop:10 }}>Alexa:TMDB</Text>
        <Right/>
      </Header>
      <Content>
  {state.logsList.map((singleQuery, i) => (
        <Card key={i}>
        <CardItem style={styles.car}>
        <Left>
          <Text style={styles.text}>Time</Text>
        </Left>
        <Body />
        <Right style={styles.time_style} >
            <Text style={styles.time_text} > {singleQuery.timestamp} </Text>
        </Right>
          </CardItem>
          <CardItem style={styles.car}>
          <Left>
            <Text style={styles.text}>Query</Text>
          </Left>
          <Right>
              <Text style={styles.time_text} > {singleQuery.query_text} </Text>
          </Right>

            </CardItem>
            <CardItem style={styles.car}>
            <Left>
              <Text style={styles.text}>Answer</Text>
            </Left>
            <Right>
            <Text>
                {singleQuery.answer}
            </Text>
            </Right>
              </CardItem>
              <CardItem style={styles.car}>
              <Left>
                <Text style={styles.text}>Response Time</Text>
              </Left>
              <Right>
              <Text > {singleQuery.response_time} seconds  </Text>
              </Right>
              </CardItem>
              </Card>

            ))}
                          </Content>
              </Container>




    );
  }
}

const styles = StyleSheet.create({
  car:{
    backgroundColor:'#D5F5E3',

  },
  head:{
    backgroundColor:'#2ECC71'

  },
  text:{
   fontWeight:'bold',
    fontSize:15, paddingTop:10
  },
    time_style: { flexDirection: 'row', justifyContent: 'flex-end' },
    time_text: { fontSize: 10 }
}

)
