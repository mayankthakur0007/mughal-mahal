import React, {Component} from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView, Image, View, Text} from 'react-native';
import { Button, Card } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    try {
      let userData = await AsyncStorage.getItem('userInfo');
      let parsedUserData = JSON.parse(userData); 
      if(parsedUserData && parsedUserData.status==200)
      {
        this.setState({
          data: parsedUserData.decoded,
          loading: false,
        }); 
        
      }
    } catch (error) {
      console.log(error);
    }
  }

render(){
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} >
        <ScrollView>
          <View style={{width:'100%', height:250}}>
            <Image 
            source={require('../assets/imgs/bg5.jpg')}
            style={{width:'100%', height:250}}
            >
            </Image>
          </View>
          <View style={{alignItems:'center'}}>
            <Image 
            source={require('../assets/imgs/profile-img.jpg')}
            style={{width:140, height:140,marginTop:-70}}
            >
            </Image>
            <Text style={{fontSize:25, fontWeight:'bold',padding:8}}>{this.state.data.name}</Text>
            <Text style={{fontSize:16}}>{this.state.data.designation_name}</Text>
          </View>

        <Card>
          <View style={styles.LoanEntries}>
          <View style={styles.textContainer}>
            <Text style={{fontWeight:'bold'}}>Branch</Text>
            <Text>{this.state.data.branch_name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontWeight:'bold'}}>Civil ID</Text>
            <Text>{this.state.data.civil_id}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontWeight:'bold'}}>Status</Text>
            <Text style={{backgroundColor:'green', color:'white',borderRadius:5,padding:5}}>{this.state.data.status ? "Active" : "Not Active"}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontWeight:'bold'}}>Email</Text>
            <Text>{this.state.data.email}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontWeight:'bold'}}>Phone</Text>
            <Text>{this.state.data.phone_number}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontWeight:'bold'}}>Company Serial Number</Text>
            <Text>{this.state.data.serial_number}</Text>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={{fontWeight:'bold'}}>Date of Joining</Text>
            <Text>{this.state.data.date_of_joining}</Text>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={{fontWeight:'bold'}}>Role</Text>
            <Text>{this.state.data.roles}</Text>
          </View>
          
          </View>
        </Card>
        <Button
          buttonStyle={{ backgroundColor: "green" }}
          containerStyle={{ margin: 20, borderRadius: 20 }}
          title="Edit Profile"
        />
        </ScrollView>
    </View>

  )
}
}

const styles = StyleSheet.create({

  LoanEntries: {
    marginVertical: 10,
  },
  textContainer: {
    flexDirection: "row",
    fontSize: 16,
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
