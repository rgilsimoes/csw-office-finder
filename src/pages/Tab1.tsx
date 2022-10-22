import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { locate } from 'ionicons/icons';
import './Tab1.css';
import ExploreOffices, { Office } from '../components/ExploreOffices';

import { BatteryInfo, Device, DeviceInfo } from '@capacitor/device';
import { Geolocation } from '@capacitor/geolocation';
import { findNearest } from 'geolib';
import { useEffect, useMemo, useState } from 'react';

const getCurrentPosition = async () => {
  const coordinates = await (await Geolocation.getCurrentPosition()).coords;

  const nearest = findNearest({ latitude: coordinates.latitude, longitude: coordinates.longitude }, officePoints);
  return nearest;
};

const officePoints = [
  { latitude: 51.515, longitude: 7.453619 },
  { latitude: 59.916911, longitude: 10.727567 },
  { latitude: 51.503333, longitude: -0.119722 },
  { latitude: 55.751667, longitude: 37.617778 },
  { latitude: 48.8583, longitude: 2.2945 },
  { latitude: 52.516272, longitude: 13.377722 },
  { latitude: 59.3275, longitude: 18.0675 },
];

const logDeviceInfo = async () => {
  return await Device.getInfo();
};

const logBatteryInfo = async () => {
  return await Device.getBatteryInfo();
};

const Tab1: React.FC = () => {
  // Data
  const [deviceInfo, setDeviceinfo] = useState<DeviceInfo>();
  const [batteryInfo, setBatteryinfo] = useState<BatteryInfo>();
  const [officeData, setOfficeData] = useState<Office[]>([]);

  // Logic
  const getOfficeData = async () => {
    fetch('./assets/office-info.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOfficeData(data);
      });
  };

  useMemo(() => {
    console.log('Fetch...');
    getOfficeData();

    console.log(officeData);
  }, []);

  useEffect(() => {
    console.log('Use Effect...');
    console.log(officeData);
    logDeviceInfo().then((res) => {
      setDeviceinfo(res);
    });

    logBatteryInfo().then((res) => {
      setBatteryinfo(res);
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            CSW Office Finder
            <img src="./assets/titans_symbol.svg" className="titan_logo" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CSW Office Finder</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="4">
              <IonButton onClick={getCurrentPosition}>
                Find Me
                <IonIcon icon={locate} slot="end" />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <ExploreOffices officeData={officeData} />

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your nearest office is... SOUTHAMPTON</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              You have a {deviceInfo?.model} device, awesome!
              <br />
            </IonLabel>

            {!batteryInfo?.isCharging ? (
              <IonLabel>
                Good to have your device charging!
                <br />
              </IonLabel>
            ) : (
              <IonLabel>And it has {batteryInfo?.batteryLevel ?? 0 * 100} battery!</IonLabel>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
