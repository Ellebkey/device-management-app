import React from 'react';
import MainContainer from "./components/MainContainer";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="bg-light text-primary min-h-screen">
      <Toaster position="top-center" />
      <MainContainer/>
    </div>
  );
}

export default App;
