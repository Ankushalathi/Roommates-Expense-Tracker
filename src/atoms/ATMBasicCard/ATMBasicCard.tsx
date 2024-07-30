import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDeletePostDataMutation } from '../../redux/Service/CardService';

type Props = {
    heading: string;
    description: string;
    userId: string;
};
const ATMBasicCard = ({ heading, description, userId }: Props) => {
    const [deletePost] = useDeletePostDataMutation();

    const deleteUserPost = (userId: string) => {
        deletePost(userId).then((res) => {
            alert(`user delete successfully ${userId}`);
        });
    };
    return (
        <div className="bg-white pr-2 pt-2 rounded-lg">
            <div className="flex justify-end ">
                <RxCross2
                    onClick={() => deleteUserPost(userId)}
                    className='text-red-300 cursor-pointer'
                    size="2em"
                />
            </div>
            <div className='px-6 pb-6'>
            <div className="text-xl font-bold capitalize line-clamp-2 h-14">{heading}</div>
            <div className='line-clamp-1'> {description}  </div>
            <div className="text-gray-300 font-medium">Mon ,21 Dec 2020 14.57 GMT</div>
            <img
                className="rounded-lg mt-1"
                src="https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg"
                alt="image-tag"
            />
            </div>
        </div>
    )
}

export default ATMBasicCard