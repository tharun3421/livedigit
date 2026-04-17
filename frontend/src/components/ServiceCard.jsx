export default function ServiceCard({ service, selected, onToggle }) {
  return (
    <div className="mt-5 ml-5">
     <div className="flex">
       <input
       className="accent-amber-500 w-5 h-5 cursor-pointer"
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(service)} 
      />

      <div className="flex flex-col ml-5">
        <h3 className="font-bold">{service.title}</h3>
      <p className="font-sans text-sm">{service.description}</p>
      </div>
     </div>
    </div>
  );
}