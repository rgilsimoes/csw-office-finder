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
        <a href="https://github.com/rgilsimoes/csw-office-finder">Source Code and Instructions</a>
      </p>
      <p>rjsimoes@criticalsoftware.com</p>
    </div>
  );
};

export default About;
