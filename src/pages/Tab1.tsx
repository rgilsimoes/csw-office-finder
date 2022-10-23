import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
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
import ExploreOffices, { Office, OfficeLocation } from '../components/ExploreOffices';

import { BatteryInfo, Device, DeviceInfo } from '@capacitor/device';
import { Geolocation } from '@capacitor/geolocation';
import { findNearest, getLatitude, getLongitude } from 'geolib';
import { useEffect, useState } from 'react';
import _ from 'lodash';

const getNearestOffice = async (offices: Office[]) => {
  const officeLocations: OfficeLocation[] = offices.map((value) => {
    return { ...value.location };
  });

  const coordinates = await (await Geolocation.getCurrentPosition()).coords;
  const nearestMatch = findNearest(
    { latitude: coordinates.latitude, longitude: coordinates.longitude },
    officeLocations
  );

  const nearestOffice = offices.find((value) => {
    const location: OfficeLocation = { latitude: getLatitude(nearestMatch), longitude: getLongitude(nearestMatch) };
    return _.isEqual(value.location, location);
  });

  return nearestOffice;
};

const logDeviceInfo = async () => {
  return await Device.getInfo();
};

const logBatteryInfo = async () => {
  return await Device.getBatteryInfo();
};

const getOfficeData = async () => {
  return await fetch('./assets/office-info.json').then((res) => {
    return res.json();
  });
};

const Tab1: React.FC = () => {
  // Data
  const [deviceInfo, setDeviceinfo] = useState<DeviceInfo>();
  const [batteryInfo, setBatteryinfo] = useState<BatteryInfo>();
  const [officeData, setOfficeData] = useState<Office[]>([]);
  const [nearestOffice, setNearestOffice] = useState<Office>();

  useEffect(() => {
    getOfficeData().then((data) => {
      setOfficeData(data);
    });

    logDeviceInfo().then((res) => {
      setDeviceinfo(res);
    });

    logBatteryInfo().then((res) => {
      setBatteryinfo(res);
    });
  }, []);

  const findMe = async () => {
    setNearestOffice(await getNearestOffice(officeData));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            CSW Office Finder
            <img src="./assets/titans_symbol.png" className="titan_logo" alt="Titans Logo" />
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
            <IonCol sizeMd="2" sizeSm="4" sizeXs="6">
              <IonButton onClick={findMe}>
                Find Me
                <IonIcon icon={locate} slot="end" />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <ExploreOffices officeData={officeData} selected={nearestOffice?.id} />

        {nearestOffice && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Your nearest office is... {nearestOffice?.name}</IonCardTitle>
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
                <IonLabel>And it has {(batteryInfo?.batteryLevel ?? 0) * 100}% battery!</IonLabel>
              )}
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
