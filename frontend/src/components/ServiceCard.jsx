
export default function ServiceCard({ service, selected, onToggle }) {
  return (
    <div className="flex items-center gap-4">
      <input
        className="accent-[#0B1422] w-5 h-5 cursor-pointer shrink-0"
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(service)}
      />
      <div className="flex flex-col">
        <h3 className="font-bold">{service.title}</h3>
        <p className="font-sans text-sm text-gray-500">{service.description}</p>
      </div>
    </div>
  );
}