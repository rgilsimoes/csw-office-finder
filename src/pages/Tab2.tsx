import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import About from '../components/About';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <img src="./assets/about_titans.png" alt="Titans" />
        <About />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
