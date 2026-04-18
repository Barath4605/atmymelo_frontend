import React from 'react';
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
      <div className="min-h-20 m-10 montserrat-200 flex items-center text-zinc-50 justify-center text-center bg-transparent">
            <h1>Loading</h1>
            <h1> <Loader2 className="animate-spin" /></h1>
      </div>
  );
};

export default Loading;
