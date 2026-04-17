
import { useState } from "react";
import ServiceCard from "./ServiceCard";

export default function ServiceList({ services, onSelectionChange }) {
  const [selected, setSelected] = useState([]);

  const updateParent = (updated) => {
    setSelected(updated);
    onSelectionChange(updated);
  };

  const toggleService = (service) => {
    const exists = selected.find((s) => s.id === service.id);

    const updated = exists
      ? selected.filter((s) => s.id !== service.id)
      : [...selected, { ...service, quantity: 1 }];

    updateParent(updated);
  };

  const updateQuantity = (serviceId, quantity) => {
    const qty = Math.max(1, Number(quantity));

    const updated = selected.map((item) =>
      item.id === serviceId ? { ...item, quantity: qty } : item
    );

    updateParent(updated);
  };

  return (
    <div className="h-[80vh] w-full bg-[#F8F9FA]">
      {services.map((service) => {
        const selectedItem = selected.find((s) => s.id === service.id);

        return (
          <div key={service.id}  className="flex items-center justify-center mt-5">
            <div  className="flex items-center justify-between w-[120vh]">
            <ServiceCard
            
              service={service}
              selected={!!selectedItem}
              onToggle={toggleService}
            />

            {selectedItem && (
              <div className="border rounded py-1 px-2 ">
                <button
                className=" font-extrabold cursor-pointer  "
                  onClick={() =>
                    updateQuantity(service.id, selectedItem.quantity - 1)
                  }
                >
                  -
                </button>

                <span style={{ margin: "0 10px" }}>
                  {selectedItem.quantity}
                </span>

                <button
                className=" font-extrabold cursor-pointer"
                  onClick={() =>
                    updateQuantity(service.id, selectedItem.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            )}
          </div>
          </div>
        );
      })}
    </div>
  );
}