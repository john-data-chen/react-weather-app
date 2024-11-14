"use client";
import styled from "@emotion/styled";
import CloudyIcon from "./images/cloudy.svg?react";
import SunnyIcon from "./images/sunny.svg?react";
import RedoIcon from "./images/redo.svg?react";
import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";

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

const Sunny = styled(SunnyIcon)`
  flex-basis: 30%;
`;

const Cloudy = styled(CloudyIcon)`
  flex-basis: 30%;
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

const Redo = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 20px;
  display: inline-flex;
  align-items: flex-end;
  color: #828282;

  svg {
    margin-left: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

function App() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    city: string;
  } | null>(null);
  const [weatherData, setWeatherData] = useState<{
    current: {
      temperature2m: number;
      weatherCode: number;
      displayDegree: boolean;
    };
  } | null>(null);
  const [showUpdateTime, setShowUpdateTime] = useState(false);

  const weatherIcon = () => {
    switch (weatherData?.current.weatherCode) {
      case 0:
        return <Sunny />;
      case 1:
      case 2:
      case 3:
        return <Cloudy />;
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
        return <Rain />;
      default:
        return;
    }
  };

  const weatherIconElement = weatherIcon();

  const getWeather = async () => {
    try {
      const res = await fetch("https://api.ipify.org/?format=json");
      const ipData = await res.json();
      const ip = ipData.ip;
      const res2 = await fetch("http://ip-api.com/json/" + ip);
      const location = await res2.json();
      const city = location.regionName;
      const latitude = location.lat;
      const longitude = location.lon;
      setUserLocation({
        latitude: latitude,
        longitude: longitude,
        city: city,
      });
      const params = {
        latitude: latitude,
        longitude: longitude,
        current: ["temperature_2m", "weather_code"],
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const current = response.current()!;
      const formatData = {
        current: {
          temperature2m: Math.trunc(current.variables(0)!.value()),
          weatherCode: current.variables(1)!.value(),
          displayDegree: true,
        },
      };
      // Update the state with the formatData
      setWeatherData(formatData);
    } catch (error) {
      console.error(error);
    }
  };

  // auto execute
  useEffect(() => {
    getWeather();
    setTimeout(() => setShowUpdateTime(true), 2000);
  }, []);

  return (
    <Container>
      <WeatherCard>
        <Location>{userLocation?.city}</Location>
        <CurrentWeather>
          <Temperature>
            {weatherData?.current.temperature2m}{" "}
            <Celsius>
              <div
                className={
                  weatherData?.current.displayDegree ? "visible" : "hidden"
                }
              >
                °C
              </div>
            </Celsius>
          </Temperature>
          {weatherIconElement}
        </CurrentWeather>
        <Redo>
          <div className={showUpdateTime ? "visible" : "hidden"}>
            update at{" "}
            {showUpdateTime &&
              new Date().toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })}
          </div>
          <RedoIcon onClick={getWeather} />
        </Redo>
      </WeatherCard>
    </Container>
  );
}

export default App;
