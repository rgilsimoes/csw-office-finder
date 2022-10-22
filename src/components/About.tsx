import './About.css';

const About: React.FC = () => {
  return (
    <div className="container">
      <p>Demo App for the Tech Day 2022 Lightning Talk</p>
      <p>
        "Hybrid Development With
        <br /> Ionic and Capacitor"
      </p>
      <p>
        {
          // TODO - Missing URL
        }
        <a href="">Reference Material</a>
      </p>
      <p>rjsimoes@criticalsoftware.com</p>
    </div>
  );
};

export default About;
