import { IonSlides, IonSlide } from '@ionic/react';
import { createRef, useEffect } from 'react';
import './ExploreOffices.css';

const slideOptions = {
  speed: 400,
};

export interface OfficeLocation {
  latitude: number;
  longitude: number;
}

export interface Office {
  id: number;
  name: string;
  address: string;
  image: string;
  location: OfficeLocation;
}

interface officeProps {
  officeData: Office[];
  selected?: number;
}

const ExploreOffices: React.FC<officeProps> = ({ officeData, selected }) => {
  const slider = createRef<HTMLIonSlidesElement>();

  useEffect(() => {
    if (selected) {
      slider.current?.slideTo(selected - 1);
      slider.current?.update();
    }
  }, [slider, selected]);

  return officeData.length ? (
    <IonSlides ref={slider} pager={true} options={slideOptions}>
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
