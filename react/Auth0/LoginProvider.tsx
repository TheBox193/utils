import { useAuth0 } from "@auth0/auth0-react";

import LoginWithPopup from "modules/Login/LoginWithPopup";
import LoginWithRedirect from "modules/Login/LoginWithRedirect";
import { useEffect, useState } from "react";

type LoginProviderProps = {
  children: React.ReactNode;
};

const LoginProvider = ({
  children,
}: Readonly<LoginProviderProps>): JSX.Element => {
  const [attemptedGetTokenSilently, setAttemptedGetTokenSilently] =
    useState(false);
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  // If we're already logged in, load the auth token once to get into logged in state
  useEffect(() => {
    if (isLoading || isAuthenticated || attemptedGetTokenSilently) {
      return;
    }

    (async (): Promise<void> => {
      try {
        await getAccessTokenSilently();
      } catch (error) {
        // Noop
      }
      setAttemptedGetTokenSilently(true);
    })();
  }, [isLoading, isAuthenticated]);

  // If we're authenticated, no work to do here, we can show children
  if (isAuthenticated) return <>{children}</>;

  // Show loading if we're loading or haven't yet attempted getting AccessToken once
  if (isLoading || !attemptedGetTokenSilently) return <>Loading...</>;

  // If we're in Zendesk we need to login with popup because of coors / iframe
  if (isInZendeskSidebar()) return <LoginWithPopup>{children}</LoginWithPopup>;

  // Else we can redirect to login page
  return <LoginWithRedirect>{children}</LoginWithRedirect>;
};

export default LoginProvider;
