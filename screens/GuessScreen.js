import React, { Component } from 'react';
import {
  Image,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default class GuessScreen extends Component {
  state = {};
  guesses = {};

  componentWillMount() {
    //get params and put in state
    const { params } = this.props.navigation.state;
    const imglink = params.img;
    const phrase = params.phrase.split("").map(obj =>{
      return{
        letter: obj,
        correct: false
      }
    });
    this.setState({
      imglink: imglink,
      phrase: phrase
    })
  }

  checkguess() {
    this.setState({phrase: this.state.phrase.map((obj,i) => {
      return this.state.phrase[i].letter.toLowerCase() === this.guesses[i].toLowerCase() ? {...obj, correct: true} : obj
    })
  })    
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>

            <View style={styles.guessContainer}>
              {this.state.phrase.map((letter, index) => {
                let nextinput = index + 1;
                let previnput = index - 1;
                let thisindex = index;

                return <TextInput
                  key={index}
                  ref={index}
                  style={{ width: 30, height: 30, borderColor: 'gray', borderBottomWidth: 4, marginLeft: 5, fontSize: 20, paddingBottom: 0 }}
                  maxLength={1}
                  textAlign={'center'}
                  autoCorrect={false}
                  autoCapitalize={"characters"}
                  onChangeText={value => {
                    if (value.length === 0 && index != 0) { this.refs[previnput].focus() }
                    else if (nextinput !== this.state.phrase.length && value.length !== 0) { this.refs[nextinput].focus() }
                    else if (nextinput === this.state.phrase.length && value.length !== 0) {
                      this.guesses[thisindex] = value
                      this.checkguess()
                    }
                    this.guesses[thisindex] = value
                    // console.log(this.guesses)
                  }}
                />
              })}
            </View>
            <Image
              source={{ uri: `${this.state.imglink}` }}
              style={styles.welcomeImage}
              resizeMode="contain"
              onPress={() => this.props.navigation.navigate('Guess')}
            />

          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    height: 500,
    width: 400,
    resizeMode: 'contain',
    marginTop: 10,
  },
  guessContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

