import { useState } from "react";

import EmailVerifcation from "../component/Login/EmailVerification";

export default function VerifyEmail() {
  const queryParameters = new URLSearchParams(window.location.search);

  return (
    <div>
      <EmailVerifcation user={queryParameters.get("user")}></EmailVerifcation>
    </div>
  );
}
