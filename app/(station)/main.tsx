import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native-web';
import React, { useEffect, useState } from 'react';
import { icons } from '@/constants';
import { useRouter } from 'expo-router';
import useRoleMiddleware from '@/hooks/useRoleMiddleware';

const Main = () => {
  const router = useRouter();
  const isAuthorized = useRoleMiddleware('admin');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthorized !== undefined) {
      setIsLoading(false);
    }
  }, [isAuthorized]);

  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

 
  if (!isAuthorized) {
    router.push('/unauthorized');
    return null; 
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Owner Dashboard</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => router.push('(station)/approve-stations')} style={cardStyle}>
          <Image source={icons.stancia} style={iconStyle} />
          <Text style={textStyle}>Pending Station Requests</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};

const cardStyle = {
  backgroundColor: '#F0F0F0',
  padding: 16,
  margin: 8,
  borderRadius: 8,
  alignItems: 'center',
  width: '48%',
};

const iconStyle = {
  width: 64,
  height: 64,
  marginBottom: 8,
};

const textStyle = {
  fontSize: 16,
  fontWeight: 'bold',
};

export default Main;