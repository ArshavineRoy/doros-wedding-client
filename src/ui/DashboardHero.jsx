import { FiEdit } from "react-icons/fi";

function DashboardHero() {
  return (
    <div className="w-full flex h-[800px] px-36 pt-20 mb-[] pb-0 h-[505px] ">
      <div className="text-[90px] italic basis-3/4 flex flex-row gap-6 space-y-0 font-curly">
        <span className="">Victor</span>
        <span className="py-[60px]">+</span>
        <span className="py-[120px]">Natalie</span>
      </div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1525328302834-764f32276842?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className=" object-contain w-[300px] h-[350px] rotate-12 basis-1/4"
        />
        <FiEdit size={20} className="cursor-pointer" />
      </div>
    </div>
  );
}

export default DashboardHero;
