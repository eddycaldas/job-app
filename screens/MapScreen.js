import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import {getZipCode } from '../actions/job_actions'

import * as actions from '../actions';

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -104.9903,
      latitude: 39.7392,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }
  componentDidMount() {
    setTimeout(() => this.setState({ mapLoaded: true }), 300);
  }
   onRegionChangeComplete = (region) => {
   console.log('MapScreen.onRegionChangeComplete',region, this.state)
     this.setState( {region} );
   }
   
   
   
   onButtonPress = () => {
     // getZipCode({latitude: 39.8, longitude: -104})
     // .then(console.log.bind(console, 'zipCode'))
     // .catch(console.error.bind(console, 'failZipCode'))
     // this.props.fetchJobs(this.state.region, () => {
       this.props.navigation.navigate('deck');
     // });
   }
   
  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView 
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button 
            large
            title="Seach This Area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}

          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
}

export default connect(null, actions)(MapScreen);