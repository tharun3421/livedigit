import { useState, useEffect } from "react";
import ServiceList from "../components/ServiceList";
import DownloadBar from "../components/DownloadBar";
import { services } from "../data/servicesData";

export default function Services() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    console.log(storedUser)
  }, []);

  return (
    
    <div className="bg-[#17141E] w-full h-screen flex items-start justify-center ">
      <div className=" w-[90vw] h-full bg-amber-50 rounded  ">
       <div className="bg-amber-500 flex items-center justify-between p-2">
         <h1 className="mt-3 font-bold text-2xl">Our Services</h1>

      {user && (
        <p>
          Customer: {user.name} ({user.mobile})
        </p>
      )}

       </div>
      <ServiceList
        services={services}
        onSelectionChange={setSelectedServices}
      />
    <DownloadBar
        selectedServices={selectedServices}
        user={user}
      />
</div>
     
    </div>
  );
}