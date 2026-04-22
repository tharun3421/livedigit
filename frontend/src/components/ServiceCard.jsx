
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconMap } from "./iconMap";

export default function ServiceCard({ service, selected, onToggle }) {
  const icon = iconMap[service.icon];

  return (
    <div className="flex items-center gap-4">
      <input
        className="accent-[#0B1422] w-5 h-5 cursor-pointer shrink-0"
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(service)}
      />
      {icon && (
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 shrink-0">
          <FontAwesomeIcon icon={icon} className="text-xl" />
        </div>
      )}
      <div className="flex flex-col">
        <h3 className="font-bold">{service.title}</h3>
        <p className="font-sans text-sm text-gray-500">{service.description}</p>
      </div>
    </div>
  );
}