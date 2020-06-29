import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const infoWindowStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

const position = { lat: 33.772, lng: -117.214 };

function ApartmentsListMap(props) {
  const { totalApartments } = useSelector((state) => state.apartment);
  console.log("------------", totalApartments);
  const { placeholder, center, searchBoxChange } = props;
  const [autoComplete, setAutoComplete] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState([]);
  const onLoad = (autoComplete) => {
    setAutoComplete(autoComplete);
  };

  const onPlaceChanged = () => {
    const { geometry } = autoComplete.getPlace();
    const lat = geometry && geometry.location.lat();
    const lng = geometry && geometry.location.lng();
    console.log(lat, lng);
    searchBoxChange(lat, lng);
  };

  useEffect(() => {
    const totalCount = totalApartments ? totalApartments.totalCount : 0;
    setInfoWindowOpen(new Array(totalCount).fill(false));
  }, []);

  const openInfoWindow = (index) => {
    console.log("wuifewhuiefhui", infoWindowOpen);
    let tempInfoWindowOpen = new Array(totalApartments.totalCount).fill(false);
    tempInfoWindowOpen[index] = !infoWindowOpen[index];
    setInfoWindowOpen(tempInfoWindowOpen);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
      libraries={["places"]}
    >
      <GoogleMap
        id="searchbox-example"
        mapContainerStyle={containerStyle}
        zoom={10}
        center={center}
      >
        {totalApartments &&
          totalApartments.apartments.map((apartment, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(apartment.lat.$numberDecimal),
                lng: parseFloat(apartment.lng.$numberDecimal),
              }}
              onClick={() => openInfoWindow(index)}
            >
              {infoWindowOpen[index] && (
                <InfoWindow onCloseClick={() => openInfoWindow(index)}>
                  <div style={infoWindowStyle}>
                    <h6>{apartment.name}</h6>
                    <p>{apartment.description}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder={placeholder}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `300px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </Autocomplete>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(ApartmentsListMap);