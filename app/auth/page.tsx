"use client";

import { GithubLogo, GoogleLogo } from "@/components/logos";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

const socialProviders = [
  {
    name: "Continue with Google",
    icon: <GoogleLogo className="h-5 w-5" />,
    provider: "google",
  },
  {
    name: "Continue with GitHub",
    icon: <GithubLogo className="h-5 w-5" />,
    provider: "github",
  },
];

const AuthPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string | null>();

  const handleSocialLogin = async (provider: string) => {
    try {
      setLoading(true);
      setProvider(provider);
      await signIn(provider);
    } catch (error) {
      console.error("An error occurred while trying to sign in");
    }
  };

  return (
    <div className="flex justify-center gap-4 min-h-[calc(100vh-4.5rem)] h-full">
      <div className=" flex flex-col  mt-16 gap-4 p-8 rounded-md  h-fit">
        <p className="text-[32px] font-bold text-white mb-4">Sign In</p>
        {socialProviders.map((sp) => (
          <Button
            key={sp.provider}
            variant="outline"
            className="flex gap-4 border-neutral-700 py-6 px-8 w-full"
            disabled={loading}
            name={sp.name}
            onClick={() => handleSocialLogin(sp.provider)}
          >
            {provider === sp.provider ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              <div>{sp.icon}</div>
            )}
            <span>{sp.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AuthPage;
