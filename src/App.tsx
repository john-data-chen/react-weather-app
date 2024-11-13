import styled from "@emotion/styled";
import CloudyIcon from "./images/cloudy.svg?react";
import AirFlowIcon from "./images/airFlow.svg?react";
import RainIcon from "./images/rain.svg?react";
import RedoIcon from "./images/redo.svg?react";

const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: #f9f9f9;
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: #212121;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: #828282;
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: #757575;
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const Cloudy = styled(CloudyIcon)`
  flex-basis: 30%;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Redo = styled(RedoIcon)`
  width: 15px;
  height: 15px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
`;

function App() {
  return (
    <Container>
      <WeatherCard>
        <Location>台北市</Location>
        <Description>多雲時晴</Description>
        <CurrentWeather>
          <Temperature>
            23 <Celsius>°C</Celsius>
          </Temperature>
          <Cloudy />
        </CurrentWeather>
        <AirFlow>
          <AirFlowIcon />
          23 m/h
        </AirFlow>
        <Rain>
          <RainIcon />
          48%
        </Rain>
        <Redo />
      </WeatherCard>
    </Container>
  );
}

export default App;
