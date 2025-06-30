import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Toast from './src/toast';

export default function App() {
  const [showToast, setShowToast] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Show Toast" onPress={() => setShowToast(true)} />
      {showToast && (
        <Toast
          message="Hello World"
          subMessage="This is a toast! "
          type="success"
          position="top"
          slideDirection='none'
          onClose={() => setShowToast(false)}
          actionText="Undo"
          onActionPress={() => {
            console.log('Undo clicked');
          }}
        />
      )}
    </View>
  );
}

