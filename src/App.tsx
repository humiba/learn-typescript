import { Routes, Route } from "react-router-dom";

import "@/globals.css";
import { SignInForm, SignUpForm } from "@/_auth/forms";
import AuthLayout from "@/_auth/AuthLayout";
import RootLayout from "@/_root/RootLayout";
import { Home } from "@/_root/pages";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main className="h-screen flex ">
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>
        
        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
