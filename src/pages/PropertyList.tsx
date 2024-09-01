import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/similater-logo.png";
import PropertyCard from "../components/PropertyCard"; 

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

const PropertyList: FC = () => {
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
          `${import.meta.env.VITE_API_BASE_URL as string}/api/v1/property/list`,
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
          }
          throw new Error("Failed to fetch properties");
        }

        const result = await response.json();
        console.log("API response:", result); 

        
        if (result.status === true && Array.isArray(result.data)) {
          setProperties(result.data);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };


    fetchProperties();
  }, [navigate]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  if (!Array.isArray(properties)) {
    return <div>Error: Data format is incorrect</div>;
  }

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
