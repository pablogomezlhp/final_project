import React, { useEffect, useState, useCallback } from 'react';
import Geocode from "react-geocode";
import moment from 'moment';

const History = (props: any) => {
  // console.log('propsospsps',props?.data)
  const [address, setAddress] = useState('');
  useEffect(() => {
    handleLocation();
  }, []);

  Geocode.setApiKey("AIzaSyDSz7so27FlQ-rdBJib4xQ6GdBF6ZnwBT8");
  Geocode.setLanguage("en");

  // set response region. Its optional.
  // A Geocoding request with region=es (Spain) will return the Spanish city.
  const handleLocation =() => {
     Geocode.fromLatLng(props?.data?.latitude, props?.data?.longitude).then(
      (response: any) => {
        const address = response.results[0].formatted_address;
        setAddress(address);
        // console.log('pppsssss', address);
      },
      (error: any) => {
        console.error(error);
      }
    );
  Geocode.setRegion("es"); Geocode.enableDebug();

  };



  // console.log('propssss', address)
  return (
    <div className="flex justify-between items-center py-4 px-10  w-full bg-purple-100 rounded-2xl select-none my-2">
      {/* <Button className="flex items-center justify-center w-16 h-16 bg-purple-250 rounded-full transition duration-500 ease-in-out hover:bg-purple-300 transform hover:translate-y-0 hover:scale-110">
              <AiOutlinePlus className="text-white" size={40} />
            </Button> */}
      <div className=" flex flex-1  flex-col justify-start ml-12">
        <p className="flex text-left text-gray-800 font-medium text-md lg:text-xl">
          {moment(props?.data?.updated_at).format('MMMM Do YYYY, h:mm:ss a')}
        </p>
        <p className="hidden lg:block text-gray-600">
            {address}
        </p>
      </div>
      <p className="flex text-left text-gray-800 font-medium text-bold lg:text-3xl">
        €{props?.data?.price}
      </p>
    </div>
  )
}

export default History;