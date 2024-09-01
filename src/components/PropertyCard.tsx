import { FC } from "react";
import BedroomImg from "../assets/image 4.png";
import NightImg from "../assets/image 5.png";
import AdultsImg from "../assets/image 6.png";
import ChildrenImg from "../assets/image 7.png";
import ParkingImg from "../assets/image 8.png";
import PetImg from "../assets/image 9.png";

interface Property {
  id: number;
  property_name: string;
  property_code: string;
  check_in: string;
  check_out: string;
  bedrooms: number;
  adults: number;
  children: number;
  parking: number;
  pets: number;
  price: number;
  website: string;
  website_image: string;
}

// Helper function to calculate the number of nights
const calculateNights = (checkIn: string, checkOut: string): number => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  return diffDays;
};

const PropertyCard: FC<{ property: Property }> = ({ property }) => {
  const nights = calculateNights(property.check_in, property.check_out);
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 relative">
          <img
            className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            src={property.website_image}
            alt={property.property_name}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 py-2 px-4 rounded-xl shadow-lg">
            <p className="text-blue-600 text-center text-lg font-bold">
              {property.website}
            </p>
          </div>
        </div>
        <div className="w-full md:w-3/4 p-4">
          {/* Property Name and Price */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-bold">
                {property.property_name}
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                Property code: {property.property_code}
              </p>
            </div>
            <p className="text-purple-700 font-bold text-lg md:text-xl ml-2">
              USD {Number(property.price).toFixed(2)}
            </p>
          </div>

          {/* Check-in and Check-out Dates */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <p className="text-xs md:text-sm">
              Check in: <span className="font-bold">{property.check_in}</span>
            </p>
            <p className="text-xs md:text-sm">
              Check out: <span className="font-bold">{property.check_out}</span>
            </p>
            <button className="bg-[#F36F27] hover:bg-[#db682b] text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto mt-2 md:mt-0">
              Select
            </button>
          </div>

          <hr className="border-t border-gray-200 mb-4" />

          {/* Property Details Grid */}
          <div className="grid grid-cols-2 gap-y-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex flex-col items-center md:flex-row">
              <img
                src={BedroomImg}
                alt="Bedrooms"
                className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-0 md:mr-2"
              />
              <div>
                <p className="text-xs text-center md:text-left">Bedrooms</p>
                <p className="font-bold text-center md:text-left">
                  {property.bedrooms}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <img
                src={NightImg}
                alt="Nights"
                className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-0 md:mr-2"
              />
              <div>
                <p className="text-xs text-center md:text-left">Nights</p>
                <p className="font-bold text-center md:text-left">{nights}</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <img
                src={AdultsImg}
                alt="Adults"
                className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-0 md:mr-2"
              />
              <div>
                <p className="text-xs text-center md:text-left">Adults</p>
                <p className="font-bold text-center md:text-left">
                  {property.adults}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <img
                src={ChildrenImg}
                alt="Children"
                className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-0 md:mr-2"
              />
              <div>
                <p className="text-xs text-center md:text-left">Children</p>
                <p className="font-bold text-center md:text-left">
                  {property.children}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <img
                src={ParkingImg}
                alt="Parking"
                className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-0 md:mr-2"
              />
              <div>
                <p className="text-xs text-center md:text-left">Parking</p>
                <p className="font-bold text-center md:text-left">
                  {property.parking}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <img
                src={PetImg}
                alt="Pets"
                className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-0 md:mr-2"
              />
              <div>
                <p className="text-xs text-center md:text-left">Pets</p>
                <p className="font-bold text-center md:text-left">
                  {property.pets}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
