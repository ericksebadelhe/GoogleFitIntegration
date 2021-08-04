import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';

const App: React.FC = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const stepsOptions: any = {
    startDate: "2017-01-01T00:00:17.971Z", // required
    endDate: new Date().toISOString(), // required
    bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1. 
  };

  const getSteps = () => {
    GoogleFit.getDailyStepCountSamples(stepsOptions)
      .then((res) => console.log('STEPS', res));
  };

  const getHeights = () => {
    const heightsOptions = {
      startDate: new Date(2021, 6, 1).toISOString(),
      endDate: new Date().toISOString(),
    };
    GoogleFit.getHeightSamples(heightsOptions)
      .then((res) => console.log('HEIGHTS', res))
  }

  const getSleep = () => {
    GoogleFit.getSleepSamples(stepsOptions)
      .then((res) => console.log('SLEEP', res))
  }

  useEffect(() => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_SLEEP_READ,
      ],
    };
    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {
          console.log('AUTH_SUCCESS', authResult);
          setPermissionGranted(true);
        } else {
          console.log('AUTH DENIED', authResult);
          setPermissionGranted(false);
        }
      })
      .catch((err) => {
        console.log('AUTH ERROR', err);
      });
  }, []);

  useEffect(() => {
    if (permissionGranted) {
      getSteps();
      getHeights();
      getSleep();
    }
  }, [permissionGranted]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1d0281',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default App;
