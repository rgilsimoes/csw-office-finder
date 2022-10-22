import { IonSlides, IonSlide, IonContent, IonLabel, IonImg } from '@ionic/react';
import { GeolibInputCoordinates } from 'geolib/es/types';
import './ExploreOffices.css';

const slideOptions = {
  initialSlide: 1,
  speed: 400,
};

export interface OfficeLocation {
  latitude: number;
  longintude: number;
}

export interface Office {
  name: string;
  address: string;
  image: string;
  location: OfficeLocation;
}

interface officeProps {
  officeData: Office[];
}

const ExploreOffices: React.FC<officeProps> = ({ officeData }) => {
  return officeData.length ? (
    <IonSlides pager={true} options={slideOptions}>
      {officeData.map((office: Office) => (
        <IonSlide key={office.name}>
          <img src={`./assets/offices/${office.image}`} alt={office.name} />
          <h1>{office.name}</h1>
          <p>{office.address}</p>
          <p>
            <b>{office.location.latitude}</b>
          </p>
        </IonSlide>
      ))}
    </IonSlides>
  ) : (
    <div>Loading...</div>
  );
};

export default ExploreOffices;
