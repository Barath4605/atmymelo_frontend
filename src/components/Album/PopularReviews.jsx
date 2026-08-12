import React, {useEffect, useState} from 'react';
import DisplayReview from "./DisplayReview.jsx";
import {getAllReview} from "../../../api/albumApi.js";

const PopularReviews = ({title, mbid}) => {

    const [popularReview, setPopularReview] = useState([]);

    useEffect(() => {
        if (mbid) {
            getAllReviews();
        }
    }, [mbid]);

    const getAllReviews = async () => {
        try {
            const res = await getAllReview(mbid);

            if(!res.ok) throw new Error();

            const data = await res.json();


            setPopularReview(data);
        } catch (e) {
            console.error(e);
        }
    }

  return (
      <div className="lg:w-275 montserrat-300 m-3 lg:m-auto text-white">
          <div className="lg:flex justify-between mb-2">
              <h1 className="tracking-[0.2em] text-[14px] lg:mb-2 font-medium">
                  Popular Reviews for {title}
              </h1>
          </div>
          {/*DISPLAY REVIEW*/}
          <div className="flex flex-col gap-3">
              {
                  popularReview.length !== 0 ? (
                      popularReview.map((r) => (
                          <DisplayReview
                              key={r.id}
                              username={r.username}
                              review={r.content}
                              reviewId={r.reviewId}
                              rating={r.rating}
                              date={r.createdAt}
                              relisten={r.relisten}
                          />
                      ))
                  ) : (
                      <p className="text-white/40 my-1 tracking-widest text-xs text-center">
                          No reviews yet
                      </p>
                  )
              }
          </div>
      </div>
  );
};

export default PopularReviews;
