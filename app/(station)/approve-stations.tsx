import { useEffect, useState } from "react";
import { approveStation, getUnapprovedStations } from '@/lib/adminService';
import Station from "@/components/Station";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Button, Text, View, Image, ActivityIndicator } from "react-native";
import React from "react";
import { icons } from "@/constants";

const ApproveStations = () => {
    const [unapprovedStations, setUnapprovedStations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUnapprovedStations();
    }, []);

    const loadUnapprovedStations = async () => {
        setLoading(true);
        try {
            const stations = await getUnapprovedStations();
            setUnapprovedStations(stations);
        } catch (err) {
            Alert.alert("Unable to fetch unapproved stations");
        }
        setLoading(false);
    };

    const handleApproveStation = async (station_id) => {
        try {
            await approveStation(station_id);
            await loadUnapprovedStations();
        } catch (err) {
            Alert.alert("Unable to approve station");
        }
    };

    const renderOperationalHours = (hours) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return hours.map((day, index) => (
            <Text key={index} style={{ color: '#555' }}>
                {daysOfWeek[index]}: {new Date(day[0] * 1000).toLocaleTimeString()} - {new Date(day[1] * 1000).toLocaleTimeString()}
            </Text>
        ));
    };

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#f4f4f5' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}>
                    <View style={{ marginTop: 24, marginBottom: 16 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#4A4A4A' }}>Unapproved Stations</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color="#4caf50" style={{ marginVertical: 20 }} />
                    ) : (
                        <View style={{ gap: 16 }}>
                            {unapprovedStations.map((station, index) => (
                                <View
                                    key={index}
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 16,
                                        borderRadius: 8,
                                        borderColor: '#DDDDDD',
                                        borderWidth: 1,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 4,
                                        marginBottom: 16
                                    }}
                                >
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{station.name}</Text>

                                    <Text style={{ fontSize: 16, color: '#555', marginBottom: 8 }}>{station.description}</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                        <Image source={icons.map} style={{ width: 16, height: 16, marginRight: 4 }} />
                                        <Text style={{ fontSize: 14, color: '#888' }}>{station.address}</Text>
                                    </View>

                                    <Text style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>
                                        Coordinates: {station.coordinates[0].toFixed(5)}, {station.coordinates[1].toFixed(5)}
                                    </Text>

                                    <View style={{ marginBottom: 12 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Operational Hours:</Text>
                                        {renderOperationalHours(station.operational_hours)}
                                    </View>

                                    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                                        {station.picture_urls.map((url, idx) => (
                                            <Image
                                                key={idx}
                                                source={{ uri: url }}
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 8,
                                                    marginRight: 8,
                                                    marginBottom: 8,
                                                }}
                                            />
                                        ))}
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
                                        <Button
                                            onPress={() => handleApproveStation(station._id)}
                                            title="Approve"
                                            color="#4caf50"
                                        />
                                        <Button
                                            title="Deny"
                                            color="#e57373"
                                            disabled={true}
                                        />
                                    </View>
                                </View>
                            ))}
                            {unapprovedStations.length === 0 && (
                                <Text style={{ color: '#888888', textAlign: 'center', marginTop: 32 }}>
                                    No unapproved stations found.
                                </Text>
                            )}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default ApproveStations;
