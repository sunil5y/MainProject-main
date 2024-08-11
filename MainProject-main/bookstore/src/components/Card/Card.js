import React from "react";

const Card = () => {
    const card = [
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8Tg38b5HNuq3a3YGKlS_EH5OHfFz-sxUoA&s",
          title: "Darken",
          description: "A book of life",
        },
      ];
  return (
    <>
      <div className="flex justify-evenly">
        {card.map((cardProduct, index) => {
          return (
            <div
              className="flex flex-col gap-2 mt-11 border-2 shadow-lg rounded-sm transition-transform transform hover:scale-110 w-60"
              key={index}
            >
              <img
                src={cardProduct.img}
                alt="image"
                className="object-cover rounded-t-sm "
              />
              <div className="p-3">
                <h1 className="text-lg font-bold"> {cardProduct.title} </h1>
                <span className="mb-5"> {cardProduct.description} </span>
              </div>
              <button className="bg-black h-8 m-4 text-white">
                Learn More
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;