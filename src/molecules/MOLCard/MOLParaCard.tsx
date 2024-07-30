import { RxCross2 } from "react-icons/rx";

type Props = {
  heading: string;
  description: string;
  userId: string;
  onDelete: (userId: string) => void;
};

const MOLCard = ({ heading, description, userId, onDelete }: Props) => {

  return (
    <div className="grid grid-cols-12 gap-3 items-center">
      <div className=" col-span-11 flex gap-4 bg-white shadow-lg p-5 rounded-lg ">
        <img
          className="w-16 h-16 rounded-full"
          src="https://plus.unsplash.com/premium_photo-1721566222339-db243e16f9f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8YWV1NnJMLWo2ZXd8fGVufDB8fHx8fA%3D%3D"
          alt="user-image"
        />
        <div>
          <div className="font-bold text-md line-clamp-1 capitalize">{heading} </div>
          <div className="text-md line-clamp-1 capitalize">{description}</div>
          <div className="text-gray-300 font-medium">
            Mon ,21 Dec 2020 14.57 GMT
          </div>
        </div>
      </div>
      <div className="bg-white p-1 rounded-full h-10  w-10 col-span-1 cursor-pointer">
        <RxCross2
          onClick={() => onDelete(userId)}
          size="2em"
          className="text-red-400"
        />
      </div>
    </div>
  );
};

export default MOLCard;
