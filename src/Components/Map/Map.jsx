import { useState, useEffect, useMemo, useCallback } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import Swal from "sweetalert2";

import TransferLatLng from "../../Utilities/TransferLatLng";

export default function Map({
  mapRef,
  onLoad,
  map,
  setMap,
  coords,
  currentPosition,
  setCurrentPosition,
  parkingData,
  availableData,
  visibleLots,
  setVisibleLots,
}) {
  // const [inputValue, setInputValue] = useState('')
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongtitude] = useState("");
  const [userCenter, setUserCenter] = useState("")

  // 當地圖停止托拽時為true
  const [isMapIdle, setIsMapIdle] = useState(false);
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null);

  // // Parking icon user clicks (spot icon)
  const [selected, setSelected] = useState(null);

  // const [currentPosition, setCurrentPosition] = useState(defaultCenter)

  // const userCenter = {
  //   lat: latitude,
  //   lng: longitude,
  // };
  // <GoogleMap> 條件設定
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      zoomControl: true,
      mapTypeControl: false,
    }),
    []
  );

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMap(map);
    // map.setZomm(18)
    // map.setCenter(coords)
    onLoad(map);
    createMarkers(visibleLots);
  }, []);

  const createMarkers = (visibleLots) => {
    const markers = visibleLots?.map((parkingLot) => {
      const { lat, lng } = TransferLatLng(parkingLot.tw97x, parkingLot.tw97y);
      const marker = new window.google.maps.Marker({
        key: parkingLot.id,
        position: { lat, lng },
        icon: {
          url: require("../../Assets/ParkingIcon.svg").default,
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
          zIndex: 1,
        },
      });
      console.log(marker);
      const selectedMarker = parkingLot;
      const infoWindow = new window.google.maps.InfoWindow();

      marker.addListener("click", () => {
        const selectedLot = availableData?.find((space) => {
          if (space.id === selectedMarker.id) {
            return space;
          }
        });
        infoWindow.setContent(`
          <div className="modal">
            <div className="modal-body">
              <h5 className="modal-title">${selectedMarker.name}</h5>
              <p className="total">總停車位${selectedMarker.totalcar}個車位</p>
              <p className="remain">目前剩餘${selectedLot.availablecar}個車位</p>
            </div>
          </div>
        `);
        infoWindow.open(map, marker);
        setCurrentInfoWindow(infoWindow);
        setSelected(selectedMarker);
        setCurrentPosition(TransferLatLng(parkingLot.tw97x, parkingLot.tw97y));
      });
      return marker;
    });
    return markers;
  };

  // 顯示使用者目前定位(汽車標示)，一開始就顯示位置，點及則將目前位置至於中心
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongtitude(position.coords.longitude);
        const initialUserCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCenter(initialUserCenter)
      },
      // 若未開啟位置追蹤，則跳出提示'允許存取使用者位置來使用此功能'
      () => {
        Swal.fire({
          position: "middle",
          text: "允許存取使用者位置來使用此功能",
          icon: "warning",
          showCloseButton: true,
          showConfirmButton: false,
        });
      }
    );
  }, []);

  // 使用者是否正在移動地圖
  useEffect(() => {
    if (map) {
      // 監聽地圖是否停止拖拽
      const listener = map.addListener("idle", () => {
        setIsMapIdle(true);
      });
      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [map]);

  useEffect(() => {
    if (isMapIdle) {
      // 地圖停止拖拽 顯示以下資料
      // getBounds()返回當前視窗的東北/西南 經緯度
      const bounds = map.getBounds();
      const visibleLots = parkingData?.filter((parkingLot) => {
        const { lat, lng } = TransferLatLng(parkingLot.tw97x, parkingLot.tw97y);
        return bounds.contains(new window.google.maps.LatLng(lat, lng));
      });
      const markers = createMarkers(visibleLots);
      new MarkerClusterer({
        map,
        markers,
        algorithm: new SuperClusterAlgorithm({ radius: 300 }),
      });

      setVisibleLots(visibleLots);
      setIsMapIdle(false);
    }
  }, [isMapIdle]);

  useEffect(() => {
    if (map) {
      const clickListener = map.addListener("click", () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
          setCurrentInfoWindow(null);
          setSelected(null);
        }
      });
      return () => {
        window.google.maps.event.removeListener(clickListener);
      };
    }
  }, [map]);

  return (
    <>
      <GoogleMap
        zoom={18}
        center={currentPosition}
        mapContainerClassName="map-container"
        options={options}
        onLoad={handleMapLoad}
      >
        {/* 使用者目前位置 */}
        <MarkerF
          position={userCenter}
          icon={{
            url: require("../../Assets/CarIcon.svg").default,
            scaledSize: new window.google.maps.Size(50, 35),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
        {/* {
        parkingData.map((parking) => {
          const position = TransferLatLng(parking.tw97x, parking.tw97y)
          return (
            <MarkerF 
              key={parking.id} 
              position={position}
              onClick={(id) => onParkingMarkerClick?.(parking.id)}
              icon={{
                url: require('../../Assets/ParkingIcon.svg').default,
                scaledSize: new window.google.maps.Size(35,35),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(15,15),
              }}
            />
          )})
        } */}
      </GoogleMap>
    </>
  );
}
