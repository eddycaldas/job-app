import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';
import { getJobs } from '../actions/job_actions'

class DeckScreen extends Component {
  state = {jobs: []}
  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    }
    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnable={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    )    
  }
  
  componentDidMount() {
    this.setState({error: null})
    
    getJobs({
      longitude: -104.9903,
      latitude: 39.7392,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    })
    .then(jobs => {
      this.setState({jobs})
    })
    .catch(err => {
      console.error('ERROR: DeckScreen:componentDidMount', err);
      this.setState({error: err.message})
    })
  }
  
  renderNoMoreCards() {
    return (
      <Card title="No more jobs">
        <Text>No more ese</Text>
      </Card>
    )
  }
  
  render() {
    console.log('deckScreen',this.state.jobs);
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe 
          data={this.state.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp= { "jobkey" }
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
}

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);