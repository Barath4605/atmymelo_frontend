import React from "react";

const FriendActivities = () => {
  const [showFriends, setShowFriends] = React.useState(() => {
    return localStorage.getItem("hideFriends") !== "true";
  });

  const handleClose = () => {
    localStorage.setItem("hideFriends", "true");
    setShowFriends(false);
  };

  if (!showFriends) {
    return null;
  }

  return (
    <section className="relative lg:w-[65%] w-[95%] mx-auto my-6 p-2 lg:p-6 border border-white/20">
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-white/50 hover:text-white cursor-pointer"
      >
        ×
      </button>

      <h1 className="text-2xl lg:px-10 text-center text-white/80 montserrat-300">
        ACTIVITIES FROM FRIENDS
      </h1>

      <p className="lg:text-lg text-sm lg:px-10 py-3 text-white/70 montserrat-200">
        See what your friends are up to. Discover what they’re listening to,
        what they’re planning to listen to next, and the albums and artists they
        love, enjoy, or simply don’t care for.
      </p>

      <div className="py-2 border-t border-white/20">
        <p className="lg:text-lg text-sm lg:px-10 py-2 text-center text-white/50 montserrat-200">
          FRIENDS SECTION IS STILL UNDER DEVELOPMENT
        </p>
      </div>
    </section>
  );
};

export default FriendActivities;
