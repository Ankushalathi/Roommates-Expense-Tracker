import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDeletePostDataMutation, usePostDataQuery } from "../redux/Service/CardService";
import { setCardData } from "../redux/Slice/dataSlice";
import FeedBackFormWrapper from "../Forms/FeedbackForm/FeedbackFormWrapper";
import ATMBasicCard from "../atoms/ATMBasicCard/ATMBasicCard";
import ATMPagination from "../atoms/ATMPagination/ATMPagination";
import ATMProfileCard from "../atoms/ATMProfileCard/ATMProfileCard";
import ATMToggleButton from "../atoms/ATMToggleButton/ATMToggleButton";
import MOLCard from "../molecules/MOLCard/MOLParaCard";

const CardPage = () => {
  const dispatch = useDispatch()

  const [selectedToggle, setSelectedToggle] = useState<"Card" | "Para" | 'Form'>("Card");
  const [page, setPage] = useState(1)

  const { cardData }: any = useSelector((state: RootState) => state.card)
  const { data, isLoading, isFetching } = usePostDataQuery({ limit: 6, page: page });

  useEffect(() => {
    dispatch(setCardData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isFetching]);

  const [deletePost] = useDeletePostDataMutation();


  const handleDelete = (userId: string) => {
    deletePost(userId)
      .unwrap()
      .then(() => {
        const updatedCardData = cardData.filter((item: any) => item.id !== userId);
        dispatch(setCardData(updatedCardData));
      })
      .catch((error) => {
        alert(`Failed to delete user ${userId}: ${error.message}`);
      });
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="container mx-auto">
        <div className="bg-slate-200 rounded grid grid-cols-12 gap-6">
          <div className={` col-span-3 flex flex-col gap-5 shadow-xl  p-8 rounded-xl h-full`}>
            <ATMProfileCard />
            <ATMToggleButton selectedToggle={selectedToggle} setSelectedToggle={setSelectedToggle} />
            <div className="bg-white p-4 rounded ">
              <p className="text-2xl font-bold text-center">Have a Feedback ?</p>
              <div className="px-12 mt-4">
                <button onClick={() => setSelectedToggle('Form')} className={`${selectedToggle === 'Form' ? 'bg-red-300' : 'bg-green-300'} py-2 font-medium  rounded w-full px-6 flex justify-center`}>
                  We're Listening!
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-9 p-5">
            <div className="flex flex-col gap-4 w-full">
              {(isLoading && isFetching) ? Array(6)?.fill(0).map((el: any) => {
                return (
                  <div className='animate-pulse h-[80px]  rounded-lg bg-slate-400 w-full' >
                  </div>
                )
              }) : selectedToggle === "Card" ? (
                <div className="flex flex-col gap-4">
                  {cardData?.map((el: any, ind: number) => {
                    return (
                      <div key={ind}>
                        <MOLCard description={el?.body} heading={el?.title} userId={el?.id}
                          onDelete={handleDelete}
                        />
                      </div>
                    );
                  })}
                  <div className="flex justify-center">
                    <ATMPagination page={page} setPage={setPage} />
                  </div>
                </div>
              ) : (selectedToggle === 'Para' ? (
                <div>
                  <div className="grid grid-cols-3 gap-10 px-8 pt-2">
                    {cardData?.map((el: any, ind: number) => {
                      return (
                        <div key={ind}>
                          <ATMBasicCard description={el?.body} heading={el?.title} userId={el?.id} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center my-4 mt-6">
                    <ATMPagination page={page} setPage={setPage} />
                  </div>
                </div>
              ) : <FeedBackFormWrapper />)}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
