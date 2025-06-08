import { FaApple } from "react-icons/fa";

const SignWithAppleButton = () => {
  const isIOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return true;
    }
    // Para iOS 13 y posteriores, el iPad User Agent puede ser "MacIntel" si se usa el modo escritorio
    if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) {
      return true;
    }
    return false;
  };

  const handledSignInWithApple = () => {
    console.log("Sign in with Apple clicked");
  };

  return (
    <>
      {isIOS() && (
        <button className="btn club_btn_negro" onClick={() => handledSignInWithApple()}>
          <FaApple style={{ margin: "5px" }} />
          Sign in with Apple
        </button>
      )}
    </>
  );
};

export default SignWithAppleButton;
