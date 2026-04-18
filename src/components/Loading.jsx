import React from 'react';
import { Loader } from "lucide-react";

const Loading = () => {
  return (
      <div className="min-h-20 flex items-center text-zinc-50 justify-center text-center bg-transparent">
            <h1>Loading</h1>
            <h1> <Loader className="animate-spin" /></h1>
      </div>
  );
};

export default Loading;
