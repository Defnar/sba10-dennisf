import { useState } from "react";

interface AccordionSection {
  title: string;
  children: React.ReactNode;
}

export default function AccordionSection({
  title,
  children,
}: AccordionSection) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button className="w-full shadow-md rounded-md py-2 bg-gray-200 hover:bg-gray-400" onClick={() => setIsOpen((prev) => !prev)}>{title} </button>
      <section 
        className={`overflow-auto transition-all duration-300 ${
          isOpen ? "max-h-150 px-10 py-5" : "max-h-0 p-0"
        }`}
      >
        {children}
      </section>
    </>
  );
}
