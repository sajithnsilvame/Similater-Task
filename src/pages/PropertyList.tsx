import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BedroomImg from "../assets/image 4.png";
import NightImg from "../assets/image 5.png";
import AdultsImg from "../assets/image 6.png";
import ChildrenImg from "../assets/image 7.png";
import ParkingImg from "../assets/image 8.png";
import PetImg from "../assets/image 9.png";
import Logo from "../assets/similater-logo.png";

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

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
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
          <div className="flex flex-col md:flex-row justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold">{property.property_name}</h2>
              <p className="text-sm text-gray-600">
                Property code: {property.property_code}
              </p>
            </div>
            <p className="text-purple-700 font-bold text-xl mt-2 md:mt-0">
              USD {Number(property.price).toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <p className="text-sm">Check in: {property.check_in}</p>
            <p className="text-sm my-2 md:my-0">
              Check out: {property.check_out}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto">
              Select
            </button>
          </div>
          <hr className="border-t border-gray-200 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex items-center">
              <img src={BedroomImg} alt="Bedrooms" className="h-6 w-6 mr-2" />
              <div>
                <p className="text-xs">Bedrooms</p>
                <p className="font-bold">{property.bedrooms}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={NightImg} alt="Nights" className="h-6 w-6 mr-2" />
              <div>
                <p className="text-xs">Nights</p>
                <p className="font-bold">{property.bedrooms}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={AdultsImg} alt="Adults" className="h-6 w-6 mr-2" />
              <div>
                <p className="text-xs">Adults</p>
                <p className="font-bold">{property.adults}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={ChildrenImg} alt="Children" className="h-6 w-6 mr-2" />
              <div>
                <p className="text-xs">Children</p>
                <p className="font-bold">{property.children}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={ParkingImg} alt="Parking" className="h-6 w-6 mr-2" />
              <div>
                <p className="text-xs">Parking</p>
                <p className="font-bold">{property.parking}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={PetImg} alt="Pets" className="h-6 w-6 mr-2" />
              <div>
                <p className="text-xs">Pets</p>
                <p className="font-bold">{property.pets}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          "https://skill-test.similater.website/api/v1/property/list",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("accessToken");
            navigate("/");
            return;
          }
          throw new Error("Failed to fetch properties");
        }

        const result = await response.json();
        if (result.status === true && Array.isArray(result.data)) {
          setProperties(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch properties");
        }
      } catch (err) {
        setError("Failed to load properties. Please try again later.");
        console.error("Error fetching properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 my-5 rounded-xl">
      <div className="mb-6">
        <img src={Logo} alt="Similater Logo" className="h-12 mb-4" />
        <hr className="border-t border-gray-300" />
      </div>
      <h1 className="text-2xl font-bold mb-6">Service apartments</h1>
      <div className="space-y-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
